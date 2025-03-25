import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SelectOptions from "../../_components/SelectOptions";
import { Switch } from "@/components/ui/switch";

const designOptions = [
  { value: "stars", label: "Stars" },
  { value: "hearts", label: "Hearts" },
];

const EditorRating = ({ item, handleContentChange }) => {
  return (
    <div className="my-2 flex flex-col gap-y-3">
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={item?.labelField || ""}
          onChange={(e) =>
            handleContentChange(item.id, "labelField", e.target.value)
          }
        />
      </div>

      <div className="flex justify-between items-center my-2">
        <Label>Required</Label>
        <Switch
          checked={item?.isRequired}
          onCheckedChange={(checked) =>
            handleContentChange(item.id, "isRequired", checked)
          }
        />
      </div>

      <SelectOptions
        asChild
        label="Icon Rating"
        options={designOptions}
        value={item?.design}
        onChange={(value) => handleContentChange(item.id, "design", value)}
      />

      <RangeInputSlider
        asChild
        label="Width"
        value={item?.ratingSize}
        onChange={(value) => handleContentChange(item.id, "ratingSize", value)}
        min={18}
        max={100}
      />
    </div>
  );
};

export default EditorRating;
