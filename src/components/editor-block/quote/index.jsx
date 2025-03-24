import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";

import { useChangeContents } from "@/hooks/useChangeContents";
import TextEditor from "../_components/TextEditor";
import TransiitonEditor from "../_components/TransiitonEditor";

const EditorQuote = ({ selectedComponent }) => {
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

          <TextEditor
            label="Content"
            value={contents[0].quoteText}
            onChange={(value) =>
              handleContentChange(contents[0].id, "quoteText", value)
            }
          />
        </div>
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransiitonEditor selectedComponent={selectedComponent} />
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

export default EditorQuote;
