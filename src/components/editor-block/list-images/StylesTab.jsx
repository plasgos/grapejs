import {
  aspectRatioOptions,
  maxColumnOptions,
} from "@/components/SelectOptions";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import SelectOptions from "../_components/SelectOptions";
import RangeInputSlider from "../_components/RangeInputSlider";

export const objectViewOptions = [
  { value: "object-contain", label: "Contain" },
  { value: "object-cover", label: "Cover" },
];

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <div className="flex flex-col gap-y-5 ">
      <div className="p-3 rounded-lg bg-white">
        <div className="flex flex-col gap-y-5">
          <SelectOptions
            label="Column"
            options={maxColumnOptions}
            value={wrapperStyle.column}
            onChange={(value) => {
              handleComponentChange("wrapperStyle.column", value);
            }}
          />

          <SelectOptions
            label="Image Ratio"
            options={aspectRatioOptions}
            value={wrapperStyle.aspectRatio}
            onChange={(value) => {
              handleComponentChange("wrapperStyle.aspectRatio", value);
            }}
          />

          <SelectOptions
            label="Object View"
            options={objectViewOptions}
            value={wrapperStyle.objectView}
            onChange={(value) => {
              handleComponentChange("wrapperStyle.objectView", value);
            }}
          />

          <RangeInputSlider
            label="Gap"
            value={wrapperStyle.gap}
            onChange={(value) =>
              handleComponentChange("wrapperStyle.gap", value)
            }
            min={10}
            max={100}
          />

          {wrapperStyle.objectView === "object-cover" && (
            <RangeInputSlider
              label="Rounded"
              value={wrapperStyle.rounded}
              onChange={(value) =>
                handleComponentChange("wrapperStyle.rounded", value)
              }
              min={0}
              max={50}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StylesTab;
