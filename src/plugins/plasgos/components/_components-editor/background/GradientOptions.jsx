import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosColorPalette, IoIosRadioButtonOn } from "react-icons/io";
import { SketchPicker } from "react-color";
import { Label } from "@/components/ui/label";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import { CgArrowsExpandLeft, CgArrowsExpandRight } from "react-icons/cg";
import { RiFlipHorizontalFill } from "react-icons/ri";

const directionGradientOptions = [
  { value: "to bottom", icon: <FaArrowDownShortWide /> },
  { value: "to right", icon: <FaArrowUpWideShort className="rotate-90" /> },
  { value: "to right bottom", icon: <CgArrowsExpandLeft /> },
  { value: "to right top", icon: <CgArrowsExpandRight /> },
];

const gradientOptions = [
  { from: "#FF6F61", to: "#6B5B95" },
  { from: "#88B04B", to: "#F7CAC9" },
  { from: "#92A8D1", to: "#81F3FD" },
  { from: "#FFF176", to: "#66BB6A" },
  { from: "#98B4D4", to: "#FFDDC1" },
  { from: "#D4A5A5", to: "#B565A7" },
  { from: "#DECD63", to: "#FF6F61" },
  { from: "#2E4057", to: "#FFD662" },
  { from: "#45B8AC", to: "#EFC050" },
  { from: "#F5F5F5", to: "#37474F" },
  { from: "#6B5B95", to: "#BC70A4" },
  { from: "#92A8D1", to: "#F7CAC9" },

  { from: "#FF4500", to: "#1E90FF" },
  { from: "#800080", to: "#FFD700" },
  { from: "#4682B4", to: "#00FA9A" },
  { from: "#DC143C", to: "#FFB6C1" },
  { from: "#8A2BE2", to: "#5F9EA0" },
  { from: "#FFDAB9", to: "#8B0000" },
  { from: "#556B2F", to: "#7FFF00" },
  { from: "#FF6347", to: "#20B2AA" },
  { from: "#9932CC", to: "#FF4500" },
  { from: "#483D8B", to: "#DDA0DD" },
  { from: "#2F4F4F", to: "#00CED1" },
  { from: "#7B68EE", to: "#FF69B4" },
];

const GradientOptions = ({ background, onChange }) => {
  const isCustomGradientSelected = !gradientOptions.some(
    (gradient) =>
      gradient.from === background.fromColor &&
      gradient.to === background.toColor
  );

  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-6 gap-4">
        {gradientOptions.map((gradient, index) => {
          const isSelected =
            gradient.from === background?.fromColor &&
            gradient.to === background?.toColor;

          const handleChangeGradient = () => {
            onChange("background.fromColor", gradient.from);
            onChange("background.toColor", gradient.to);
          };

          return (
            <Button
              key={index}
              onClick={() => handleChangeGradient()}
              className={`!select-none rounded-full cursor-pointer hover:ring-offset-2 ring-2 ring-slate-400 shadow-lg ${
                isSelected ? "ring-offset-[3px] ring-[3px] ring-purple-700" : ""
              } `}
              style={{
                backgroundImage: `linear-gradient(to right, ${gradient.from}, ${gradient.to} )`,
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Custom Gradient <IoIosColorPalette />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[310px] space-y-2 relative -right-3">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-semibold">
                  <div className="flex items-center justify-between w-full">
                    <p>From Color</p>

                    <IoIosRadioButtonOn
                      className="ml-auto"
                      style={{ color: background?.fromColor }}
                    />
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <SketchPicker
                      className="custom-sketch-picker"
                      color={background?.fromColor}
                      onChange={(color) => {
                        onChange("background.fromColor", color.hex);
                      }}
                    />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-semibold">
                  <div className="flex items-center justify-between w-full">
                    <p>To Color</p>

                    <IoIosRadioButtonOn
                      className="ml-auto"
                      style={{ color: background?.toColor }}
                    />
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <SketchPicker
                      className="custom-sketch-picker"
                      color={background?.toColor}
                      onChange={(color) => {
                        onChange("background.toColor", color.hex);
                      }}
                    />
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="cursor-pointer flex justify-between"
              >
                <Label>Direction</Label>

                <div className="flex items-center gap-x-2">
                  {directionGradientOptions.map((item) => (
                    <Button
                      key={item.value}
                      onClick={() => {
                        onChange("background.direction", item.value);
                      }}
                      variant={
                        item.value === background.direction ? "" : "outline"
                      }
                      size="sm"
                    >
                      {item.icon}
                    </Button>
                  ))}
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="cursor-pointer flex justify-between"
              >
                <Label>Flip</Label>

                <Button
                  onClick={() => {
                    const newIsRevert = !background.isRevert;
                    onChange("background.isRevert", newIsRevert);
                  }}
                  variant={background.isRevert ? "" : "outline"}
                  aria-label="Toggle Flip"
                  size="sm"
                >
                  <RiFlipHorizontalFill className="h-4 w-4" />
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <Button
            className={`!select-none rounded-full cursor-default hover:ring-offset-2 ring-2 ring-slate-400 shadow-lg ${
              isCustomGradientSelected
                ? "ring-offset-[3px] ring-[3px] ring-purple-700"
                : ""
            } `}
            style={{
              backgroundImage: `linear-gradient(to right, ${
                isCustomGradientSelected ? background.fromColor : ""
              }, ${isCustomGradientSelected ? background.toColor : ""} )`,
              height: 40,
              width: 40,
              position: "relative",
            }}
          >
            {isCustomGradientSelected && (
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

export default GradientOptions;
