import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";

import VideoEditorControl from "@/components/editor-block/video/VideoEditorControl";
import RichTextEditor from "@/components/rich-text-editor";
import { textShadowOptions } from "@/components/SelectOptions";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import SelectOptions from "../_components/SelectOptions";
import TransitionEditor from "../_components/TransitionEditor";

const EditorVideoText = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
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
          />
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
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
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </>
  );
};

export default EditorVideoText;
