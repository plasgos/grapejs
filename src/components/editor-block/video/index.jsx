import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../components/BackgroundEditor";
import SectionAddScrollTargetId from "../components/SectionAddScrollTargetId";

import { useChangeContents } from "@/hooks/useChangeContents";
import VideoEditorControl from "@/components/editor-block/video/VideoEditorControl";
import TransiitonEditor from "../components/TransiitonEditor";

const EditorVideo = ({ selectedComponent }) => {
  const { contents, handleContentChange } =
    useChangeContents(selectedComponent);

  return (
    <TabsEditor withoutStyles>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <div className="p-3 rounded-lg bg-white flex flex-col gap-y-5">
            <VideoEditorControl
              contents={contents}
              handleContentChange={handleContentChange}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransiitonEditor selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorVideo;
