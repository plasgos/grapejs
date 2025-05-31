import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Toggle } from "../ui/toggle";

import { AiOutlineSlack } from "react-icons/ai";
import Markdown from "react-markdown";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/components/ui/virtualized";

import Groq from "groq-sdk";

import { cn } from "@/lib/utils";
import { BubbleMenu } from "@tiptap/react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ColorPicker from "../editor-block/_components/ColorPicker";
import { Button } from "../ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoIosSend, IoMdClose } from "react-icons/io";
import { Textarea } from "../ui/textarea";

import { Loader2 } from "lucide-react";
import ollama from "ollama";
import { BsStars } from "react-icons/bs";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { marked } from "marked";
import { Heading1 } from "lucide-react";
import { Heading2 } from "lucide-react";
import { Heading3 } from "lucide-react";
import { cx } from "class-variance-authority";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useEditor } from "@grapesjs/react";
import { produce } from "immer";

const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "24px",
  "32px",
  "36px",
  "40px",
  "48px",
  "64px",
  "96px",
  "128px",
];

export default function MenuBar({ editor, schemeColor }) {
  const editorCanvas = useEditor();
  const selectedComponent = editorCanvas.getSelected();

  const currentComponent = selectedComponent?.get("customComponent");

  function resetKeyInObject(obj, targetKey) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => resetKeyInObject(item, targetKey));
      return;
    }

    if (typeof obj !== "object" || obj === null) return;

    for (const key in obj) {
      if (key === targetKey) {
        obj[key] = "__INLINE__";
      } else {
        const val = obj[key];
        if (typeof val === "object" && val !== null) {
          resetKeyInObject(val, targetKey);
        }
      }
    }
  }

  function findValueByKey(obj, targetKey) {
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const result = findValueByKey(item, targetKey);
        if (result !== undefined) return result;
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (key === targetKey) {
          return obj[key];
        }
        const result = findValueByKey(obj[key], targetKey);
        if (result !== undefined) return result;
      }
    }
    return undefined;
  }

  const valueSchemeColor = findValueByKey(currentComponent, schemeColor);

  useEffect(() => {
    if (valueSchemeColor && editor && valueSchemeColor !== "__INLINE__") {
      const docSize = editor.state.doc.content.size;

      // Seleksi seluruh teks
      editor.commands.setTextSelection({ from: 0, to: docSize });

      // Terapkan warna ke semua teks dari schemeColor (jika bukan override)
      editor.commands.setColor(valueSchemeColor);
    }
  }, [editor, valueSchemeColor]);

  const { googleFonts: fontOptions } = useSelector(
    (state) => state.landingPage
  );

  const isEditorIsFocused = editor.isFocused;

  const [open, setOpen] = useState(false);
  const [isOpenFontSizes, setIsOpenFontSizes] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [isOpenPopupAskAI, setIsOpenPopupAskAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isOpenAiResponOption, setIsOpenAiResponOption] = useState(
    !!aiPrompt || false
  );

  const virtualizerRef = useRef(null);
  const viewportRef = useRef(null);

  const fontFamily = editor.getAttributes("textStyle")?.fontFamily;

  const handleSelectFont = (fontFamily) => {
    editor.chain().focus().setFontFamily(fontFamily).run();
  };

  const filteredFonts = useMemo(() => {
    if (!inputValue) {
      return fontOptions;
    }

    return fontOptions.filter((item) =>
      item.fontFamily.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [fontOptions, inputValue]);

  const [isEditable] = useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  const activeIndex = useMemo(
    () => filteredFonts.findIndex((item) => item.fontFamily === fontFamily),
    [filteredFonts, fontFamily]
  );

  useLayoutEffect(() => {
    if (!open || !fontFamily || activeIndex === -1) return;

    setTimeout(() => {
      // Recover scroll position.
      virtualizerRef.current?.scrollToIndex(activeIndex, { align: "center" });

      const checkedElement = viewportRef.current?.querySelector(
        "[data-state=checked]"
      );

      // Recover focus.
      checkedElement?.focus({ preventScroll: true });
    });
  }, [open, fontFamily, activeIndex]);

  const [isStream, setIsStream] = useState(false);

  const [aiResponse, setAiResponse] = useState(``);

  const [isLoading, setIsLoading] = useState(false);

  const generateAiChat = async () => {
    setIsLoading(true);
    setAiPrompt("");
    try {
      const response = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [
          {
            role: "system",
            content: `
                Kamu adalah AI profesional yang ahli membuat konten untuk website dan landing page.`,
          },
          {
            role: "user",
            content: aiPrompt,
          },
        ],
        stream: isStream,
      });

      if (isStream) {
        for await (const part of response) {
          const message = part.message.content;
          setAiResponse((prevMessage) => (prevMessage += message));
        }
      } else {
        let result = response.message.content;

        // Hapus semua teks antara <think> dan </think>
        result = result.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

        // Jika hasil kosong setelah dihapus, kembalikan pesan default
        if (!result) result = "Tidak dapat menghasilkan respons yang valid.";

        setAiResponse(result);
        console.log("🚀 ~ generateAi ~ result:", result);

        return result;
      }
    } catch (error) {
      console.log("🚀 ~ generateAiChat ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const Options = [
    // {
    //   label: "Heading 1",
    //   icon: <Heading1 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   preesed: editor.isActive("heading", { level: 1 }),
    // },
    // {
    //   label: "Heading 2",
    //   icon: <Heading2 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   preesed: editor.isActive("heading", { level: 2 }),
    // },
    // {
    //   label: "Heading 3",
    //   icon: <Heading3 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    //   preesed: editor.isActive("heading", { level: 3 }),
    // },

    {
      label: "Text Left",
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      label: "Text Center",
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      label: "Text Right",
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      label: "Bullet List",
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      label: "Ordered List",
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
  ];

  const bubbleMenuOptions = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];

  const currentFontSize = editor.getAttributes("textStyle")?.fontSize;

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const getGrogChatyCompletion = async () => {
    setIsLoading(true);
    setAiPrompt("");

    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: aiPrompt }],
        model: "llama-3.3-70b-versatile",
      });
      console.log("🚀 ~ getGrogChatyCompletion ~ completion:", completion);

      setAiResponse(completion.choices[0].message.content);
    } catch (error) {
      console.log("🚀 ~ getGrogChatyCompletion ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const importGeneratedSection = (rawJson) => {
    try {
      const parsedData = JSON.parse(rawJson);

      if (!parsedData.pages || !parsedData.pages[0].frames) {
        throw new Error("Invalid generated format");
      }

      editor.clearProjectData(); // Clear dulu biar fresh

      editor.loadProjectData(parsedData);

      console.log("🚀 Section berhasil di-import ke GrapesJS!");
    } catch (error) {
      console.error("🚀 Import error:", error);
    }
  };

  const handleInsertText = () => {
    if (editor && aiResponse) {
      editor.commands.insertCustomText(marked.parse(aiResponse));
      setAiResponse("");
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cx(
        "border rounded-md p-1 mb-2 bg-slate-50  z-50 flex gap-x-1.5",
        isEditorIsFocused && "border-indigo-500  outline-none "
      )}
    >
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          interactive: true,
          maxWidth: "100%",
        }}
      >
        <div className="flex flex-col   gap-y-2 bg-white  border p-2 rounded-lg shadow-md relative z-[99999]  w-full">
          <div className="flex  gap-x-2">
            {bubbleMenuOptions.map((option, index) => (
              <Toggle
                key={index}
                pressed={option.preesed}
                onPressedChange={option.onClick}
                size="sm"
                variant=""
              >
                {option.icon}
              </Toggle>
            ))}
            <ColorPicker
              value={editor.getAttributes("textStyle")?.color}
              onChange={(color) => {
                editor.chain().focus().setColor(color).run();

                const updated = produce(currentComponent, (draft) => {
                  resetKeyInObject(draft, schemeColor);
                });

                selectedComponent.set("customComponent", updated);
              }}
            />
          </div>

          <div className="flex gap-x-2">
            <Popover open={isOpenFontSizes} onOpenChange={setIsOpenFontSizes}>
              <PopoverTrigger asChild className="bg-muted ">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`min-w-[120px] justify-between font-normal `}
                >
                  <div className="flex justify-between w-full">
                    <p className="truncate max-w-20">
                      {currentFontSize ? currentFontSize : "Font Size"}
                    </p>
                    <ChevronDown className="opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[150px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {fontSizes.map((fontSize) => (
                        <CommandItem
                          key={fontSize}
                          value={fontSize}
                          onSelect={(value) => {
                            editor.chain().focus().setFontSize(value).run();

                            setOpen(false);
                          }}
                        >
                          {fontSize}
                          <Check
                            className={cn(
                              "ml-auto",
                              currentFontSize === fontSize
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="bg-muted ">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`min-w-[120px] justify-between font-normal `}
                  style={{
                    fontFamily,
                  }}
                >
                  <div className="flex justify-between w-full">
                    <p className="truncate max-w-20">
                      {fontFamily ? fontFamily : "Font Family"}
                    </p>
                    <ChevronDown className="opacity-50" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[150px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search font..."
                    className="h-9"
                    onValueChange={(val) => setInputValue(val)}
                  />

                  <Virtualized ref={viewportRef} asChild>
                    <CommandList>
                      {filteredFonts.length === 0 ? (
                        <CommandEmpty>Not found.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          <VirtualizedVirtualizer
                            ref={virtualizerRef}
                            startMargin={32}
                            keepMounted={
                              activeIndex !== -1 ? [activeIndex] : undefined
                            }
                          >
                            {filteredFonts.map((font) => (
                              <CommandItem
                                style={{
                                  fontFamily: font.fontFamily,
                                }}
                                key={font.fontFamily}
                                value={font.fontFamily}
                                onSelect={(currentValue) => {
                                  handleSelectFont(currentValue);

                                  setOpen(false);
                                  setInputValue("");
                                }}
                              >
                                {font.fontFamily}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    fontFamily === font.fontFamily
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </VirtualizedVirtualizer>
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Virtualized>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </BubbleMenu>

      {Options.map((option, index) => (
        <TooltipProvider key={index} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={option.preesed}
                onPressedChange={option.onClick}
                data-state={option.preesed ? "on" : "off"}
                className="bg-transparent shadow-none ring-0 text-gray-500 data-[state=on]:text-accent data-[state=on]:bg-indigo-500 data-[state=on]:shadow-none data-[state=on]:ring-0 "
              >
                {option.icon}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>{option.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      <Popover open={isOpenPopupAskAI} onOpenChange={setIsOpenPopupAskAI}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant={isOpenPopupAskAI ? "" : "ghost"}
                  className={cn(
                    isOpenPopupAskAI && "bg-indigo-500 hover:bg-indigo-500"
                  )}
                >
                  <AiOutlineSlack className="size-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ask AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent side="right" className="w-[350px]">
          <div className="">
            {isLoading && <Loader2 className="animate-spin my-2" />}
            {aiResponse && (
              <>
                <div className="text-xs w-fit border border-indigo-500 text-indigo-600 rounded-lg p-1 flex ">
                  AI Response <BsStars className="ml-0.5" />
                </div>

                <div className="my-1 max-h-[300px] overflow-y-auto text-sm border p-1.5 rounded-lg bg-muted  break-words  whitespace-pre-wrap">
                  <Markdown>{aiResponse}</Markdown>
                </div>

                <div className="flex justify-end">
                  <DropdownMenu
                    open={isOpenAiResponOption}
                    onOpenChange={setIsOpenAiResponOption}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 mb-1   "
                      >
                        <IoEllipsisHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={handleInsertText}
                        className="cursor-pointer"
                      >
                        <MdOutlineTransitEnterexit /> Insert To Editor
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setAiResponse("")}
                        className="cursor-pointer"
                      >
                        <IoMdClose />
                        Clear/ Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>

          <div className="w-full border rounded-lg">
            <div className="flex items-end  justify-between">
              <div className="w-full">
                <Textarea
                  className="shadow-none border-none focus:outline-none focus:ring-0 focus:!ring-transparent focus:shadow-none focus:!border-none resize-none"
                  placeholder="Ask AI about your title, description and etc..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
              </div>

              <div className=" mx-1  ">
                <Button
                  disabled={!aiPrompt}
                  onClick={getGrogChatyCompletion}
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6  "
                >
                  <IoIosSend />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
