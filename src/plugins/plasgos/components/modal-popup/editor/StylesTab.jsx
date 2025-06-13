import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { transitionTypeOptions } from "@/plugins/plasgos/components/_components-editor/TransitionEditor";
import { produce } from "immer";
import { useState } from "react";
import ColorPicker from "@/plugins/plasgos/components/_components-editor/ColorPicker";

const StylesTab = ({ selectedComponent }) => {
  const [currentStyles, setCurrentStyles] = useState(
    selectedComponent.getStyle()
  );

  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { wrapperStyle } = currentComponent;

  const handleStyleWrapperChange = (key, value) => {
    const update = (current) => {
      return produce(current, (draft) => {
        draft[key] = value;
      });
    };

    selectedComponent.setStyle(update(currentStyles));
    setCurrentStyles(update(currentStyles));
  };

  return (
    <div className="flex flex-col gap-y-5 bg-white p-5 rounded-lg ">
      <ColorPicker
        label="Background Color"
        value={currentStyles["background-color"] || "#ffffff"}
        onChange={(color) =>
          handleStyleWrapperChange("background-color", color)
        }
      />

      <RangeInputSlider
        label="Width"
        value={parseInt(currentStyles.width || "0")}
        min={10}
        max={100}
        onChange={(value) => {
          const parsedValue = `${value}%`;
          handleStyleWrapperChange("width", parsedValue);
        }}
        unit="%"
      />

      <RangeInputSlider
        label="Rounded Corner"
        value={parseInt(currentStyles["border-radius"] || "0")}
        min={0}
        max={40}
        onChange={(value) => {
          const parsedValue = `${value}px`;
          handleStyleWrapperChange("border-radius", parsedValue);
        }}
      />

      <div className="space-y-2 w-full">
        <Label>Appear Effect</Label>
        <Select
          value={wrapperStyle.appearEffect}
          onValueChange={(value) => {
            handleComponentChange("wrapperStyle.appearEffect", value);
          }}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {transitionTypeOptions.map((transition) => (
              <SelectItem key={transition.value} value={transition.value}>
                {transition.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StylesTab;
