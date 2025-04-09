import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const weightsMapping = {
  100: { value: "font-thin", label: "Font Thin" },
  200: { value: "font-extralight", label: "Font Extra Light" },
  300: { value: "font-light", label: "Font Light" },
  400: { value: "font-normal", label: "Font Normal" },
  500: { value: "font-medium", label: "Font Medium" },
  600: { value: "font-semibold", label: "Font Semibold" },
  700: { value: "font-bold", label: "Font Bold" },
  800: { value: "font-extrabold", label: "Font Extra Bold" },
  900: { value: "font-black", label: "Font Black" },
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

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

const SelectFontFamily = ({
  asChild,
  label,
  fontFamily,
  fontWeight,
  onChangefontFamily,
  onChangefontWeight,
}) => {
  const [open, setOpen] = useState(false);

  const importStr = `@import url('https://fonts.googleapis.com/css2?family=Fleur+De+Leah&family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Kablammo&family=Lobster&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@100..900&family=Teko:wght@300..700&display=swap')`;

  const fontOptions = parseGoogleFontsImport(importStr);
  console.log("🚀 ~ fontOptions:", fontOptions);

  const currentFont = fontOptions.find(
    (font) => font.fontFamily === fontFamily
  );

  useEffect(() => {
    const isValidWeight = currentFont?.weights.some(
      (weight) => weight === fontWeight
    );
    if (!isValidWeight) {
      onChangefontWeight(currentFont?.weights[1]);
    }
  }, [fontWeight, currentFont, onChangefontWeight]);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between items-center">
        <Label className={`${asChild && "font-normal"}`}>{label}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="bg-muted">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-[180px] justify-between font-normal`}
              style={{
                fontFamily,
              }}
            >
              {fontFamily
                ? fontOptions.find((font) => font.fontFamily === fontFamily)
                    ?.fontFamily
                : "Select font..."}
              <ChevronDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search font..." className="h-9" />
              <CommandList>
                <CommandEmpty>No Font Family found.</CommandEmpty>
                <CommandGroup>
                  {fontOptions.map((font) => (
                    <CommandItem
                      style={{
                        fontFamily: font.fontFamily,
                      }}
                      key={font.fontFamily}
                      value={font.fontFamily}
                      onSelect={(currentValue) => {
                        onChangefontFamily(currentValue);
                        setOpen(false);
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
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {currentFont?.weights.length > 0 && (
        <div className="w-full flex items-center justify-between">
          {label && (
            <Label className={`${asChild && "font-normal"}`}>Weight</Label>
          )}

          <Select
            value={fontWeight}
            onValueChange={(value) => onChangefontWeight(value)}
          >
            <SelectTrigger className="w-[180px] bg-muted">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {currentFont?.weights.map((weight) => (
                <SelectItem
                  style={{
                    fontFamily,
                  }}
                  className={weightsMapping[weight]?.value}
                  key={weight}
                  value={weight}
                >
                  {weightsMapping[weight]?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default SelectFontFamily;
