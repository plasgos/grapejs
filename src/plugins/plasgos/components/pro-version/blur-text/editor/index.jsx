import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";
import ColorPicker from "@/plugins/plasgos/components/_components-editor/ColorPicker";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";
import SelectFontFamily from "@/plugins/plasgos/components/_components-editor/SelectFontFamily";
import SelectFontSize from "@/plugins/plasgos/components/_components-editor/SelectFontSize";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";
import SelectTextAligment from "@/plugins/plasgos/components/_components-editor/SelectTextAligment";

const animateByOptions = [
  { value: "words", label: "Words" },
  { value: "letters", label: "Letters" },
];

const directionOptions = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
];

const EditorBlurText = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const {
    text,
    fontFamily,
    fontWeight,
    colorBlurText,
    fontSize,
    textAlign,
    delay,
    animateBy,
    direction,
  } = currentComponent;

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg mb-5">
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
              value={colorBlurText}
              onChange={(value) => {
                handleComponentChange("colorBlurText", value);
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
              label="Delay"
              value={delay}
              onChange={(value) => handleComponentChange("delay", value)}
              min={50}
              max={500}
              unit="ms"
            />

            <SelectOptions
              label="Animate By"
              options={animateByOptions}
              value={animateBy}
              onChange={(value) => handleComponentChange("animateBy", value)}
            />

            <SelectOptions
              label="Direction"
              options={directionOptions}
              value={direction}
              onChange={(value) => handleComponentChange("direction", value)}
            />
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

export default EditorBlurText;
