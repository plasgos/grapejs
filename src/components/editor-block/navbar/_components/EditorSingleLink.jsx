import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import IconPicker from "../../_components/IconPicker";
import TargetOptions from "../../_components/TargetOptions";

const EditorSingleLink = ({ item, handleComponentChange }) => {
  // Ref untuk setiap item

  const handleSelectIcon = (key, value) => {
    handleComponentChange(`contents.${item.id}.iconHeading.${key}`, value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={item?.titleHeading || ""}
          onChange={(e) =>
            handleComponentChange(
              `contents.${item.id}.titleHeading`,
              e.target.value
            )
          }
        />
      </div>

      <IconPicker
        label="Icon"
        value={item.iconHeading}
        onSelectIcon={(key, value) => handleSelectIcon(key, value)}
      />

      <TargetOptions
        content={item}
        handleComponentChange={handleComponentChange}
      />
    </div>
  );
};

export default EditorSingleLink;
