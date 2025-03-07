import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { shadowOptions } from "@/components/SelectOptions";
import { Button } from "@/components/ui/button";
import { SketchPicker } from "react-color";
import { IoIosColorPalette, IoIosRadioButtonOn } from "react-icons/io";
import RangeInputSlider from "./RangeInputSlider";
import TargetOptions from "./TargetOptions";

const ButtonSizeOptions = [
  { value: "sm", label: "SM" },
  { value: "default", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "xl", label: "XL" },
];

const variantsButton = [
  { value: "default", label: "Fill" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
];

const ButtonStylesEditor = ({
  selectedButton,
  handleButtonChange,
  handleButtonTargetChange,
  withoutRounded,
}) => {
  const getRGBAValue = (color) => {
    const { r, g, b, a } = color;
    return `rgba(${r},${g},${b},${a})`;
  };

  return (
    <div className="flex flex-col gap-y-3 mx-1">
      <div className="space-y-2 ">
        <Label className="text-xs ">Text</Label>
        <Input
          value={selectedButton.stylesBtn.title}
          onChange={(e) => {
            handleButtonChange(
              selectedButton.id,
              "stylesBtn",
              "title",
              e.target.value
            );
          }}
          className="bg-white"
        />
      </div>

      <div className="space-y-2 ">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Custom Styles <IoIosColorPalette />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[310px] space-y-2 relative -right-3">
              <DropdownMenuLabel>Options</DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-slate-300" />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-semibold ">
                  Variant
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={selectedButton.stylesBtn.variant}
                      onValueChange={(value) => {
                        handleButtonChange(
                          selectedButton.id,
                          "stylesBtn",
                          "variant",
                          value
                        );
                      }}
                    >
                      {variantsButton.map((variant) => (
                        <DropdownMenuRadioItem
                          onSelect={(e) => e.preventDefault()}
                          className="cursor-pointer "
                          key={variant.value}
                          value={variant.value}
                        >
                          {variant.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              {selectedButton.stylesBtn.variant !== "ghost" && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-semibold">
                    <div className="flex items-center justify-between w-full">
                      <p>
                        {selectedButton.stylesBtn.variant === "outline"
                          ? "Outline Color"
                          : "Background Color"}
                      </p>

                      <IoIosRadioButtonOn
                        className="ml-auto"
                        style={{ color: selectedButton.stylesBtn.btnColor }}
                      />
                    </div>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <SketchPicker
                        className="custom-sketch-picker"
                        color={selectedButton.stylesBtn.btnColor}
                        onChange={(color) => {
                          handleButtonChange(
                            selectedButton.id,
                            "stylesBtn",
                            "btnColor",
                            getRGBAValue(color.rgb)
                          );
                        }}
                      />
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-semibold">
                  <div className="flex items-center justify-between w-full">
                    <p>Text Color</p>

                    <IoIosRadioButtonOn
                      className="ml-auto"
                      style={{ color: selectedButton.stylesBtn.textColor }}
                    />
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <SketchPicker
                      className="custom-sketch-picker"
                      color={selectedButton.stylesBtn.textColor}
                      onChange={(color) => {
                        handleButtonChange(
                          selectedButton.id,
                          "stylesBtn",
                          "textColor",
                          getRGBAValue(color.rgb)
                        );
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
                <Label>Size</Label>

                <div className="flex items-center gap-x-2">
                  {ButtonSizeOptions.map((item) => (
                    <Button
                      key={item.value}
                      onClick={() => {
                        handleButtonChange(
                          selectedButton.id,
                          "stylesBtn",
                          "size",
                          item.value
                        );
                      }}
                      variant={
                        item.value === selectedButton.stylesBtn.size
                          ? ""
                          : "outline"
                      }
                      size="sm"
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </DropdownMenuItem>

              {!withoutRounded && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="cursor-pointer "
                >
                  <RangeInputSlider
                    label="Runded Corner"
                    value={selectedButton.stylesBtn.rounded}
                    min={0}
                    max={50}
                    onChange={(value) => {
                      handleButtonChange(
                        selectedButton.id,
                        "stylesBtn",
                        "rounded",
                        value
                      );
                    }}
                  />
                </DropdownMenuItem>
              )}

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="font-semibold">
                  Shadow
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={selectedButton.stylesBtn.shadow}
                      onValueChange={(value) => {
                        handleButtonChange(
                          selectedButton.id,
                          "stylesBtn",
                          "shadow",
                          value
                        );
                      }}
                    >
                      {shadowOptions.map((shadow) => (
                        <DropdownMenuRadioItem
                          onSelect={(e) => e.preventDefault()}
                          className="cursor-pointer "
                          key={shadow.value}
                          value={shadow.value}
                        >
                          {shadow.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div>
        <TargetOptions
          content={selectedButton}
          handleContentChange={handleButtonTargetChange}
        />
      </div>
    </div>
  );
};

export default ButtonStylesEditor;
