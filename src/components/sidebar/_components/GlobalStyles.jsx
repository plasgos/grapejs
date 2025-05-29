import {
  handleAddWatermark,
  handleRemoveWatermark,
} from "@/components/MainWebEditor";
import { schemeColours } from "@/components/theme-colors";
import ColorPalettesOptions from "@/components/theme-colors/ColorPalettesOptions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { onSyncSchemeColor } from "@/utils/onSyncSchemeColor";
import { useEditor } from "@grapesjs/react";
import { produce } from "immer";
import ColorPicker from "../../editor-block/_components/ColorPicker";
import { widthPageOptions } from "../../SelectOptions";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const GlobalStyles = () => {
  const editor = useEditor();
  const [globalOptions, updateGlobalOptions] = useGlobalOptions(editor);
  const { schemeColor, maxWidthPage, bgColor, watermark, isSubscribed } =
    globalOptions || {};
  const wrapper = editor.getWrapper();

  const handleChangeWidthPage = (value) => {
    updateGlobalOptions({
      maxWidthPage: value,
    });
  };

  const changeBackgroundColor = (color) => {
    updateGlobalOptions({
      bgColor: color,
    });

    if (wrapper) {
      wrapper.addStyle({
        "background-color": color,
      });
    }
  };

  const handleChangeSchemeColor = (valueName) => {
    const schemeColorValue = schemeColours.find(
      (schemeColor) => schemeColor.name === valueName
    );

    updateGlobalOptions({
      schemeColor: valueName,
      bgColor: schemeColorValue.baseColor,
    });

    onSyncSchemeColor(editor, schemeColorValue);

    if (wrapper) {
      wrapper.addStyle({
        "background-color": schemeColorValue.baseColor,
      });
    }
  };

  const onResetSchemeColor = () => {
    updateGlobalOptions({
      schemeColor: null,
      bgColor: "",
    });

    const colorKeysToKeep = [
      // "bgColor",
      "borderColor",
      "quoteColor",
      "starsColor",
      "daysColor",
      "hoursColor",
      "minutesColor",
      "secondsColor",
      "color",
    ];
    function resetColorValuesWithExclusion(obj) {
      const normalizedKeepKeys = colorKeysToKeep.map((k) => k.toLowerCase());

      if (Array.isArray(obj)) {
        obj.forEach((item) => resetColorValuesWithExclusion(item));
        return;
      }

      for (const key in obj) {
        const value = obj[key];

        if (typeof value === "object" && value !== null) {
          resetColorValuesWithExclusion(value);
        } else if (
          key.toLowerCase().includes("color") &&
          !normalizedKeepKeys.includes(key.toLowerCase())
        ) {
          obj[key] = "";
        }
      }
    }

    const components = editor?.getComponents().models;
    components.forEach((component) => {
      const customComponent = component.get("customComponent") || {};

      const updatedCustomComponent = produce(customComponent, (draft) => {
        resetColorValuesWithExclusion(draft);
      });

      component.set("customComponent", updatedCustomComponent);
    });

    if (wrapper) {
      wrapper.addStyle({
        "background-color": "",
      });
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="p-5 flex flex-col gap-y-5 rounded-lg ">
      <p className="font-semibold">Design Settings</p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {maxWidthPage ? `${maxWidthPage}px` : "Select page width"}
            <ChevronDown className="opacity-50 ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandList>
              {widthPageOptions.map((group) => (
                <CommandGroup
                  key={group.label}
                  heading={
                    <span className="text-sm font-semibold text-black">
                      {group.label}
                    </span>
                  }
                >
                  {group.options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value.toString()}
                      onSelect={(val) => {
                        const num = parseInt(val);
                        handleChangeWidthPage(num);
                        setOpen(false);
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          maxWidthPage === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <ColorPicker
        label="Background Color"
        value={bgColor || "#ffffff"}
        onChange={(color) => changeBackgroundColor(color)}
      />

      <ColorPalettesOptions
        label="Color Palettes"
        value={schemeColor}
        onChange={(value) => handleChangeSchemeColor(value)}
        onResetSchemeColor={onResetSchemeColor}
      />

      <div className="flex justify-between items-center m-3">
        <Label className="">Watermark</Label>
        <Switch
          checked={watermark}
          onCheckedChange={(checked) => {
            updateGlobalOptions({ watermark: checked });

            if (editor) {
              if (checked) {
                handleAddWatermark(editor);
              } else {
                handleRemoveWatermark(editor);
              }
            }
          }}
          disabled={!isSubscribed}
        />
      </div>
    </div>
  );
};

export default GlobalStyles;
