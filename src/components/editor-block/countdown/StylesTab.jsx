import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../_components/ColorPicker";
import RangeInputSlider from "../_components/RangeInputSlider";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { wrapperStyle } = currentComponent;

  return (
    <div className="flex flex-col gap-y-5  p-3 bg-white rounded-lg">
      <Label>Colours</Label>

      <ColorPicker
        label="Day"
        value={wrapperStyle.daysColor}
        onChange={(color) =>
          handleComponentChange("wrapperStyle.daysColor", color)
        }
      />
      <ColorPicker
        label="Hours"
        value={wrapperStyle.hoursColor}
        onChange={(color) =>
          handleComponentChange("wrapperStyle.hoursColor", color)
        }
      />
      <ColorPicker
        label="Minutes"
        value={wrapperStyle.minutesColor}
        onChange={(color) =>
          handleComponentChange("wrapperStyle.minutesColor", color)
        }
      />
      <ColorPicker
        label="Seconds"
        value={wrapperStyle.secondsColor}
        onChange={(color) =>
          handleComponentChange("wrapperStyle.secondsColor", color)
        }
      />

      <RangeInputSlider
        label="Width"
        value={wrapperStyle.size}
        onChange={(value) => handleComponentChange("wrapperStyle.size", value)}
        min={10}
        max={50}
      />
    </div>
  );
};

export default StylesTab;
