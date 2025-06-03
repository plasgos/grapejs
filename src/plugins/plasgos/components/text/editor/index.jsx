import { TabsContent } from "@/components/ui/tabs";

import RichTextEditor from "@/components/rich-text-editor";
import { textShadowOptions } from "@/components/SelectOptions";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";

const EditorText = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);
  const { contents } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <div className="bg-white rounded-lg p-3">
            <RichTextEditor
              label="Content"
              value={currentComponent?.contents[0].text}
              onChange={(value) => {
                handleComponentChange(`contents.${contents[0].id}.text`, value);
              }}
              schemeColor={"textColor"}
              bgColor={currentComponent?.background?.bgColor}
            />
          </div>

          <SelectOptions
            label="Text Shadow"
            options={textShadowOptions}
            value={currentComponent.contents[0].textShadow}
            onChange={(value) =>
              handleComponentChange(
                `contents.${currentComponent.contents[0].id}.textShadow`,
                value
              )
            }
          />
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

export default EditorText;
