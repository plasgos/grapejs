import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";

import RichTextEditor from "@/components/rich-text-editor";
import { textShadowOptions } from "@/components/SelectOptions";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";

import TransitionEditor from "@/plugins/plasgos/components/_components-editor/TransitionEditor";
import VideoEditorControl from "../../video/editor/VideoEditorControl";

const EditorVideoText = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <div className="p-3 rounded-lg bg-white flex flex-col gap-y-5">
            <VideoEditorControl
              contents={currentComponent.contents}
              handleComponentChange={handleComponentChange}
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

          <div className="bg-white rounded-lg p-3">
            <RichTextEditor
              label="Content"
              value={currentComponent.contents[0].textBanner}
              onChange={(value) =>
                handleComponentChange(
                  `contents.${currentComponent.contents[0].id}.textBanner`,
                  value
                )
              }
              schemeColor={"textBannerColor"}
              bgColor={currentComponent?.background?.bgColor}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="transition"
      >
        <TransitionEditor
          selectedComponent={selectedComponent}
          label="Video Transition"
          type="animation"
        />

        <TransitionEditor
          selectedComponent={selectedComponent}
          label="Text Transition"
          type="animationText"
        />
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

export default EditorVideoText;
