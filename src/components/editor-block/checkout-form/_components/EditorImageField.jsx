import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const EditorImageField = ({ item, handleContentChange }) => {
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
    </div>
  );
};

export default EditorImageField;
