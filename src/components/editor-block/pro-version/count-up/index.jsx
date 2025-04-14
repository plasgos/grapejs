import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../../_components/ColorPicker";
import SelectFontFamily from "../../_components/SelectFontFamily";
import SelectFontSize from "../../_components/SelectFontSize";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectTextAligment from "../../_components/SelectTextAligment";
import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import SectionAddScrollTargetId from "../../_components/SectionAddScrollTargetId";
import BackgroundEditor from "../../_components/BackgroundEditor";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SelectOptions from "../../_components/SelectOptions";

import TextEditor from "../../_components/TextEditor";
import { textShadowOptions } from "@/components/SelectOptions";

const directionOptions = [
  { value: "up", label: "Up" },
  { value: "down", label: "Down" },
];

const EditorCountUp = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const {
    text,
    textShadow,
    fontFamily,
    fontWeight,
    color,
    fontSize,
    textAlign,
    duration,
    to,
    direction,
  } = currentComponent;

  return (
    <TabsEditor withoutStyles withoutTransition>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg mb-5">
          <div className="flex flex-col gap-y-5">
            <SectionAddScrollTargetId selectedComponent={selectedComponent} />

            <div className="space-y-2">
              <Label>To Value</Label>
              <Input
                value={to || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleComponentChange(`to`, +value);
                }}
                type="number"
              />
            </div>

            <ColorPicker
              asChild
              label="Color"
              value={color}
              onChange={(value) => {
                handleComponentChange("color", value);
              }}
            />

            <SelectFontFamily
              asChild
              label="Font Family"
              fontFamily={fontFamily}
              fontWeight={fontWeight}
              onChangefontFamily={(value) => {
                handleComponentChange("fontFamily", value);
              }}
              onChangefontWeight={(value) => {
                handleComponentChange("fontWeight", value);
              }}
            />

            <SelectFontSize
              asChild
              label="Font Size"
              value={fontSize}
              onChange={(value) => {
                handleComponentChange("fontSize", value);
              }}
            />

            <SelectTextAligment
              value={textAlign}
              onChange={(value) => handleComponentChange("textAlign", value)}
              isFlex
            />

            <RangeInputSlider
              label="Duration"
              value={duration}
              onChange={(value) => handleComponentChange("duration", value)}
              min={1}
              max={10}
              unit="s"
            />

            <SelectOptions
              label="Direction"
              options={directionOptions}
              value={direction}
              onChange={(value) => handleComponentChange("direction", value)}
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg mb-5">
          <TextEditor
            label="Description"
            value={text}
            onChange={(value) => {
              handleComponentChange(`text`, value);
            }}
          />
          <SelectOptions
            label="Text Shadow"
            options={textShadowOptions}
            value={textShadow}
            onChange={(value) => handleComponentChange(`textShadow`, value)}
          />
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorCountUp;
