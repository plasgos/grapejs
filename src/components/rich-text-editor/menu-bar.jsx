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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/components/ui/virtualized";

import { googleFonts } from "@/lib/googleFonts";
import { cn } from "@/lib/utils";
import { generateGoogleFontsImportWithWeights } from "@/utils/injectGoogleFonts";
import { BubbleMenu } from "@tiptap/react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ColorPicker from "../editor-block/_components/ColorPicker";
import { Button } from "../ui/button";

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

function parseGoogleFontsImport(importStr) {
  const url = importStr.match(/url\(['"]?([^'")]+)['"]?\)/)?.[1];
  if (!url) return [];

  const fontOptions = [];
  const query = new URL(url).searchParams;
  const families = query.getAll("family");

  families.forEach((familyStr) => {
    const [rawName, weightPart] = familyStr.split(":");
    const fontFamily = rawName.replace(/\+/g, " ");
    let weights = [];

    if (weightPart?.includes("ital,wght@")) {
      // Contoh: ital,wght@0,100;1,200 => ambil angka kedua saja
      const entries = weightPart.split("ital,wght@")[1].split(";");
      weights = entries.map((entry) => parseInt(entry.split(",")[1], 10));
    } else if (weightPart?.includes("wght@")) {
      // Contoh: wght@100;300;700 atau wght@100..900
      const entries = weightPart.split("wght@")[1].split(";");
      weights = entries.flatMap((w) => {
        if (w.includes("..")) {
          const [start, end] = w.split("..").map(Number);
          return Array.from(
            { length: Math.floor((end - start) / 100) + 1 },
            (_, i) => start + i * 100
          );
        }
        return parseInt(w, 10);
      });
    }

    fontOptions.push({
      fontFamily,
      weights: [...new Set(weights)].sort((a, b) => a - b),
    });
  });

  return fontOptions;
}

export default function MenuBar({ editor }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const virtualizerRef = useRef(null);
  const viewportRef = useRef(null);

  const fontFamily = editor.getAttributes("textStyle")?.fontFamily;

  const googleFontsImport = generateGoogleFontsImportWithWeights(googleFonts);

  const fontOptions = parseGoogleFontsImport(googleFontsImport);

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

  if (!editor) {
    return null;
  }

  const headingOptions = [
    {
      level: 1,
      value: "heading-1",
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      level: 2,
      value: "heading-2",
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      level: 3,
      value: "heading-3",
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
  ];

  const Options = [
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
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
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
  ];

  const getCurrentHeadingValue = () => {
    const active = headingOptions.find((heading) =>
      editor?.isActive("heading", { level: heading.level })
    );
    return active?.value || "";
  };

  const currentHeadingValue = getCurrentHeadingValue();

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50 flex">
      {/* <Select
        value={currentHeadingValue}
        onValueChange={(value) => {
          const selected = headingOptions.find(
            (heading) => heading.value == value
          );

          selected.onClick();

          //   if (
          //     selected &&
          //     editor.isActive("heading", { level: selected.level })
          //   ) {
          //     editor.chain().focus().toggleParagraph().run();
          //   } else {
          //     selected.onClick();
          //   }
        }}
      >
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder="P" />
        </SelectTrigger>
        <SelectContent>
          {headingOptions.map((heading, index) => (
            <SelectItem key={index} value={heading.value}>
              {heading.icon}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}

      <BubbleMenu
        editor={editor}
        tippyOptions={{
          duration: 100,
          interactive: true,
          //   appendTo: () => document.body,
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
            <Select
              value={editor.getAttributes("textStyle")?.fontSize}
              onValueChange={(value) => {
                editor.chain().focus().setFontSize(value).run();
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder=" Font Size" />
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map((fontSize, index) => (
                  <SelectItem key={index} value={fontSize}>
                    {fontSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
                      {fontFamily
                        ? fontOptions.find(
                            (font) => font.fontFamily === fontFamily
                          )?.fontFamily
                        : "Font Family"}
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
    </div>
  );
}
