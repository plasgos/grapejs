import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import BackgroundEditor from "../../_components/BackgroundEditor";
import RangeInputSlider from "../../_components/RangeInputSlider";
import SectionAddScrollTargetId from "../../_components/SectionAddScrollTargetId";
import SelectOptions from "../../_components/SelectOptions";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "../../_components/DraggableList";
import StylesTab from "./StylesTab";

const directionOptions = [
  { value: "up", label: "Up" },
  { value: "down", label: "Down" },
];

const symbolOptions = [
  { value: "+", label: "+" },
  { value: "%", label: "%" },
];

const EditorBusinessOverview = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { duration, direction } = currentComponent.wrapperStyle;

  const [editItem, setEditItem] = useState("");

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();

    const newContent = {
      id: newId,
      overview: `Followers`,
      from: 0,
      rangeValue: 100,
      symbol: "+",
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
          <Label>Range Value</Label>
          <Input
            value={item.rangeValue || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleComponentChange(`contents.${item.id}.rangeValue`, +value);
            }}
            type="number"
          />
        </div>

        <SelectOptions
          label="Symbol"
          options={symbolOptions}
          value={item.symbol}
          onChange={(value) =>
            handleComponentChange(`contents.${item.id}.symbol`, value)
          }
        />

        <div className="space-y-2">
          <Label>Profetion</Label>
          <Textarea
            value={item.overview || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleComponentChange(`contents.${item.id}.overview`, value);
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
        <SectionAddScrollTargetId selectedComponent={selectedComponent} />
        <div className="w-full flex flex-col gap-y-3 bg-white p-3 rounded-lg my-5">
          <div className="flex flex-col gap-y-5">
            <RangeInputSlider
              label="Duration"
              value={duration}
              onChange={(value) =>
                handleComponentChange("wrapperStyle.duration", value)
              }
              min={1}
              max={10}
              unit="s"
            />

            <SelectOptions
              label="Direction"
              options={directionOptions}
              value={direction}
              onChange={(value) =>
                handleComponentChange("wrapperStyle.direction", value)
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-5 py-1">
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

export default EditorBusinessOverview;
