import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Toggle } from "../ui/toggle";

import { AiOutlineSlack } from "react-icons/ai";

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
import { Textarea } from "../ui/textarea";
import { IoIosSend } from "react-icons/io";

import ollama from "ollama";
import { Loader2 } from "lucide-react";

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

export default function MenuBar({ editor }) {
  const { googleFonts: fontOptions } = useSelector(
    (state) => state.landingPage
  );

  const [open, setOpen] = useState(false);
  const [isOpenFontSizes, setIsOpenFontSizes] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [aiPrompt, setAiPrompt] = useState("");

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

  const [aiResponse, setAiResponse] = useState("");

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
                Kamu adalah AI profesional yang ahli membuat konten untuk website dan landing page. 
                Fokus hanya membuat struktur hero section: title, subtitle, description, Call to action. 
                , jangan melebar kemana-mana.`,
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
        const result = response.message.content;
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
    //   icon: <Heading1 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   preesed: editor.isActive("heading", { level: 1 }),
    // },
    // {
    //   icon: <Heading2 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   preesed: editor.isActive("heading", { level: 2 }),
    // },
    // {
    //   icon: <Heading3 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    //   preesed: editor.isActive("heading", { level: 3 }),
    // },

    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
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

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50  z-50 flex gap-x-1.5">
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
              value={editor.getAttributes("textStyle").color}
              onChange={(value) => editor.chain().focus().setColor(value).run()}
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
        <Toggle
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}

      <Popover>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost">
                  <AiOutlineSlack className="size-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ask AI</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent side="top">
          <div className="mb-3">
            {isLoading && <Loader2 className="animate-spin" />}
            {aiResponse && (
              <div className="my-1 max-h-[200px] overflow-y-auto">
                <p className="text-xs">{aiResponse}</p>
              </div>
            )}
          </div>

          <div className="w-full border rounded-lg p-2">
            <div className="w-full">
              <Textarea
                className="shadow-none border-none focus:outline-none focus:ring-0 focus:!ring-transparent focus:shadow-none focus:!border-none resize-none"
                placeholder="Ask AI about your title, description and etc..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-1 ">
              <Button
                onClick={generateAiChat}
                variant="ghost"
                size="icon"
                className="w-6 h-6"
              >
                <IoIosSend />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
