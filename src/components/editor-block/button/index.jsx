import { TabsContent } from "@/components/ui/tabs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import ButtonStylesEditor from "../_components/ButtonStylesEditor";
import DraggableList from "../_components/DraggableList";
import IconPicker from "../_components/IconPicker";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";
import BackgroundEditor from "../_components/BackgroundEditor";
import TargetOptions from "../_components/TargetOptions";
import { btnPostionOptions } from "../hero-section";
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

const EditorButton = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { mainStyle } = currentComponent;
  console.log("🚀 ~ EditorButton ~ currentComponent:", currentComponent);

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
        icon: "",
        color: "",
        size: "",
        position: "",
      },
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
    };

    const updateContents = (component) => {
      return produce(component, (draft) => {
        draft.buttons.push(newButton);
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
        <div className="flex flex-col gap-y-5 py-1 ">
          <Accordion defaultValue="button" type="single" collapsible>
            <AccordionItem value="button">
              <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
                Button
              </AccordionTrigger>
              <AccordionContent className="bg-white p-2 rounded-b-lg ">
                <div className="flex flex-col gap-y-5">
                  <div className="flex justify-between items-center">
                    <Label className="font-normal">Align</Label>

                    <div className="flex items-center gap-x-2">
                      {btnPostionOptions.map((item) => (
                        <Button
                          key={item.value}
                          onClick={() => {
                            handleComponentChange(
                              "mainStyle.align",
                              item.value
                            );
                          }}
                          variant={
                            item.value === mainStyle.align ? "" : "outline"
                          }
                          size="sm"
                        >
                          {item.icon}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Label className="font-normal">Position</Label>

                    <div className="flex items-center gap-x-2">
                      {buttonPosition.map((item) => (
                        <Button
                          key={item.value}
                          onClick={() => {
                            handleComponentChange(
                              "mainStyle.position",
                              item.value
                            );
                          }}
                          variant={
                            item.value === mainStyle.position ? "" : "outline"
                          }
                          size="sm"
                        >
                          {item.icon}
                        </Button>
                      ))}
                    </div>
                  </div>

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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
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

export default EditorButton;
