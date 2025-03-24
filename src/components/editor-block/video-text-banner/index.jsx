import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";

import { useChangeContents } from "@/hooks/useChangeContents";
import VideoEditorControl from "@/components/editor-block/video/VideoEditorControl";
import TransiitonEditor from "../_components/TransiitonEditor";
import TextEditor from "../_components/TextEditor";
import SelectOptions from "../_components/SelectOptions";
import { textShadowOptions } from "@/components/SelectOptions";

const EditorVideoText = ({ selectedComponent }) => {
  const { contents, handleContentChange } =
    useChangeContents(selectedComponent);

  return (
    <TabsEditor withoutStyles>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
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

          <SelectOptions
            label="Text Shadow"
            options={textShadowOptions}
            value={contents[0].textShadow}
            onChange={(value) =>
              handleContentChange(contents[0].id, "textShadow", value)
            }
          />

          <TextEditor
            label="Content"
            value={contents[0].textBanner}
            onChange={(value) =>
              handleContentChange(contents[0].id, "textBanner", value)
            }
          />
        </div>
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransiitonEditor
          selectedComponent={selectedComponent}
          label="Video Transition"
          type="animation"
        />

        <TransiitonEditor
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
    </TabsEditor>
  );
};

export default EditorVideoText;
