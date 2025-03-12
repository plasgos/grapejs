import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import RangeInputSlider from "../components/RangeInputSlider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { transitionTypeOptions } from "../components/TransiitonEditor";

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5 bg-white p-5 rounded-lg mt-5">
      <RangeInputSlider
        label="Width"
        value={wrapperStyle.width}
        min={450}
        max={1000}
        onChange={(value) => {
          handleStylesChange("width", value);
        }}
      />

      <RangeInputSlider
        label="Rounded Corner"
        value={wrapperStyle.rounded}
        min={0}
        max={40}
        onChange={(value) => {
          handleStylesChange("rounded", value);
        }}
      />

      <div className="space-y-2 w-full">
        <Label>Appear Effect</Label>
        <Select
          value={wrapperStyle.appearEffect}
          onValueChange={(value) => {
            handleStylesChange("appearEffect", value);
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
