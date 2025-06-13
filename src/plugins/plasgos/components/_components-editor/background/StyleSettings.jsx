import { Label } from "@/components/ui/label";
import RangeInputSlider from "../RangeInputSlider";
import { LuArrowUpDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cx } from "class-variance-authority";
import { Switch } from "@/components/ui/switch";

const StyleSettings = ({ background, onChange }) => {
  const { padding, marginTop, marginBottom, rounded } = background || {};

  const [isMultipleMarginChange, setIsMultipleMarginChange] = useState(true);

  const handelPaddingChange = (key, value) => {
    onChange(`background.${key}`, value);
  };

  const handelMarginChange = (key, value) => {
    if (isMultipleMarginChange) {
      onChange(`background.marginTop`, value);
      onChange(`background.marginBottom`, value);
    } else {
      onChange(`background.${key}`, value);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-5 rounded-lg bg-white p-3">
      <Label>Settings</Label>

      <div className="flex justify-between items-center ">
        <Label className="">Full Width Page</Label>
        <Switch
          checked={background.isFullWidth}
          onCheckedChange={(checked) =>
            onChange("background.isFullWidth", checked)
          }
        />
      </div>

      {background.bgType !== null && (
        <RangeInputSlider
          label="Rounded Corner"
          value={rounded}
          min={0}
          max={100}
          onChange={(value) => {
            onChange("background.rounded", value);
          }}
        />
      )}
      <RangeInputSlider
        label="Padding"
        value={padding}
        min={0}
        max={200}
        onChange={(value) => {
          handelPaddingChange("padding", value);
        }}
        // responsiveMode={true}
        // onChange={(value) => {
        //   const clampPadding = `clamp(${value * 0.3}px, ${
        //     value * 0.5
        //   }vw, ${value}px)`;
        //   handelPaddingChange("padding", clampPadding);
        // }}
      />
      <div className="p-2 bg-purple-50 rounded-lg">
        <RangeInputSlider
          label="Margin Top"
          value={marginTop}
          min={0}
          max={300}
          onChange={(value) => {
            handelMarginChange("marginTop", value);
          }}
        />

        <div className="flex justify-end mt-1">
          <Button
            onClick={() => setIsMultipleMarginChange((prev) => !prev)}
            className={cx(
              "w-7 h-7 my-1 ",
              isMultipleMarginChange ? "bg-purple-600 hover:bg-purple-700" : ""
            )}
            size="icon"
            variant={cx("", isMultipleMarginChange ? "" : "ghost")}
          >
            <LuArrowUpDown />
          </Button>
        </div>

        <div className="-mt-5">
          <RangeInputSlider
            label="Margin Bottom"
            value={marginBottom}
            min={0}
            max={300}
            onChange={(value) => {
              handelMarginChange("marginBottom", value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StyleSettings;
