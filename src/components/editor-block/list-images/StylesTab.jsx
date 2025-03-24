import {
  aspectRatioOptions,
  maxColumnOptions,
} from "@/components/SelectOptions";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import SelectOptions from "../_components/SelectOptions";

const StylesTab = ({ selectedComponent }) => {
  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  return (
    <div className="flex flex-col gap-y-5 ">
      <div className="p-3 rounded-lg bg-white">
        <div className="flex flex-col gap-y-5">
          <SelectOptions
            label="Column"
            options={maxColumnOptions}
            value={wrapperStyle.column}
            onChange={(value) => {
              handleStylesChange("column", value);
            }}
          />

          <SelectOptions
            label="Image Ratio"
            options={aspectRatioOptions}
            value={wrapperStyle.aspectRatio}
            onChange={(value) => {
              handleStylesChange("aspectRatio", value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StylesTab;
