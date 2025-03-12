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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";

const importCSS = `
  @import url("https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pacifico&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
`;

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

const parseImportCSS = (css) => {
  const fontFamilies = css
    .match(/family=([^&"]+)/g)
    ?.map((match) => match.split("=")[1]);
  const fontObjects = [];

  fontFamilies?.forEach((fontFamily) => {
    const [name, params] = fontFamily.split(":");
    const weights = [];

    if (params?.includes("wght@")) {
      const weightParams = params.match(/wght@([0-9.,;]+)/)?.[1];
      const weightSets = weightParams?.split(";") || [];

      weightSets.forEach((set) => {
        if (set.includes("..")) {
          const [start, end] = set.split("..").map(Number);
          for (let i = start; i <= end; i += 100) {
            weights.push(weightsMapping[i]);
          }
        } else {
          set.split(",").forEach((weight) => {
            const weightNumber = Number(weight);
            if (weightsMapping[weightNumber]) {
              weights.push(weightsMapping[weightNumber]);
            }
          });
        }
      });
    } else {
      weights.push(weightsMapping[400]); // Default to font-normal if no weights specified
    }

    fontObjects.push({
      fontFamily: name,
      weights,
    });
  });

  return fontObjects;
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const fontOptions = [
  {
    fontFamily: "Anonymous",
    weights: [
      { value: "font-normal", label: "Font Normal" }, // 400
      { value: "font-bold", label: "Font Bold" }, // 700
    ],
  },
  {
    fontFamily: "Montserrat",
    weights: [
      { value: "font-thin", label: "Font Thin" }, // 100
      { value: "font-light", label: "Font Light" }, // 300
      { value: "font-normal", label: "Font Normal" }, // 400
      { value: "font-medium", label: "Font Medium" }, // 500
      { value: "font-bold", label: "Font Bold" }, // 700
      { value: "font-extrabold", label: "Font Extra Bold" }, // 800
    ],
  },
  {
    fontFamily: "Roboto",
    weights: [
      { value: "font-thin", label: "Font Thin" }, // 100
      { value: "font-light", label: "Font Light" }, // 300
      { value: "font-normal", label: "Font Normal" }, // 400
      { value: "font-medium", label: "Font Medium" }, // 500
      {
        value: "font-semibold",
        label: "Font Semibold", // fontWeight: 600
      },
      { value: "font-bold", label: "Font Bold" }, // 700
    ],
  },
  {
    fontFamily: "Poppins",
    weights: [
      { value: "font-light", label: "Font Light" }, // 300
      { value: "font-normal", label: "Font Normal" }, // 400
      { value: "font-semibold", label: "Font Semibold" }, // 600
      { value: "font-bold", label: "Font Bold" }, // 700
      { value: "font-black", label: "Font Black" }, // 900
    ],
  },
  {
    fontFamily: "Pacifico",
    weights: [
      { value: "font-normal", label: "Font Normal" }, // 400
    ],
  },
];

const SelectFontFamily = ({
  asChild,
  label,
  fontFamily,
  fontWeight,
  onChangefontFamily,
  onChangefontWeight,
}) => {
  const [open, setOpen] = useState(false);

  const parsedFonts = parseImportCSS(importCSS);
  console.log("🚀 ~ parsedFonts:", parsedFonts);

  const currentFont = fontOptions.find(
    (font) => font.fontFamily === fontFamily
  );

  useEffect(() => {
    const isValidWeight = currentFont?.weights.some(
      (weight) => weight.value === fontWeight
    );
    if (!isValidWeight) {
      onChangefontWeight(currentFont?.weights[0].value);
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
              className="w-[180px] justify-between font-normal"
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
            {currentFont?.weights.map((opt) => (
              <SelectItem
                className={opt.value}
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectFontFamily;
