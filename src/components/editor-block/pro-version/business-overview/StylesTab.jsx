import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../../_components/ColorPicker";
import SelectFontFamily from "../../_components/SelectFontFamily";
import SelectFontSize from "../../_components/SelectFontSize";
import SelectTextAligment from "../../_components/SelectTextAligment";
import SelectOptions from "../../_components/SelectOptions";
import { textShadowOptions } from "@/components/SelectOptions";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);
  return (
    <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg ">
      <ColorPicker
        asChild
        label="Color"
        value={wrapperStyle.color}
        onChange={(value) => {
          handleComponentChange("wrapperStyle.color", value);
        }}
      />

      <SelectFontFamily
        asChild
        label="Font Family"
        fontFamily={wrapperStyle.fontFamily}
        fontWeight={wrapperStyle.fontWeight}
        onChangefontFamily={(value) => {
          handleComponentChange("wrapperStyle.fontFamily", value);
        }}
        onChangefontWeight={(value) => {
          handleComponentChange("wrapperStyle.fontWeight", value);
        }}
      />

      <SelectFontSize
        asChild
        label="Font Size"
        value={wrapperStyle.fontSize}
        onChange={(value) => {
          handleComponentChange("wrapperStyle.fontSize", value);
        }}
      />

      <SelectTextAligment
        value={wrapperStyle.textAligment}
        onChange={(value) =>
          handleComponentChange("wrapperStyle.textAligment", value)
        }
        isFlex
      />

      <SelectOptions
        label="Text Shadow"
        options={textShadowOptions}
        value={wrapperStyle.textShadow}
        onChange={(value) =>
          handleComponentChange(`wrapperStyle.textShadow`, value)
        }
      />
    </div>
  );
};

export default StylesTab;
