import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditorTextTitle = ({ item, handleContentChange }) => {
  return (
    <div className="space-y-2">
      <Label>Title</Label>
      <Input
        value={item?.value || ""}
        onChange={(e) => handleContentChange(item.id, "value", e.target.value)}
      />
    </div>
  );
};

export default EditorTextTitle;
