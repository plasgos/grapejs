import { useState } from "react";
import { SketchPicker } from "react-color";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const parseRGBA = (rgba) => {
  console.log("🚀 ~ parseRGBA ~ rgba:", rgba);
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
  const [sketchPickerColor, setSketchPickerColor] = useState(parseRGBA(value));

  const { r, g, b, a } = sketchPickerColor;

  useEffect(() => {
    if (value) {
      setSketchPickerColor(parseRGBA(value));
    }
  }, [value]);

  const handleChange = (color) => {
    const { r, g, b, a } = color;
    const colorValue = `rgba(${r},${g},${b},${a})`;
    setSketchPickerColor(color);
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
        <PopoverTrigger asChild>
          <div className="p-0.5 border border-gray-300 shadow-sm cursor-pointer w-fit relative rounded-lg">
            <div
              style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}
              className="w-12 h-7 rounded"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <SketchPicker
            className="custom-sketch-picker"
            color={sketchPickerColor}
            onChange={(color) => handleChange(color.rgb)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
