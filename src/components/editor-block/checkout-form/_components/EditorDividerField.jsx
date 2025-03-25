import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SelectOptions from "../../_components/SelectOptions";
import { borderStyleOptions } from "../../divider";
import ColorPicker from "../../_components/ColorPicker";

const EditorDividerField = ({ item, handleContentChange }) => {
  return (
    <div className="my-2 flex flex-col gap-y-3">
      <SelectOptions
        label="Divider Style"
        options={borderStyleOptions}
        value={item.variant}
        onChange={(value) => handleContentChange(item.id, "variant", value)}
      />

      <ColorPicker
        label="Color"
        value={item.color}
        onChange={(color) => handleContentChange(item.id, "color", color)}
      />

      <RangeInputSlider
        label="Height"
        value={item.height}
        onChange={(value) => handleContentChange(item.id, "height", value)}
        min={1}
        max={100}
      />

      <div className="flex justify-between items-center">
        <Label className="font-normal">Full Width</Label>
        <Switch
          checked={item.fullWidth}
          onCheckedChange={(checked) =>
            handleContentChange(item.id, "fullWidth", checked)
          }
        />
      </div>

      {!item.fullWidth && (
        <RangeInputSlider
          label="Width"
          value={item.width}
          onChange={(value) => handleContentChange(item.id, "width", value)}
          min={30}
          max={1440}
        />
      )}
    </div>
  );
};

export default EditorDividerField;
