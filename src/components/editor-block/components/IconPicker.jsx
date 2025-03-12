import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { FaEllipsisVertical, FaTrashCan } from "react-icons/fa6";

import { parseRGBA } from "@/lib/utils";
import { createElement, useEffect, useRef } from "react";
import * as Icons from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosRadioButtonOn } from "react-icons/io";
import RangeInputSlider from "./RangeInputSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IconPicker = ({
  label,
  onSelectIcon,
  value,
  withoutIconSize,
  withoutIconPosition,
  withoutRemove,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [sketchPickerColor, setSketchPickerColor] = useState(
    parseRGBA(value?.color)
  );

  const iconList = Object.keys(Icons);

  const [filteredIcons, setFilteredIcons] = useState(Object.keys(Icons));

  const searchInputRef = useRef(null);

  // Perform search when onBlur or Enter is pressed
  const handleSearch = () => {
    const searchTerm = searchInputRef.current?.value || "";
    const filtered = iconList.filter((iconKey) =>
      iconKey.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIcons(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (color) => {
    const { r, g, b, a } = color;
    const colorValue = `rgba(${r},${g},${b},${a})`;
    setSketchPickerColor(color);
    onSelectIcon("color", colorValue);
  };

  useEffect(() => {
    if (value.color) {
      setSketchPickerColor(parseRGBA(value.color));
    }
  }, [value]);

  return (
    <>
      <div className="flex items-center justify-between ">
        <Label className="">{label}</Label>

        <div className="flex items-center gap-x-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                {value.icon
                  ? Icons[value.icon] && (
                      <>
                        <div style={{ color: value.color }}>
                          {createElement(Icons[value.icon], { size: 24 })}
                        </div>
                      </>
                    )
                  : "Search..."}
              </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[60%]">
              <DialogHeader>
                <DialogTitle>Icon Picker</DialogTitle>
                <DialogDescription className="hidden">X</DialogDescription>
              </DialogHeader>

              <div className="relative w-1/2  ">
                <Input
                  ref={searchInputRef}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSearch}
                  className="rounded-full  pr-10 bg-[#FFF4EA]"
                  placeholder={`Search by pressing "Enter"`}
                />

                <div
                  onClick={handleSearch}
                  className="absolute right-5 top-2.5 z-10 cursor-pointer "
                >
                  <HiMagnifyingGlass className="text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-4 border p-4 rounded-lg bg-[#FFF4EA] overflow-y-auto h-[400px] items-start justify-items-center auto-rows-min">
                {filteredIcons.length > 0 ? (
                  filteredIcons.map((iconKey) => {
                    const IconComponent = Icons[iconKey];
                    return (
                      <DialogClose key={iconKey}>
                        <div
                          className="flex flex-col items-center cursor-pointer border p-2 bg-white shadow-sm rounded "
                          onClick={() => {
                            onSelectIcon("icon", iconKey);
                          }}
                        >
                          <IconComponent size={24} />
                        </div>
                      </DialogClose>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    No icons found.
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {value.icon && (
            <div className="cursor-pointer">
              <DropdownMenu
                open={isOpenDropdown}
                onOpenChange={setIsOpenDropdown}
              >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-0">
                    <FaEllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] space-y-2">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="font-semibold">
                      <div className="flex items-center justify-between w-full">
                        <p>Icon Color</p>

                        <IoIosRadioButtonOn
                          className="ml-auto"
                          style={{ color: value.color }}
                        />
                      </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <SketchPicker
                          className="custom-sketch-picker"
                          color={sketchPickerColor}
                          onChange={(color) => handleChange(color.rgb)}
                        />
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  {!withoutIconSize && (
                    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                      <RangeInputSlider
                        label="Icon Size"
                        value={value?.size}
                        min={14}
                        max={100}
                        onChange={(value) => {
                          onSelectIcon("size", value);
                        }}
                      />
                    </DropdownMenuItem>
                  )}

                  {!withoutIconPosition && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="cursor-pointer flex justify-between"
                    >
                      <Label>Icon Position</Label>
                      <RadioGroup
                        value={value?.position}
                        onValueChange={(value) =>
                          onSelectIcon("position", value)
                        }
                        defaultValue="right"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="left" id="left" />
                          <Label htmlFor="left">Left</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="right" id="right" />
                          <Label htmlFor="right">Right</Label>
                        </div>
                      </RadioGroup>
                    </DropdownMenuItem>
                  )}

                  {!withoutRemove && (
                    <DropdownMenuItem
                      onClick={() => onSelectIcon("icon", "")}
                      className="cursor-pointer justify-end"
                    >
                      <FaTrashCan /> Remove Icon
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default IconPicker;
