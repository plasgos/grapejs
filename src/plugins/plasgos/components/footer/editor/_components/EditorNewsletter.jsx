import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";

import IconPicker from "@/plugins/plasgos/components/_components-editor/IconPicker";
import ColorPicker from "@/plugins/plasgos/components/_components-editor/ColorPicker";

const EditorNewsletter = ({ item, handleComponentChange }) => {
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
      <div className="space-y-2">
        <Label>Sub Title</Label>
        <Input
          value={item?.subTitle || ""}
          onChange={(e) =>
            handleComponentChange(
              `contents.${item.id}.subTitle`,
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

      <RangeInputSlider
        label="Width"
        value={item.width}
        onChange={(value) =>
          handleComponentChange(`contents.${item.id}.width`, value)
        }
        min={80}
        max={600}
      />

      <div className="space-y-2">
        <Label>Placeholder</Label>
        <Input
          value={item?.placeholder || ""}
          onChange={(e) =>
            handleComponentChange(
              `contents.${item.id}.placeholder`,
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Button Text</Label>
        <Input
          value={item?.actionText || ""}
          onChange={(e) =>
            handleComponentChange(
              `contents.${item.id}.actionText`,
              e.target.value
            )
          }
        />
      </div>

      <ColorPicker
        label="Background"
        value={item.buttonColor}
        onChange={(color) =>
          handleComponentChange(`contents.${item.id}.buttonColor`, color)
        }
      />

      <ColorPicker
        label="Text Color"
        value={item.textButton}
        onChange={(color) =>
          handleComponentChange(`contents.${item.id}.textButton`, color)
        }
      />
    </div>
  );
};

export default EditorNewsletter;
