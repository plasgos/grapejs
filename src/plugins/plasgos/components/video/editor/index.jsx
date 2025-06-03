import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import TransitionEditor from "@/plugins/plasgos/components/_components-editor/TransitionEditor";
import VideoEditorControl from "./VideoEditorControl";

const EditorVideo = ({ selectedComponent }) => {
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
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="transition"
      >
        <TransitionEditor selectedComponent={selectedComponent} />
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

export default EditorVideo;
