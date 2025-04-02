import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditorTextTitle = ({ item, handleComponentChange }) => {
  return (
    <div className="space-y-2">
      <Label>Title</Label>
      <Input
        value={item?.value || ""}
        onChange={(e) =>
          handleComponentChange(`contents.${item.id}.value`, e.target.value)
        }
      />
    </div>
  );
};

export default EditorTextTitle;
