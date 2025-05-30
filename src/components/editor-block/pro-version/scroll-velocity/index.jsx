import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import BackgroundEditor from "../../_components/BackgroundEditor";
import ColorPicker from "../../_components/ColorPicker";
import DraggableList from "../../_components/DraggableList";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SectionAddScrollTargetId from "../../_components/SectionAddScrollTargetId";
import SelectFontFamily from "../../_components/SelectFontFamily";

const EditorScrollVelocity = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { fontFamily, fontWeight, colorVelocity, fontSize, velocity } =
    currentComponent;

  const [editItem, setEditItem] = useState("");

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();

    const newContent = {
      id: newId,
      title: "New Scroll Down",
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
          <Label>Title</Label>
          <Input
            value={item.title}
            onChange={(e) => {
              const value = e.target.value;
              handleComponentChange(`contents.${item.id}.title`, value);
            }}
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
              contents={currentComponent.contents}
              renderContents={(value) => renderContents(value)}
              setCurrentComponent={setCurrentComponent}
              editItem={editItem}
              selectedComponent={selectedComponent}
              setEditItem={setEditItem}
              withoutFocusItem
            >
              <Button
                onClick={handleAddContent}
                variant="outline"
                className="my-3 w-full"
              >
                Add Content <Plus />
              </Button>
            </DraggableList>

            <ColorPicker
              asChild
              label="Color"
              value={colorVelocity}
              onChange={(value) => {
                handleComponentChange("colorVelocity", value);
              }}
            />

            <SelectFontFamily
              asChild
              label="Font Family"
              fontFamily={fontFamily}
              fontWeight={fontWeight}
              onChangefontFamily={(value) => {
                handleComponentChange("fontFamily", value);
              }}
              onChangefontWeight={(value) => {
                handleComponentChange("fontWeight", value);
              }}
            />

            <RangeInputSlider
              label="Font Size"
              value={fontSize}
              onChange={(value) => handleComponentChange("fontSize", value)}
              min={14}
              max={150}
            />

            <RangeInputSlider
              label="Velocity"
              value={velocity}
              onChange={(value) => handleComponentChange("velocity", value)}
              min={10}
              max={500}
              unit=""
            />
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

export default EditorScrollVelocity;
