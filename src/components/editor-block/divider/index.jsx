import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import SectionAddScrollTargetId from "../components/SectionAddScrollTargetId";

import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import SelectOptions from "../components/SelectOptions";
import ColorPicker from "../components/ColorPicker";
import RangeInputSlider from "../components/RangeInputSlider";
import IconPicker from "../components/IconPicker";
import { produce } from "immer";

const borderStyleOptions = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
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
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
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

          {wrapperStyle.variant === "double" && (
            <ColorPicker
              label="Color Double"
              value={wrapperStyle.color2}
              onChange={(color) => handleStylesChange("color2", color)}
            />
          )}

          <RangeInputSlider
            label="Height"
            value={wrapperStyle.height}
            onChange={(value) => handleStylesChange("height", value)}
            min={1}
            max={100}
          />

          <RangeInputSlider
            label="Width"
            value={wrapperStyle.width}
            onChange={(value) => handleStylesChange("width", value)}
            min={1}
            max={100}
          />

          {wrapperStyle.variant === "double" && (
            <>
              <RangeInputSlider
                label="Height 2"
                value={wrapperStyle.height2}
                onChange={(value) => handleStylesChange("height2", value)}
                min={1}
                max={100}
              />

              <RangeInputSlider
                label="Width 2"
                value={wrapperStyle.width2}
                onChange={(value) => handleStylesChange("width2", value)}
                min={1}
                max={100}
              />

              <RangeInputSlider
                label="Gap"
                value={wrapperStyle.gap}
                onChange={(value) => handleStylesChange("gap", value)}
                min={0}
                max={100}
              />
            </>
          )}

          <IconPicker
            label="Icon"
            onSelectIcon={(key, value) => handleSelectIcon(key, value)}
            value={wrapperStyle.iconBtn}
            withoutIconSize
            withCenterPosition
          />
        </div>
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorDivider;
