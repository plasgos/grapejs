import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import TransitionEditor from "@/plugins/plasgos/components/_components-editor/TransitionEditor";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import ButtonStylesEditor from "@/plugins/plasgos/components/_components-editor/ButtonStylesEditor";
import DraggableList from "@/plugins/plasgos/components/_components-editor/DraggableList";
import IconPicker from "@/plugins/plasgos/components/_components-editor/IconPicker";
import RangeInputSlider from "@/plugins/plasgos/components/_components-editor/RangeInputSlider";
import SelectOptions from "@/plugins/plasgos/components/_components-editor/SelectOptions";
import TargetOptions from "@/plugins/plasgos/components/_components-editor/TargetOptions";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import SelectCircle from "../../_components-editor/SelectCircle";

export const spaceOptions = [
  { value: 5, label: "Very Close" },
  { value: 10, label: "Close" },
  { value: 20, label: "Moderate" },
  { value: 40, label: "Far" },
  { value: 60, label: "Very Far" },
];

const sideOptions = [
  { value: "left", label: "Left", icon: <FaRegArrowAltCircleLeft /> },
  { value: "right", label: "Right", icon: <FaRegArrowAltCircleRight /> },
];

const EditorFloatingButtonCircle = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { mainStyle } = currentComponent;

  const [editItem, setEditItem] = useState("");

  const handleAddButton = () => {
    setEditItem("");

    const newId = generateId();

    const newButton = {
      id: newId,
      stylesBtn: {
        title: "Get Started",
        btnColor: "rgba(74,144,226,100)",
        textColor: "rgba(255,255,255,100)",
        size: "default",
        variant: "default",
        shadow: "",
      },
      iconBtn: {
        icon: "FaInstagram",
        color: "",
        size: 24,
        position: "right",
      },
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
    };

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.buttons.push(newButton);
      })
    );

    setCurrentComponent((prevComponent) =>
      produce(prevComponent, (draft) => {
        draft.buttons = [...draft.buttons, newButton];
      })
    );

    setEditItem(newId);
  };

  const renderContents = (item) => {
    const handleSelectIcon = (key, value) => {
      handleComponentChange(`buttons.${item.id}.iconBtn.${key}`, value);
    };

    return (
      <div className="flex flex-col gap-y-3">
        <ButtonStylesEditor
          selectedButton={item}
          handleComponentChange={handleComponentChange}
          withoutRounded
        />
        <TargetOptions
          content={item}
          path="buttons"
          handleComponentChange={handleComponentChange}
        />
        <IconPicker
          label="Icon"
          onSelectIcon={(key, value) => handleSelectIcon(key, value)}
          value={item.iconBtn}
          withoutIconSize
          withoutIconPosition
          withoutRemove
        />
      </div>
    );
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="content"
      >
        <div className="flex flex-col gap-y-5 p-3  rounded-lg bg-white">
          <SelectCircle
            label="Side"
            options={sideOptions}
            value={mainStyle?.side}
            onClick={(value) => handleComponentChange("mainStyle.side", value)}
          />

          <RangeInputSlider
            asChild
            label="Position"
            value={mainStyle.position}
            onChange={(value) =>
              handleComponentChange("mainStyle.position", value)
            }
            min={10}
            max={500}
          />

          {currentComponent.buttons.length > 1 && (
            <SelectOptions
              options={spaceOptions}
              asChild
              label="Space"
              value={mainStyle.space}
              onChange={(value) =>
                handleComponentChange("mainStyle.space", value)
              }
            />
          )}

          <DraggableList
            contents={currentComponent.buttons}
            path="buttons"
            renderContents={(value) => renderContents(value)}
            setCurrentComponent={setCurrentComponent}
            editItem={editItem}
            selectedComponent={selectedComponent}
            setEditItem={setEditItem}
          >
            <Button
              onClick={handleAddButton}
              variant="outline"
              className="my-3 w-full"
            >
              Add Button <Plus />
            </Button>
          </DraggableList>
        </div>
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransitionEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </>
  );
};

export default EditorFloatingButtonCircle;
