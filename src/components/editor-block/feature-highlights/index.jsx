import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import { produce } from "immer";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeContents } from "@/hooks/useChangeContents";
import { generateId } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "../_components/DraggableList";
import IconPicker from "../_components/IconPicker";

const EditorFeatureHighlights = ({ selectedComponent }) => {
  const { contents, setContents, handleContentChange } =
    useChangeContents(selectedComponent);

  const [editItem, setEditItem] = useState("");

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();

    const newContent = {
      id: newId,
      title: "Kualitas Premium, Hasil Tanpa Kompromi.",
      iconBtn: {
        icon: "FaCheckCircle",
        color: "rgba(126,211,33,1)",
        size: 24,
        position: "left",
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

    const handleSelectIcon = (key, value) => {
      setContents((prevContens) =>
        prevContens.map((content) =>
          content.id === selectedContent.id
            ? {
                ...content,
                iconBtn: {
                  ...content.iconBtn,
                  [key]: value,
                },
              }
            : content
        )
      );

      selectedComponent?.set(
        "customComponent",
        produce(selectedComponent?.get("customComponent"), (draft) => {
          draft.contents = draft.contents.map((content) =>
            content.id === selectedContent.id
              ? {
                  ...content,
                  iconBtn: {
                    ...content.iconBtn,
                    [key]: value,
                  },
                }
              : content
          );
        })
      );
    };

    return (
      <>
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

        <IconPicker
          label="Icon"
          onSelectIcon={(key, value) => handleSelectIcon(key, value)}
          value={selectedContent.iconBtn}
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

export default EditorFeatureHighlights;
