import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

const MenuFontSize = ({ editor }) => {
  const [isOpenFontSizes, setIsOpenFontSizes] = useState(false);

  const fontSizes = [
    { label: "XS", value: "clamp(0.75rem, 1vw, 0.875rem)" },
    { label: "SM", value: "clamp(0.875rem, 1.2vw, 1rem)" },
    { label: "Base", value: "clamp(1rem, 1.5vw, 1.125rem)" },
    { label: "LG", value: "clamp(1.125rem, 2vw, 1.25rem)" },
    { label: "XL", value: "clamp(1.25rem, 2.5vw, 1.5rem)" },
    { label: "2XL", value: "clamp(1.5rem, 3vw, 2rem)" },
    { label: "3XL", value: "clamp(1.875rem, 4vw, 2.25rem)" },
    { label: "4XL", value: "clamp(2.25rem, 5vw, 3rem)" },
  ];

  const selected = editor.getAttributes("textStyle")?.fontSize;
  const currentFontSize = fontSizes.find((font) => font.value === selected);
  return (
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
              {currentFontSize?.label ? currentFontSize?.label : "Font Size"}
            </p>
            <ChevronDown className="opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {fontSizes.map(({ label, value }) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={(value) => {
                    editor.chain().focus().setFontSize(value).run();

                    setIsOpenFontSizes(false);
                  }}
                >
                  {label}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentFontSize?.value === value
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
  );
};

export default MenuFontSize;
