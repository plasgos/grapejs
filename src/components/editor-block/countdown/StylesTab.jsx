import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import ColorPicker from "../_components/ColorPicker";
import { Label } from "@/components/ui/label";
import RangeInputSlider from "../_components/RangeInputSlider";

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5  p-3 bg-white rounded-lg">
      <Label>Colours</Label>

      <ColorPicker
        label="Day"
        value={wrapperStyle.daysColor}
        onChange={(color) => handleStylesChange("daysColor", color)}
      />
      <ColorPicker
        label="Hours"
        value={wrapperStyle.hoursColor}
        onChange={(color) => handleStylesChange("hoursColor", color)}
      />
      <ColorPicker
        label="Minutes"
        value={wrapperStyle.minutesColor}
        onChange={(color) => handleStylesChange("minutesColor", color)}
      />
      <ColorPicker
        label="Seconds"
        value={wrapperStyle.secondsColor}
        onChange={(color) => handleStylesChange("secondsColor", color)}
      />

      <RangeInputSlider
        label="Width"
        value={wrapperStyle.size}
        onChange={(value) => handleStylesChange("size", value)}
        min={10}
        max={50}
      />
    </div>
  );
};

export default StylesTab;
