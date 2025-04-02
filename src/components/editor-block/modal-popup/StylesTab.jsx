import RangeInputSlider from "../_components/RangeInputSlider";

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
import { transitionTypeOptions } from "../_components/TransitionEditor";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { wrapperStyle } = currentComponent;

  return (
    <div className="flex flex-col gap-y-5 bg-white p-5 rounded-lg ">
      <RangeInputSlider
        label="Width"
        value={wrapperStyle.width}
        min={450}
        max={1000}
        onChange={(value) => {
          handleComponentChange("wrapperStyle.width", value);
        }}
      />

      <RangeInputSlider
        label="Rounded Corner"
        value={wrapperStyle.rounded}
        min={0}
        max={40}
        onChange={(value) => {
          handleComponentChange("wrapperStyle.rounded", value);
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
