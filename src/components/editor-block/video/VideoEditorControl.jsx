import RangeInputSlider from "@/components/editor-block/components/RangeInputSlider";
import SelectOptions from "@/components/editor-block/components/SelectOptions";
import { aspectRatioVideoOptions } from "@/components/SelectOptions";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const videoOptions = [
  { key: "isControls", label: "Hidden Control" },
  { key: "isAutoPlay", label: "Auto Play" },
  { key: "isMuted", label: "Muted" },
  { key: "isLoop", label: "Loop" },
];

const VideoEditorControl = ({ contents, handleContentChange }) => {
  return (
    <>
      <div className="space-y-2 ">
        <Label>Video URL</Label>
        <Input
          value={contents[0].url || ""}
          onChange={(e) => {
            const value = e.target.value;
            handleContentChange(contents[0].id, "url", value);
          }}
        />
      </div>

      <div className="grid grid-cols-2">
        {videoOptions.map((opt) => (
          <div key={opt.label} className="flex items-center space-x-2 my-3">
            <Checkbox
              checked={contents[0][opt.key]}
              onCheckedChange={(checked) =>
                handleContentChange(contents[0].id, opt.key, checked)
              }
              id={opt.key}
            />
            <label
              htmlFor={opt.key}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {opt.label}
            </label>
          </div>
        ))}
      </div>

      <SelectOptions
        label="Video Ratio"
        options={aspectRatioVideoOptions}
        value={contents[0].ratio}
        onChange={(value) =>
          handleContentChange(contents[0].id, "ratio", value)
        }
      />

      <RangeInputSlider
        label="Width"
        value={contents[0].width}
        onChange={(value) =>
          handleContentChange(contents[0].id, "width", value)
        }
        min={100}
        max={1200}
      />

      <RangeInputSlider
        label="Rotation"
        value={contents[0].rotation}
        onChange={(value) =>
          handleContentChange(contents[0].id, "rotation", value)
        }
        min={-90}
        max={90}
      />
    </>
  );
};

export default VideoEditorControl;
