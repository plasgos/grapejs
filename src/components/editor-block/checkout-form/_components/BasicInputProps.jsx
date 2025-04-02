import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import RangeInputSlider from "../../_components/RangeInputSlider";

const BasicInputProps = ({ item, handleComponentChange }) => {
  return (
    <div className="my-2 flex flex-col gap-y-3">
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={item?.labelField || ""}
          onChange={(e) =>
            handleComponentChange(
              `contents.${item.id}.labelField`,
              e.target.value
            )
          }
        />
      </div>
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
      <div className="flex justify-between items-center my-2">
        <Label>Required</Label>
        <Switch
          checked={item?.isRequired}
          onCheckedChange={(checked) =>
            handleComponentChange(`contents.${item.id}.isRequired`, checked)
          }
        />
      </div>

      {item.type === "date" && (
        <>
          <RangeInputSlider
            asChild
            label="Width"
            value={item?.width}
            onChange={(value) =>
              handleComponentChange(`contents.${item.id}.width`, value)
            }
            min={100}
            max={1200}
          />

          <div className="flex justify-between items-center my-2">
            <Label>Show Time</Label>
            <Switch
              checked={item?.isShowTime}
              onCheckedChange={(checked) =>
                handleComponentChange(`contents.${item.id}.isShowTime`, checked)
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BasicInputProps;
