import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SketchPicker, SwatchesPicker } from "react-color";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";

const solidColorOptions = [
  "#000000",
  "#545454",
  "#737373",
  "#A6A6A6",
  "#D9D9D9",
  "#F5F5F5",
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

const ColorPickerBg = ({
  children,
  value = "rgba(255,255,255,1)",
  onChange,
}) => {
  const handleChange = (color) => {
    const { r, g, b, a } = color;
    const colorValue = `rgba(${r},${g},${b},${a})`;
    if (onChange) {
      onChange(colorValue);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="relative w-full p-0 left-6">
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
              color={value}
              onChange={(color) => handleChange(color.rgb)}
            />
          </TabsContent>
          <TabsContent className="m-0" value="sketch-colours">
            <SketchPicker
              width={220}
              className="custom-sketch-picker"
              color={value}
              onChange={(color) => handleChange(color.rgb)}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

const SolidColorOptions = ({ value, onChange }) => {
  const isCustomSolidColorSelected = !solidColorOptions.some(
    (color) => value === color
  );

  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-6 gap-4">
        {solidColorOptions.map((color, index) => {
          const isSelected = color === value;

          return (
            <Button
              key={index}
              onClick={() => onChange("background.bgColor", color)}
              className={` !select-none rounded-full cursor-pointer hover:ring-offset-2 ring-2 ring-slate-400 shadow-lg ${
                isSelected ? "ring-offset-[3px] ring-[3px] ring-purple-700" : ""
              } `}
              style={{
                backgroundColor: color,
                height: 40,
                width: 40,
                position: "relative",
              }}
            >
              {isSelected && (
                <div
                  className="text-green-500  "
                  style={{ position: "absolute", right: 0, top: 0 }}
                >
                  <FaCheckCircle size={20} />
                </div>
              )}
            </Button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <div>
          <ColorPickerBg
            value={value}
            onChange={(color) => onChange("background.bgColor", color)}
          >
            <Button variant="outline" className="px-[26px]">
              More Colours <IoIosColorPalette />
            </Button>
          </ColorPickerBg>
        </div>

        <div>
          <Button
            className={` !select-none rounded-full cursor-default hover:ring-offset-2 ring-2 ring-slate-400 shadow-lg ${
              isCustomSolidColorSelected
                ? "ring-offset-[3px] ring-[3px] ring-purple-700"
                : ""
            } `}
            style={{
              backgroundColor: isCustomSolidColorSelected ? value : "",
              height: 40,
              width: 40,
              position: "relative",
            }}
          >
            {isCustomSolidColorSelected && (
              <div
                className="text-green-500  "
                style={{ position: "absolute", right: 0, top: 0 }}
              >
                <FaCheckCircle size={20} />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SolidColorOptions;
