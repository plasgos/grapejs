import { useState } from "react";
import { SketchPicker } from "react-color";
import { FaCheckCircle } from "react-icons/fa";
import Compressor from "compressorjs";

import {
  FaArrowDownShortWide,
  FaArrowUpWideShort,
  FaRegImage,
} from "react-icons/fa6";
import {
  IoIosColorPalette,
  IoIosRadioButtonOn,
  IoMdColorFill,
} from "react-icons/io";
import { IoColorFill } from "react-icons/io5";
import { MdOutlineHideImage } from "react-icons/md";
import { RiFlipHorizontalFill } from "react-icons/ri";
import { TbTexture } from "react-icons/tb";
import { RxSpaceEvenlyVertically } from "react-icons/rx";
import { MdOutlineReadMore } from "react-icons/md";
import { Label } from "../../ui/label";

import { CgArrowsExpandLeft, CgArrowsExpandRight } from "react-icons/cg";
import { LuMoveVertical } from "react-icons/lu";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { produce } from "immer";

import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "react-lazy-load-image-component/src/effects/blur.css";
import bgDefaultImage from "@/assets//bg-image.jpg";

import pattern1 from "@/assets/pattern/pattern1.webp";
import pattern10 from "@/assets/pattern/pattern10.webp";
import pattern11 from "@/assets/pattern/pattern11.webp";
import pattern12 from "@/assets/pattern/pattern12.webp";
import pattern13 from "@/assets/pattern/pattern13.webp";
import pattern14 from "@/assets/pattern/pattern14.webp";
import pattern15 from "@/assets/pattern/pattern15.webp";
import pattern16 from "@/assets/pattern/pattern16.webp";
import pattern2 from "@/assets/pattern/pattern2.webp";
import pattern3 from "@/assets/pattern/pattern3.webp";
import pattern4 from "@/assets/pattern/pattern4.webp";
import pattern5 from "@/assets/pattern/pattern5.webp";
import pattern6 from "@/assets/pattern/pattern6.webp";
import pattern7 from "@/assets/pattern/pattern7.webp";
import pattern8 from "@/assets/pattern/pattern8.webp";
import pattern9 from "@/assets/pattern/pattern9.webp";

import RangeInputSlider from "./RangeInputSlider";
import { Button } from "../../ui/button";
import SelectCircle from "./SelectCircle";

export const patterns = [
  { img: pattern1 },
  { img: pattern2 },
  { img: pattern3 },
  { img: pattern4 },
  { img: pattern5 },
  { img: pattern6 },
  { img: pattern7 },
  { img: pattern8 },
  { img: pattern9 },
  { img: pattern10 },
  { img: pattern11 },
  { img: pattern12 },
  { img: pattern13 },
  { img: pattern14 },
  { img: pattern15 },
  { img: pattern16 },
];

const bgTypeOptions = [
  { value: null, label: "None", icon: <MdOutlineHideImage size={24} /> },
  { value: "bgColor", label: "Color", icon: <IoColorFill size={24} /> },
  { value: "gradients", label: "Gradients", icon: <IoMdColorFill size={26} /> },
  { value: "pattern", label: "Pattern", icon: <TbTexture size={22} /> },
  { value: "image", label: "Image", icon: <FaRegImage size={20} /> },
];

export const gradientOptions = [
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
  "#2196f3",
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

export const directionGradientOptions = [
  { value: "to bottom", icon: <FaArrowDownShortWide /> },
  { value: "to right", icon: <FaArrowUpWideShort className="rotate-90" /> },
  { value: "to right bottom", icon: <CgArrowsExpandLeft /> },
  { value: "to right top", icon: <CgArrowsExpandRight /> },
];

const SolidColorsCircle = ({ onClick, color, isSelected }) => {
  return (
    <div
      onClick={onClick}
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
    </div>
  );
};

const GradientsCircle = ({ fromColor, toColor, onClick, isSelected }) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor} )`,
    height: 40,
    width: 40,
    position: "relative",
  };

  return (
    <div
      onClick={onClick}
      className={`!select-none rounded-full cursor-pointer hover:ring-offset-2 ring-2 ring-slate-400 shadow-lg ${
        isSelected ? "ring-offset-[3px] ring-[3px] ring-purple-700" : ""
      } `}
      style={gradientStyle}
    >
      {isSelected && (
        <div
          className="text-green-500  "
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <FaCheckCircle size={20} />
        </div>
      )}
    </div>
  );
};

const PatternBox = ({ img, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
      style={{
        borderRadius: 10,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.1s ease-in-out",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LazyLoadImage
        src={img}
        alt="pattern"
        style={{ objectFit: "cover", width: "100%", height: 100 }}
        loading="lazy"
        effect="blur"
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: "1s" },
        }}
      />

      {isSelected && (
        <div
          className="text-green-500 "
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <FaCheckCircle size={24} />
        </div>
      )}
    </div>
  );
};

const PatternBoxWithScrollTracking = trackWindowScroll(PatternBox);

const PaddingOptionsEditor = ({
  background,
  handleChangePaddingOptions,
  handleChangeBackground,
  isNoneBg,
}) => {
  const { paddingY, paddingTop, paddingBottom } = background;
  return (
    <div
      className={`my-5 flex justify-between items-center ${
        isNoneBg ? "" : "border-t pt-5"
      }  `}
    >
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Padding Options <RxSpaceEvenlyVertically />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[310px] space-y-2 relative -right-3">
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
              }}
              className="cursor-pointer "
            >
              <div className="flex items-center gap-x-3">
                <Button
                  variant={
                    background.paddingType === "vertical" ? "" : "outline"
                  }
                  onClick={() => {
                    handleChangePaddingOptions("vertical");
                  }}
                >
                  Vertical <LuMoveVertical />
                </Button>
                <Button
                  variant={background.paddingType === "custom" ? "" : "outline"}
                  onClick={() => {
                    handleChangePaddingOptions("custom");
                  }}
                >
                  Custom <HiOutlineSwitchVertical />
                </Button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {background.paddingType === "vertical" ? (
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="cursor-pointer "
              >
                <RangeInputSlider
                  label="Padding Vertical"
                  value={paddingY}
                  min={0}
                  max={300}
                  onChange={(value) => {
                    handleChangeBackground("paddingY", value);
                  }}
                />
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="cursor-pointer "
                >
                  <RangeInputSlider
                    label="Padding Top"
                    value={paddingTop}
                    min={0}
                    max={300}
                    onChange={(value) => {
                      handleChangeBackground("paddingTop", value);
                    }}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="cursor-pointer "
                >
                  <RangeInputSlider
                    label="Padding Bottom"
                    value={paddingBottom}
                    min={0}
                    max={300}
                    onChange={(value) => {
                      handleChangeBackground("paddingBottom", value);
                    }}
                  />
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const BackgroundEditor = ({ selectedComponent }) => {
  const currentComponent = selectedComponent?.get("customComponent");

  const [background, setBackground] = useState(currentComponent.background);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Only accept image files
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      console.log(`Original file size: ${(file.size / 1024).toFixed(2)} KB`);

      // Check file size (in bytes) - 1MB = 1,048,576 bytes
      if (file.size > 1048576) {
        // Compress the image
        new Compressor(file, {
          quality: 0.5, // Set compression quality (0 to 1)
          success: (compressedFile) => {
            const reader = new FileReader();

            reader.onload = (event) => {
              const imageUrl = event.target.result;
              handleChangeBackground("bgImage", imageUrl);
            };

            reader.readAsDataURL(compressedFile);
          },
        });
      } else {
        // If file size is within limits, directly convert to Base64
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageUrl = event.target.result;
          handleChangeBackground("bgImage", imageUrl);
        };

        reader.readAsDataURL(file);
      }
    };
  };

  const handleChangeBackground = (key, value) => {
    const currentComponent = selectedComponent?.get("customComponent");

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.background[key] = value;
    });

    setBackground((prev) => ({
      ...prev,
      [key]: value,
    }));
    selectedComponent?.set("customComponent", updatedComponent);
  };

  const handleChangeBgType = (value) => {
    if (value === background.bgType) return;

    if (!currentComponent) return;

    const paddingOptions = {
      paddingType: currentComponent.background.paddingType,
      paddingY: currentComponent.background.paddingY,
      paddingTop: currentComponent.background.paddingTop,
      paddingBottom: currentComponent.background.paddingBottom,
    };

    // Helper function to get new background values
    const getBackgroundValues = (type) => {
      const baseValues = { ...paddingOptions, bgType: type };

      const typeConfigs = {
        null: baseValues,
        bgColor: { ...baseValues, bgColor: "#3f51b5" },
        gradients: {
          ...baseValues,
          fromColor: "#FF6F61",
          toColor: "#6B5B95",
          direction: "to right",
        },
        pattern: { ...baseValues, pattern: pattern3 },
        image: { ...baseValues, bgImage: bgDefaultImage, blur: 0, opacity: 0 },
      };

      return typeConfigs[type] || baseValues;
    };

    // Update component using Immer
    const updatedComponent = produce(currentComponent, (draft) => {
      draft.background = getBackgroundValues(value);
    });

    // Update local state and selectedComponent
    setBackground(getBackgroundValues(value));
    selectedComponent?.set("customComponent", updatedComponent);
  };

  const isCustomGradientSelected = !gradientOptions.some(
    (gradient) =>
      gradient.from === background.fromColor &&
      gradient.to === background.toColor
  );

  const isCustomSolidColorSelected = !solidColorOptions.some(
    (color) => background.bgColor === color
  );

  const handleChangePaddingOptions = (value) => {
    setBackground((prev) => ({
      ...prev,
      paddingType: value,
    }));

    if (value === "vertical") {
      setBackground((prev) => ({
        ...prev,
        paddingBottom: 0,
        paddingTop: 0,
      }));
      const updatedComponent = produce(currentComponent, (draft) => {
        draft.background.paddingType = value;
        draft.background.paddingTop = 0;
        draft.background.paddingBottom = 0;
      });
      selectedComponent?.set("customComponent", updatedComponent);
    } else {
      setBackground((prev) => ({
        ...prev,
        paddingY: 0,
      }));
      const updatedComponent = produce(currentComponent, (draft) => {
        draft.background.paddingType = value;
        draft.background.paddingY = 0;
      });
      selectedComponent?.set("customComponent", updatedComponent);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full bg-white p-3 rounded-lg">
        <SelectCircle
          label="Background Type"
          options={bgTypeOptions}
          value={background.bgType}
          onClick={(value) => {
            handleChangeBgType(value);
          }}
        />
        <div className="">
          <div className=" pb-2 border-b mb-5">
            <Label>Options</Label>
          </div>

          {background.bgType === "bgColor" && (
            <>
              <div className="grid grid-cols-6 gap-4">
                {solidColorOptions.map((color) => {
                  const handleSelectColor = () => {
                    handleChangeBackground("bgColor", color);
                  };

                  const isSelectedColor = color === background.bgColor;

                  return (
                    <div key={color}>
                      <SolidColorsCircle
                        color={color}
                        onClick={handleSelectColor}
                        isSelected={isSelectedColor}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="my-5 flex justify-between items-center">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="px-[26px]">
                        More Colours <IoIosColorPalette />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full relative -right-3">
                      <SketchPicker
                        className="custom-sketch-picker"
                        color={background.bgColor}
                        onChange={(color) => {
                          handleChangeBackground("bgColor", color.hex);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <SolidColorsCircle
                    isSelected={isCustomSolidColorSelected}
                    onClick={() => {}}
                    color={isCustomSolidColorSelected ? background.bgColor : ""}
                  />
                </div>
              </div>
            </>
          )}

          {background.bgType === "gradients" && (
            <>
              <div className="grid grid-cols-6 gap-4">
                {gradientOptions.map((gradient, index) => {
                  const handleClick = () => {
                    handleChangeBackground("fromColor", gradient.from);
                    handleChangeBackground("toColor", gradient.to);
                  };

                  const isSelected =
                    gradient.from === background.fromColor &&
                    gradient.to === background.toColor;
                  return (
                    <div key={index}>
                      <GradientsCircle
                        isSelected={isSelected}
                        onClick={handleClick}
                        key={index}
                        fromColor={gradient.from}
                        toColor={gradient.to}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="my-5 flex justify-between items-center">
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
                              style={{ color: background.fromColor }}
                            />
                          </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <SketchPicker
                              className="custom-sketch-picker"
                              color={background.fromColor}
                              onChange={(color) => {
                                handleChangeBackground("fromColor", color.hex);
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
                              style={{ color: background.toColor }}
                            />
                          </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <SketchPicker
                              className="custom-sketch-picker"
                              color={background.toColor}
                              onChange={(color) => {
                                handleChangeBackground("toColor", color.hex);
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
                                handleChangeBackground("direction", item.value);
                              }}
                              variant={
                                item.value === background.direction
                                  ? ""
                                  : "outline"
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
                            handleChangeBackground("isRevert", newIsRevert);
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
                  <GradientsCircle
                    isSelected={isCustomGradientSelected}
                    onClick={() => {}}
                    fromColor={
                      isCustomGradientSelected ? background.fromColor : ""
                    }
                    toColor={isCustomGradientSelected ? background.toColor : ""}
                  />
                </div>
              </div>
            </>
          )}

          {background.bgType === "pattern" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                {patterns.slice(0, 4).map((item, index) => {
                  const handleSelectPattern = () => {
                    handleChangeBackground("pattern", item.img);
                  };

                  const isSelected = item.img === background.pattern;

                  return (
                    <div key={index}>
                      <PatternBoxWithScrollTracking
                        img={item.img}
                        isSelected={isSelected}
                        onClick={handleSelectPattern}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex justify-center my-5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="px-[26px]">
                      More Pattern <MdOutlineReadMore />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" w-[300px] h-[400px] overflow-y-auto relative -right-3">
                    <div className="grid grid-cols-2 gap-3">
                      {patterns.map((item, index) => {
                        const handleSelectPattern = () => {
                          handleChangeBackground("pattern", item.img);
                        };

                        const isSelected = item.img === background.pattern;

                        return (
                          <div key={index}>
                            <PatternBoxWithScrollTracking
                              img={item.img}
                              isSelected={isSelected}
                              onClick={handleSelectPattern}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}

          {background.bgType === "image" && (
            <>
              <div className="mb-2 ">
                <div
                  style={{
                    backgroundColor: "#F5F5F5",
                    width: "100%",
                    overflow: "hidden",
                  }}
                  className="mx-auto mb-3 border rounded-md  "
                >
                  <img
                    style={{ objectFit: "contain", width: "100%", height: 120 }}
                    src={background.bgImage || bgDefaultImage}
                    alt="img"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleFileUpload}
                  variant="outline"
                >
                  Upload
                </Button>
              </div>
              <RangeInputSlider
                label="Blur"
                value={background.blur}
                min={0}
                max={40}
                onChange={(value) => {
                  handleChangeBackground("blur", value);
                }}
              />

              <RangeInputSlider
                label="Opacity"
                value={background.opacity}
                min={-50}
                max={50}
                onChange={(value) => {
                  handleChangeBackground("opacity", value);
                }}
              />
            </>
          )}
          <PaddingOptionsEditor
            background={background}
            handleChangePaddingOptions={handleChangePaddingOptions}
            handleChangeBackground={handleChangeBackground}
            isNoneBg={background.bgType === null ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundEditor;
