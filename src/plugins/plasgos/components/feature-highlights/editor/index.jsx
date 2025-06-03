import { TabsContent } from "@/components/ui/tabs";
import { produce } from "immer";
import BackgroundEditor from "@/plugins/plasgos/components/_components-editor/background";
import SectionAddScrollTargetId from "@/plugins/plasgos/components/_components-editor/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { generateId } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "@/plugins/plasgos/components/_components-editor/DraggableList";
import IconPicker from "@/plugins/plasgos/components/_components-editor/IconPicker";
import TransitionEditor from "@/plugins/plasgos/components/_components-editor/TransitionEditor";

const EditorFeatureHighlights = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents } = currentComponent;

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
    };

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents.push(newContent);
      })
    );

    setCurrentComponent((prevComponent) =>
      produce(prevComponent, (draft) => {
        draft.contents = [...draft.contents, newContent];
      })
    );

    setEditItem(newId);
  };

  const renderContents = (item) => {
    const handleSelectIcon = (key, value) => {
      handleComponentChange(`contents.${item.id}.iconBtn.${key}`, value);
    };

    return (
      <>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={item.title || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleComponentChange(`contents.${item.id}.title`, value);
            }}
          />
        </div>

        <IconPicker
          label="Icon"
          onSelectIcon={(key, value) => handleSelectIcon(key, value)}
          value={item.iconBtn}
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
        value="transition"
      >
        <TransitionEditor
          selectedComponent={selectedComponent}
          label="Video Transition"
          type="animation"
        />
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

export default EditorFeatureHighlights;
