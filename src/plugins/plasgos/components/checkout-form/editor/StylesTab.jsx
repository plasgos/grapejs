import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "@/plugins/plasgos/components/_components-editor/ColorPicker";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";

import { useEffect } from "react";
import { useEditor } from "@grapesjs/react";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";

const StylesTab = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const editor = useEditor();

  const { wrapperStyle } = currentComponent;
  const [globalOptions] = useGlobalOptions(editor);

  useEffect(() => {
    if (wrapperStyle.width > globalOptions?.maxWidthPage) {
      handleComponentChange("wrapperStyle.width", globalOptions?.maxWidthPage);
    }
  }, [handleComponentChange, globalOptions?.maxWidthPage, wrapperStyle.width]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-y-5  p-3 bg-white rounded-lg">
        <Label className="text-lg">Form Style</Label>

        <RangeInputSlider
          label="Width Form"
          value={wrapperStyle.width}
          onChange={(value) =>
            handleComponentChange("wrapperStyle.width", value)
          }
          min={320}
          max={globalOptions?.maxWidthPage}
        />

        <RangeInputSlider
          label="Title Size"
          value={wrapperStyle.titleSize}
          onChange={(value) =>
            handleComponentChange("wrapperStyle.titleSize", value)
          }
          min={14}
          max={36}
        />

        <ColorPicker
          label="Title Color"
          value={wrapperStyle.titleColor}
          onChange={(color) =>
            handleComponentChange("wrapperStyle.titleColor", color)
          }
        />
      </div>

      <div className="flex flex-col gap-y-5  p-3 bg-white rounded-lg">
        <Label className="text-lg">Field Style</Label>

        <RangeInputSlider
          label="Label Size"
          value={wrapperStyle.labelSize}
          onChange={(value) =>
            handleComponentChange("wrapperStyle.labelSize", value)
          }
          min={14}
          max={36}
        />

        <ColorPicker
          label="Label Color"
          value={wrapperStyle.labelColor}
          onChange={(color) =>
            handleComponentChange("wrapperStyle.labelColor", color)
          }
        />

        <ColorPicker
          label="Border Color"
          value={wrapperStyle.borderColor}
          onChange={(color) =>
            handleComponentChange("wrapperStyle.borderColor", color)
          }
        />

        <RangeInputSlider
          label="Input Size"
          value={wrapperStyle.inputSize}
          onChange={(value) =>
            handleComponentChange("wrapperStyle.inputSize", value)
          }
          min={14}
          max={25}
        />

        <RangeInputSlider
          label="Rounded"
          value={wrapperStyle.rounded}
          onChange={(value) =>
            handleComponentChange("wrapperStyle.rounded", value)
          }
          min={0}
          max={25}
        />

        <ColorPicker
          label="Text Input Color"
          value={wrapperStyle.textInputColor}
          onChange={(color) =>
            handleComponentChange("wrapperStyle.textInputColor", color)
          }
        />

        <ColorPicker
          label="Background Input Color"
          value={wrapperStyle.inputColor}
          onChange={(color) =>
            handleComponentChange("wrapperStyle.inputColor", color)
          }
        />
      </div>
    </div>
  );
};

export default StylesTab;
