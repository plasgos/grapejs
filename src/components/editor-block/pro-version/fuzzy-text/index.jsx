import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import BackgroundEditor from "../../_components/BackgroundEditor";
import ColorPicker from "../../_components/ColorPicker";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SectionAddScrollTargetId from "../../_components/SectionAddScrollTargetId";
import SelectFontFamily from "../../_components/SelectFontFamily";
import SelectTextAligment from "../../_components/SelectTextAligment";

const EditorFuzzyText = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const {
    text,
    fontFamily,
    fontWeight,
    colorFuzzyText,
    fontSize,
    textAlign,
    enableHover,
    hoverIntensity,
    baseIntensity,
  } = currentComponent;

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
          <div className="flex flex-col gap-y-5">
            <SectionAddScrollTargetId selectedComponent={selectedComponent} />

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={text}
                onChange={(e) => {
                  const value = e.target.value;
                  handleComponentChange(`text`, value);
                }}
              />
            </div>
            <ColorPicker
              asChild
              label="Color"
              value={colorFuzzyText}
              onChange={(value) => {
                handleComponentChange("colorFuzzyText", value);
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

            <RangeInputSlider
              label="Font Size"
              value={fontSize}
              onChange={(value) => handleComponentChange("fontSize", value)}
              min={14}
              max={150}
            />

            <SelectTextAligment
              value={textAlign}
              onChange={(value) => handleComponentChange("textAlign", value)}
              isFlex
            />

            <RangeInputSlider
              label="Base Intensity"
              value={baseIntensity}
              onChange={(value) =>
                handleComponentChange("baseIntensity", value)
              }
              min={0}
              max={1}
              step={0.01}
            />

            <div className="flex justify-between items-center ">
              <Label className="font-normal">Enable Hover</Label>
              <Switch
                checked={enableHover}
                onCheckedChange={(checked) =>
                  handleComponentChange("enableHover", checked)
                }
              />
            </div>

            {enableHover && (
              <RangeInputSlider
                label="Hover Intensity"
                value={hoverIntensity}
                onChange={(value) =>
                  handleComponentChange("hoverIntensity", value)
                }
                min={0}
                max={2}
                step={0.01}
              />
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </>
  );
};

export default EditorFuzzyText;
