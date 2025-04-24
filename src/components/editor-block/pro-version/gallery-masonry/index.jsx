import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import BackgroundEditor from "../../_components/BackgroundEditor";
import DraggableList from "../../_components/DraggableList";
import ImageUploader from "../../_components/ImageUploader";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SectionAddScrollTargetId from "../../_components/SectionAddScrollTargetId";

const EditorGalleryMasonry = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents } = currentComponent;

  const [editItem, setEditItem] = useState("");

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();
    function getRandomImageUrl() {
      const randomId = Math.floor(Math.random() * 1000); // ID antara 0-999
      return `https://picsum.photos/id/${randomId}/200/300`;
    }

    const newContent = {
      id: newId,
      image: getRandomImageUrl(),
      height: 400,
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
        <div className="space-y-2">
          <ImageUploader
            label="Image"
            handleFileUpload={(url) =>
              handleComponentChange(`contents.${item.id}.image`, url)
            }
            image={item.image}
          />

          <RangeInputSlider
            label="Height"
            value={item.height}
            onChange={(value) =>
              handleComponentChange(`contents.${item.id}.height`, value)
            }
            min={100}
            max={1000}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg">
          <div className="flex flex-col gap-y-5">
            <SectionAddScrollTargetId selectedComponent={selectedComponent} />

            <DraggableList
              contents={contents}
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
                Add Image <Plus />
              </Button>
            </DraggableList>
          </div>
        </div>
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

export default EditorGalleryMasonry;
