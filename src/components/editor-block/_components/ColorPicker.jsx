import { Label } from "@/components/ui/label";
import { SketchPicker, SwatchesPicker } from "react-color";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const parseRGBA = (rgba) => {
  // Default value jika parsing gagal
  const defaultResult = {
    r: "0", // Default red value
    g: "0", // Default green value
    b: "0", // Default blue value
    a: "1", // Default alpha value (fully opaque)
  };

  if (rgba) {
    // Regex untuk mencocokkan format rgba atau rgb
    const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)$/;

    const match = rgba.match(regex);

    if (match) {
      return {
        r: match[1],
        g: match[2],
        b: match[3],
        a: match[4],
      };
    }
  }

  // Jika parsing gagal, kembalikan nilai default agar tidak error
  return defaultResult;
};

const ColorPicker = ({
  label,
  value = "rgba(255,255,255,1)",
  onChange,
  asChild,
}) => {
  const handleChange = (color) => {
    const { r, g, b, a } = color;
    const colorValue = `rgba(${r},${g},${b},${a})`;
    if (onChange) {
      onChange(colorValue);
    }
  };

  return (
    <div className="flex justify-between items-center  gap-2 relative w-full">
      {label && (
        <Label className={`${asChild && "font-normal"}`}>{label}</Label>
      )}

      <Popover>
        <PopoverTrigger>
          <div className="p-0.5 border border-gray-300 shadow-sm cursor-pointer w-fit relative rounded-lg">
            <div
              style={{ backgroundColor: value }}
              className="w-12 h-7 rounded"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Tabs defaultValue="pallete-colours" className="w-full ">
            <TabsList>
              <TabsTrigger className="text-sm w-full" value="pallete-colours">
                Pallete Colours
              </TabsTrigger>
              <TabsTrigger className="text-sm w-full" value="sketch-colours">
                Sketch Colours
              </TabsTrigger>
            </TabsList>
            <TabsContent className="m-0" value="pallete-colours">
              <SwatchesPicker
                width={273}
                className="custom-sketch-picker"
                color={parseRGBA(value)}
                onChange={(color) => handleChange(color.rgb)}
              />
            </TabsContent>
            <TabsContent className="m-0" value="sketch-colours">
              <SketchPicker
                width={220}
                className="custom-sketch-picker"
                color={parseRGBA(value)}
                onChange={(color) => handleChange(color.rgb)}
              />
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
