import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import ColorPicker from "../_components/ColorPicker";
import { Label } from "@/components/ui/label";
import RangeInputSlider from "../_components/RangeInputSlider";

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-y-5  p-3 bg-white rounded-lg">
        <Label className="text-lg">Form Style</Label>

        <RangeInputSlider
          label="Width Form"
          value={wrapperStyle.width}
          onChange={(value) => handleStylesChange("width", value)}
          min={320}
          max={1440}
        />

        <RangeInputSlider
          label="Title Size"
          value={wrapperStyle.titleSize}
          onChange={(value) => handleStylesChange("titleSize", value)}
          min={14}
          max={36}
        />

        <ColorPicker
          label="Title Color"
          value={wrapperStyle.titleColor}
          onChange={(color) => handleStylesChange("titleColor", color)}
        />
      </div>

      <div className="flex flex-col gap-y-5  p-3 bg-white rounded-lg">
        <Label className="text-lg">Field Style</Label>

        <RangeInputSlider
          label="Label Size"
          value={wrapperStyle.labelSize}
          onChange={(value) => handleStylesChange("labelSize", value)}
          min={14}
          max={36}
        />

        <ColorPicker
          label="Label Color"
          value={wrapperStyle.labelColor}
          onChange={(color) => handleStylesChange("labelColor", color)}
        />

        <ColorPicker
          label="Border Color"
          value={wrapperStyle.borderColor}
          onChange={(color) => handleStylesChange("borderColor", color)}
        />

        <RangeInputSlider
          label="Input Size"
          value={wrapperStyle.inputSize}
          onChange={(value) => handleStylesChange("inputSize", value)}
          min={14}
          max={25}
        />

        <RangeInputSlider
          label="Rounded"
          value={wrapperStyle.rounded}
          onChange={(value) => handleStylesChange("rounded", value)}
          min={0}
          max={25}
        />

        <ColorPicker
          label="Text Input Color"
          value={wrapperStyle.textInputColor}
          onChange={(color) => handleStylesChange("textInputColor", color)}
        />

        <ColorPicker
          label="Background Input Color"
          value={wrapperStyle.inputColor}
          onChange={(color) => handleStylesChange("inputColor", color)}
        />
      </div>
    </div>
  );
};

export default StylesTab;
