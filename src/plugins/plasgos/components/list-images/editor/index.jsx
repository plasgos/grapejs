import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";

import { Button } from "@/components/ui/button";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "@/plugins/plasgos/components/_components-editor/DraggableList";
import ImageUploader from "@/plugins/plasgos/components/_components-editor/ImageUploader";
import TargetOptions from "@/plugins/plasgos/components/_components-editor/TargetOptions";
import StylesTab from "./StylesTab";

const EditorListImages = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const [editItem, setEditItem] = useState("");

  useSyncWithUndoRedo(setCurrentComponent);

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();
    const newContent = {
      id: newId,
      image:
        "https://ik.imagekit.io/ez1ffaf6o/default-images/products4.jpg?updatedAt=1747115975342",
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
    };

    const updateContents = (component) => {
      return produce(component, (draft) => {
        draft.contents.push(newContent);
      });
    };

    selectedComponent?.set(
      "customComponent",

      updateContents(selectedComponent?.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => updateContents(prevComponent));

    setEditItem(newId);
  };

  const renderContents = (item) => {
    return (
      <>
        <ImageUploader
          label="Image"
          handleFileUpload={(url) =>
            handleComponentChange(`contents.${item.id}.image`, url)
          }
          image={item.image}
        />

        <TargetOptions
          content={item}
          handleComponentChange={handleComponentChange}
        />
      </>
    );
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <DraggableList
            contents={currentComponent.contents}
            renderContents={(value) => renderContents(value)}
            setCurrentComponent={setCurrentComponent}
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
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
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

export default EditorListImages;
