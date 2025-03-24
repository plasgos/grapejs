import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { produce } from "immer";
import IconPicker from "./IconPicker";
import { useEffect } from "react";

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

import { Button } from "@/components/ui/button";
import { IoIosColorPalette, IoIosRadioButtonOn } from "react-icons/io";
import { SketchPicker } from "react-color";
import RangeInputSlider from "./RangeInputSlider";
import TargetOptions from "./TargetOptions";

const ButtonSizeOptions = [
  { value: "sm", label: "SM" },
  { value: "md", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "xl", label: "XL" },
];

const shadowOptions = [
  { value: "", label: "None" },
  { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", label: "Shadow Extra Small" },
  {
    value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    label: "Shadow Small",
  },
  {
    value:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    label: "Shadow Medium",
  },
  {
    value:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    label: "Shadow Large",
  },
  {
    value:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    label: "Shadow Extra Large",
  },
  { value: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", label: "Shadow Blur" },
];

const variantsButton = [
  { value: "fill", label: "Fill" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
];

const ButtonStyleEditor = ({ selectedComponent, isOpenMenu = false }) => {
  const [buttonText, setButtonText] = useState("Sign Up");
  const [selectedIcon, setSelectedIcon] = useState({
    icon: "",
    color: "rgba(0,0,0,0,1)",
    size: 24,
    position: "right",
  });

  const [styles, setStyles] = useState({
    btnColor: "",
    textColor: "",
    size: "md",
    variant: "fill",
    rounded: 10,
    shadow: "",
  });

  const handleContentChange = (key, value) => {
    const currentComponent = selectedComponent?.get("customComponent");

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.content[key] = value;
    });
    selectedComponent?.set("customComponent", updatedComponent);
  };

  const handleSelectIcon = (key, value) => {
    const currentComponent = selectedComponent?.get("customComponent");

    const updatedIcon = { ...selectedIcon, [key]: value };
    setSelectedIcon(updatedIcon);

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.content.iconBtn[key] = value;
    });

    console.log("🚀 ~ updatedComponent ~ updatedComponent:", updatedComponent);

    selectedComponent?.set("customComponent", updatedComponent);
  };

  const handleChangeStyles = (key, value) => {
    const currentComponent = selectedComponent?.get("customComponent");

    const updatedIcon = { ...selectedIcon, [key]: value };
    setSelectedIcon(updatedIcon);

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.content.stylesBtn[key] = value;
    });
    selectedComponent?.set("customComponent", updatedComponent);
  };

  useEffect(() => {
    if (selectedComponent) {
      const currentComponent = selectedComponent.get("customComponent");

      const { btnColor, textColor, size, variant, rounded, shadow } =
        currentComponent.content.stylesBtn || {};

      setSelectedIcon({
        icon: currentComponent?.content?.iconBtn?.icon || selectedIcon.icon,
        color: currentComponent?.content?.iconBtn?.color || selectedIcon.color,
        size: currentComponent?.content?.iconBtn?.size || selectedIcon.size,
        position:
          currentComponent?.content?.iconBtn?.position || selectedIcon.position,
      });

      setStyles({
        btnColor: btnColor,
        textColor: textColor,
        size: size,
        variant: variant,
        rounded: rounded,
        shadow: shadow,
      });
    }
  }, [selectedComponent]);

  return (
    <Accordion
      defaultValue={isOpenMenu ? "btnMenu" : ""}
      type="single"
      collapsible
    >
      <AccordionItem value="btnMenu">
        <AccordionTrigger className="!no-underline bg-white rounded px-3  ">
          Button
        </AccordionTrigger>
        <AccordionContent className="bg-white rounded p-2 pb-5">
          <div className="flex flex-col gap-y-3 mx-1">
            <div className="space-y-2 ">
              <Label className="text-xs ">Text</Label>
              <Input
                value={buttonText}
                onChange={(e) => {
                  setButtonText(e.target.value);
                  handleContentChange("buttonText", e.target.value);
                }}
                className="bg-white"
              />
            </div>

            <div className="space-y-2 ">
              {/* <Label className="text-xs ">Styles</Label> */}

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
                            value={styles.variant}
                            onValueChange={(value) => {
                              setStyles((prev) => ({
                                ...prev,
                                variant: value,
                              }));
                              handleChangeStyles("variant", value);
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

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="font-semibold">
                        <div className="flex items-center justify-between w-full">
                          <p>Button Color</p>

                          <IoIosRadioButtonOn
                            className="ml-auto"
                            style={{ color: styles.btnColor }}
                          />
                        </div>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <SketchPicker
                            className="custom-sketch-picker"
                            color={styles.btnColor}
                            onChange={(color) => {
                              setStyles((prev) => ({
                                ...prev,
                                btnColor: color.hex,
                              }));
                              handleChangeStyles("btnColor", color.hex);
                            }}
                          />
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="font-semibold">
                        <div className="flex items-center justify-between w-full">
                          <p>Text Color</p>

                          <IoIosRadioButtonOn
                            className="ml-auto"
                            style={{ color: styles.textColor }}
                          />
                        </div>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <SketchPicker
                            className="custom-sketch-picker"
                            color={styles.textColor}
                            onChange={(color) => {
                              setStyles((prev) => ({
                                ...prev,
                                textColor: color.hex,
                              }));
                              handleChangeStyles("textColor", color.hex);
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
                              setStyles((prev) => ({
                                ...prev,
                                size: item.value,
                              }));
                              handleChangeStyles("size", item.value);
                            }}
                            variant={
                              item.value === styles.size ? "" : "outline"
                            }
                            size="sm"
                          >
                            {item.label}
                          </Button>
                        ))}
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="cursor-pointer "
                    >
                      <RangeInputSlider
                        label="Runded Corner"
                        value={styles.rounded}
                        min={0}
                        max={50}
                        onChange={(value) => {
                          setStyles((prev) => ({
                            ...prev,
                            rounded: value,
                          }));
                          handleChangeStyles("rounded", value);
                        }}
                      />
                    </DropdownMenuItem>

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="font-semibold">
                        Shadow
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup
                            value={styles.shadow}
                            onValueChange={(value) => {
                              setStyles((prev) => ({
                                ...prev,
                                shadow: value,
                              }));
                              handleChangeStyles("shadow", value);
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
              <IconPicker
                label="Icon"
                onSelectIcon={(key, value) => handleSelectIcon(key, value)}
                value={selectedIcon}
              />
            </div>

            {/* <TargetOptions selectedComponent={selectedComponent} /> */}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ButtonStyleEditor;
