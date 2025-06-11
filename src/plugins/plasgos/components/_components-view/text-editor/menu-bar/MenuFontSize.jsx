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

  const currentFontSize = editor.getAttributes("textStyle")?.fontSize;

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

                    setIsOpenFontSizes(false);
                  }}
                >
                  {fontSize}
                  <Check
                    className={cn(
                      "ml-auto",
                      currentFontSize === fontSize ? "opacity-100" : "opacity-0"
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
