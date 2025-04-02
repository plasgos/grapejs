import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "../../_components/ColorPicker";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SelectOptions from "../../_components/SelectOptions";
import { borderStyleOptions } from "../../divider";

const EditorDividerField = ({ item, handleComponentChange }) => {
  return (
    <div className="my-2 flex flex-col gap-y-3">
      <SelectOptions
        label="Divider Style"
        options={borderStyleOptions}
        value={item.variant}
        onChange={(value) =>
          handleComponentChange(`contents.${item.id}.variant`, value)
        }
      />

      <ColorPicker
        label="Color"
        value={item.color}
        onChange={(color) =>
          handleComponentChange(`contents.${item.id}.color`, color)
        }
      />

      <RangeInputSlider
        label="Height"
        value={item.height}
        onChange={(value) =>
          handleComponentChange(`contents.${item.id}.height`, value)
        }
        min={1}
        max={100}
      />

      <div className="flex justify-between items-center">
        <Label className="font-normal">Full Width</Label>
        <Switch
          checked={item.fullWidth}
          onCheckedChange={(checked) =>
            handleComponentChange(`contents.${item.id}.fullWidth`, checked)
          }
        />
      </div>

      {!item.fullWidth && (
        <RangeInputSlider
          label="Width"
          value={item.width}
          onChange={(value) =>
            handleComponentChange(`contents.${item.id}.width`, value)
          }
          min={30}
          max={1440}
        />
      )}
    </div>
  );
};

export default EditorDividerField;
