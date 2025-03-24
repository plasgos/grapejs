import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";
import products4 from "@/assets/products4.jpg";

import { Button } from "@/components/ui/button";
import { useChangeContents } from "@/hooks/useChangeContents";
import { generateId } from "@/lib/utils";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "../_components/DraggableList";
import ImageUploader from "../_components/ImageUploader";
import TargetOptions from "../_components/TargetOptions";
import StylesTab from "./StylesTab";

const EditorListImages = ({ selectedComponent }) => {
  const { contents, setContents, handleContentChange } =
    useChangeContents(selectedComponent);

  const [editItem, setEditItem] = useState("");

  const handleFileUpload = (id) => {
    onChangeFileUpload(id, handleContentChange);
  };

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();
    const newContent = {
      id: newId,
      image: products4,
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
      isFocused: false,
    };

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents.push(newContent);
      })
    );

    setContents((content) => [...content, newContent]);

    setEditItem(newId);
  };

  const renderContents = (item) => {
    const selectedContent = contents.find((content) => content.id === item.id);

    return (
      <>
        <ImageUploader
          label="Image"
          handleFileUpload={() => handleFileUpload(item.id)}
          image={selectedContent.image}
        />

        <TargetOptions
          content={item}
          handleContentChange={handleContentChange}
        />
      </>
    );
  };

  return (
    <TabsEditor withoutTransition>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <DraggableList
            contents={contents}
            renderContents={(value) => renderContents(value)}
            setContents={setContents}
            editItem={editItem}
            selectedComponent={selectedComponent}
            setEditItem={setEditItem}
          >
            <Button
              onClick={handleAddContent}
              variant="outline"
              className="my-3 w-full"
            >
              Add Content <Plus />
            </Button>
          </DraggableList>
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
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

export default EditorListImages;
