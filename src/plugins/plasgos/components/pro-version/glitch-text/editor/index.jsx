import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";
import ColorPicker from "@/plugins/plasgos/components/_components-editor/ColorPicker";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";
import SelectFontFamily from "@/plugins/plasgos/components/_components-editor/SelectFontFamily";
import SelectTextAligment from "@/plugins/plasgos/components/_components-editor/SelectTextAligment";

const EditorGlitchText = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const {
    text,
    fontFamily,
    fontWeight,
    colorGlitchText,
    fontSize,
    textAlign,
    enableShadows,
    enableOnHover,
    speed,
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
              value={colorGlitchText}
              onChange={(value) => {
                handleComponentChange("colorGlitchText", value);
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
              label="Refresh Delay"
              value={speed}
              onChange={(value) => handleComponentChange("speed", value)}
              min={0}
              max={5}
              step={0.1}
            />

            <div className="flex justify-between items-center ">
              <Label className="font-normal">Glitch Shadow</Label>
              <Switch
                checked={enableShadows}
                onCheckedChange={(checked) =>
                  handleComponentChange("enableShadows", checked)
                }
              />
            </div>

            <div className="flex justify-between items-center ">
              <Label className="font-normal">Enable On Hover</Label>
              <Switch
                checked={enableOnHover}
                onCheckedChange={(checked) =>
                  handleComponentChange("enableOnHover", checked)
                }
              />
            </div>
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

export default EditorGlitchText;
