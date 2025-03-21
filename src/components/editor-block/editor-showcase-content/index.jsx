import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import { produce } from "immer";
import BackgroundEditor from "../components/BackgroundEditor";
import SectionAddScrollTargetId from "../components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import products4 from "@/assets/products4.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateId } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "../components/DraggableList";
import ImageUploader from "../components/ImageUploader";
import TargetOptions from "../components/TargetOptions";
import TextEditor from "../components/TextEditor";
import { useChangeContents } from "@/hooks/useChangeContents";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";

const EditorContentShowcase = ({ selectedComponent }) => {
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

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={selectedContent.title || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleContentChange(item.id, "title", value);
            }}
          />
        </div>

        <TextEditor
          label="Description"
          value={selectedContent.description}
          onChange={(value) => {
            handleContentChange(item.id, "description", value);
          }}
        />
      </>
    );
  };

  return (
    <TabsEditor withoutTransition>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
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
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
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

export default EditorContentShowcase;
