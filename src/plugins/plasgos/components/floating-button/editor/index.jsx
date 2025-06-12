import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import TransitionEditor from "@/plugins/plasgos/components/_components-editor/TransitionEditor";

import { Label } from "@/components/ui/label";
import ButtonStylesEditor from "@/plugins/plasgos/components/_components-editor/ButtonStylesEditor";
import DraggableList from "@/plugins/plasgos/components/_components-editor/DraggableList";
import IconPicker from "@/plugins/plasgos/components/_components-editor/IconPicker";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";
import TargetOptions from "@/plugins/plasgos/components/_components-editor/TargetOptions";
import RangeInputSlider from "../../_components-editor/RangeInputSlider";
const buttonPosition = [
  { value: "flex-row", label: "Row", icon: <MdOutlineHorizontalRule /> },
  { value: "flex-col", label: "Column", icon: <TbMinusVertical /> },
];

export const spaceOptions = [
  { value: 5, label: "Very Close" },
  { value: 10, label: "Close" },
  { value: 20, label: "Moderate" },
  { value: 40, label: "Far" },
  { value: 60, label: "Very Far" },
];

const EditorFloatingButton = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { buttons, mainStyle } = currentComponent;

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
        rounded: 10,
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
        <div className="flex flex-col gap-y-5 p-3 bg-white rounded-lg">
          <RangeInputSlider
            label="Position"
            value={mainStyle.verticalPosition}
            onChange={(value) =>
              handleComponentChange("mainStyle.verticalPosition", value)
            }
            min={20}
            max={500}
          />

          <div className="flex justify-between items-center">
            <Label className="font-normal">Align</Label>

            <div className="flex items-center gap-x-2">
              {buttonPosition.map((item) => (
                <Button
                  key={item.value}
                  onClick={() => {
                    handleComponentChange("mainStyle.position", item.value);
                  }}
                  variant={item.value === mainStyle.position ? "" : "outline"}
                  size="sm"
                >
                  {item.icon}
                </Button>
              ))}
            </div>
          </div>

          <DraggableList
            contents={buttons}
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

export default EditorFloatingButton;
