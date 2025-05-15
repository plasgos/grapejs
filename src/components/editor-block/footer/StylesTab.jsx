import RichTextEditor from "@/components/rich-text-editor";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../_components/ColorPicker";
import RangeInputSlider from "../_components/RangeInputSlider";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { copyright, wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="bg-white rounded-lg p-3 flex flex-col gap-y-5 ">
        <ColorPicker
          label="Heading Color"
          value={wrapperStyle.headingColor}
          onChange={(color) =>
            handleComponentChange("wrapperStyle.headingColor", color)
          }
        />

        <ColorPicker
          label="Subheading Color"
          value={wrapperStyle.subHeadingColor}
          onChange={(color) =>
            handleComponentChange("wrapperStyle.subHeadingColor", color)
          }
        />

        <RangeInputSlider
          label="Font Size"
          value={wrapperStyle.headingFontSize}
          onChange={(value) =>
            handleComponentChange("wrapperStyle.headingFontSize", value)
          }
          min={14}
          max={56}
        />
      </div>

      <div className="bg-white rounded-lg p-3">
        <RichTextEditor
          label="Copyright"
          value={copyright.text}
          onChange={(value) => handleComponentChange("copyright.text", value)}
        />
      </div>
    </div>
  );
};

export default StylesTab;
