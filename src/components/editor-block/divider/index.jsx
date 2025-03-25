import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";

import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import SelectOptions from "../_components/SelectOptions";
import ColorPicker from "../_components/ColorPicker";
import RangeInputSlider from "../_components/RangeInputSlider";
import IconPicker from "../_components/IconPicker";
import { produce } from "immer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const borderStyleOptions = [
  { value: "solid", label: "Solid" },
  { value: "dotted", label: "Dotted" },
  { value: "dashed", label: "Dashed" },
  { value: "double", label: "Double" },
  { value: "groove", label: "Groove" },
  { value: "ridge", label: "Ridge" },
  { value: "inset", label: "Inset" },
  { value: "outset", label: "Outset" },
];

const EditorDivider = ({ selectedComponent }) => {
  const { wrapperStyle, setWrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  const handleSelectIcon = (key, value) => {
    setWrapperStyle((prevStyles) => ({
      ...prevStyles,
      iconBtn: {
        ...prevStyles.iconBtn,
        [key]: value,
      },
    }));

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.wrapperStyle.iconBtn[key] = value;
      })
    );
  };

  return (
    <TabsEditor withoutStyles withoutTransition withoutBackground>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1 mb-3 ">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />
        </div>

        <div className="w-full bg-white p-3 flex flex-col gap-y-5 rounded-lg">
          <SelectOptions
            label="Divider Style"
            options={borderStyleOptions}
            value={wrapperStyle.variant}
            onChange={(value) => handleStylesChange("variant", value)}
          />

          <ColorPicker
            label="Color"
            value={wrapperStyle.color}
            onChange={(color) => handleStylesChange("color", color)}
          />

          <RangeInputSlider
            label="Height"
            value={wrapperStyle.height}
            onChange={(value) => handleStylesChange("height", value)}
            min={1}
            max={100}
          />

          <div className="flex justify-between items-center">
            <Label className="font-normal">Full Width</Label>
            <Switch
              checked={wrapperStyle.fullWidth}
              onCheckedChange={(checked) =>
                handleStylesChange("fullWidth", checked)
              }
            />
          </div>

          {!wrapperStyle.fullWidth && (
            <RangeInputSlider
              label="Width"
              value={wrapperStyle.width}
              onChange={(value) => handleStylesChange("width", value)}
              min={30}
              max={1440}
            />
          )}

          <IconPicker
            label="Icon"
            onSelectIcon={(key, value) => handleSelectIcon(key, value)}
            value={wrapperStyle.iconBtn}
            withCenterPosition
          />
        </div>
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorDivider;
