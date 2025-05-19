import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";

import RichTextEditor from "@/components/rich-text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ColorPicker from "../_components/ColorPicker";
import TransitionEditor from "../_components/TransitionEditor";

const EditorQuote = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents } = currentComponent;
  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <SectionAddScrollTargetId selectedComponent={selectedComponent} />
        <div className="flex flex-col gap-y-5  p-3 bg-white rounded-lg my-5">
          <RichTextEditor
            label="Content"
            value={contents[0].quoteText}
            onChange={(value) =>
              handleComponentChange(
                `contents.${contents[0].id}.quoteText`,
                value
              )
            }
            schemeColor={"quoteTextColor"}
          />

          <div className="space-y-2 ">
            <Label>Writer</Label>
            <Input
              value={contents[0].writer}
              onChange={(e) =>
                handleComponentChange(
                  `contents.${contents[0].id}.writer`,
                  e.target.value
                )
              }
            />
          </div>

          <ColorPicker
            label="Writer Color"
            value={contents[0].writerColor}
            onChange={(color) =>
              handleComponentChange(
                `contents.${contents[0].id}.writerColor`,
                color
              )
            }
          />
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="transition"
      >
        <TransitionEditor selectedComponent={selectedComponent} />
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

export default EditorQuote;
