import { TabsContent } from "@/components/ui/tabs";
import { produce } from "immer";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import products4 from "@/assets/products4.jpg";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { generateId } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "../_components/DraggableList";
import ImageUploader from "../_components/ImageUploader";
import TargetOptions from "../_components/TargetOptions";

const EditorContentShowcase = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);
  console.log(
    "🚀 ~ EditorContentShowcase ~ currentComponent:",
    currentComponent?.contents[0].description
  );

  useSyncWithUndoRedo(setCurrentComponent);

  const [editItem, setEditItem] = useState("");

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();

    const newContent = {
      id: newId,
      title: "Strategi Efektif Meningkatkan Penjualan Produk",
      description:
        "Temukan strategi terbaik untuk meningkatkan penjualan produk Anda, mulai dari optimasi pemasaran digital hingga membangun hubungan yang kuat dengan pelanggan.",
      image: products4,
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

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={item.title}
            onChange={(e) => {
              const value = e.target.value;
              handleComponentChange(`contents.${item.id}.title`, value);
            }}
          />
        </div>

        <RichTextEditor
          label="Description"
          value={item.description}
          onChange={(value) => {
            handleComponentChange(`contents.${item.id}.description`, value);
          }}
        />
      </>
    );
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
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
    </>
  );
};

export default EditorContentShowcase;
