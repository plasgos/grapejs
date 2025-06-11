import { Button } from "@/components/ui/button";
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
import { Check, ChevronDown } from "lucide-react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const MenuFontFamily = ({ editor }) => {
  const { googleFonts: fontOptions } = useSelector(
    (state) => state.landingPage
  );
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const virtualizerRef = useRef(null);
  const viewportRef = useRef(null);

  const fontFamily = editor.getAttributes("textStyle")?.fontFamily;

  const filteredFonts = useMemo(() => {
    if (!inputValue) {
      return fontOptions;
    }

    return fontOptions.filter((item) =>
      item.fontFamily.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [fontOptions, inputValue]);

  const handleSelectFont = (fontFamily) => {
    editor.chain().focus().setFontFamily(fontFamily).run();
  };

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

  return (
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
                    keepMounted={activeIndex !== -1 ? [activeIndex] : undefined}
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
  );
};

export default MenuFontFamily;
