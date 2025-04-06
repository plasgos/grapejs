import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RangeInputSlider from "../../_components/RangeInputSlider";

import IconPicker from "../../_components/IconPicker";
import TextEditor from "../../_components/TextEditor";

const EditorTextFooter = ({ item, handleComponentChange }) => {
  const handleSelectIcon = (key, value) => {
    handleComponentChange(`contents.${item.id}.iconHeading.${key}`, value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={item?.title || ""}
          onChange={(e) =>
            handleComponentChange(`contents.${item.id}.title`, e.target.value)
          }
        />
      </div>

      <IconPicker
        label="Icon"
        value={item.iconHeading}
        onSelectIcon={(key, value) => handleSelectIcon(key, value)}
      />

      <RangeInputSlider
        label="Width"
        value={item.width}
        onChange={(value) =>
          handleComponentChange(`contents.${item.id}.width`, value)
        }
        min={80}
        max={600}
      />

      <TextEditor
        label="Text"
        value={item.text}
        onChange={(value) => {
          handleComponentChange(`contents.${item.id}.text`, value);
        }}
      />
    </div>
  );
};

export default EditorTextFooter;
