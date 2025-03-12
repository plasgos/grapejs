import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { useChangeContents } from "@/hooks/useChangeContents";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import ButtonStylesEditor from "../components/ButtonStylesEditor";
import DraggableList from "../components/DraggableList";
import IconPicker from "../components/IconPicker";

import { MdOutlineHorizontalRule } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";
import { btnPostionOptions } from "../hero-section";
import BackgroundEditor from "../components/BackgroundEditor";
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
  const { contents, setContents, handleContentChange } =
    useChangeContents(selectedComponent);

  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  const handleButtonTargetChange = (id, key, value) => {
    handleContentChange(id, key, value);
  };

  const handleButtonChange = (id, source, key, value) => {
    setContents((prevButton) =>
      prevButton.map((btn) =>
        btn.id === id
          ? {
              ...btn,
              [source]: {
                ...btn[source],
                [key]: value,
              },
            }
          : btn
      )
    );

    // Update GrapesJS canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents = draft.contents.map((btn) =>
          btn.id === id
            ? {
                ...btn,
                [source]: {
                  ...btn[source],
                  [key]: value,
                },
              }
            : btn
        );
      })
    );
  };

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
        color: "rgba(0,0,0,0,1)",
        size: 24,
        position: "right",
      },
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
        draft.contents.push(newButton);
      })
    );

    setContents((content) => [...content, newButton]);

    setEditItem(newId);
  };

  const renderContents = (item) => {
    const selectedButton = contents.find((btn) => btn.id === item.id);

    const handleSelectIcon = (key, value) => {
      handleButtonChange(selectedButton.id, "iconBtn", key, value);
    };

    return (
      <div className="flex flex-col gap-y-3">
        <ButtonStylesEditor
          selectedButton={selectedButton}
          handleButtonChange={handleButtonChange}
          handleButtonTargetChange={handleButtonTargetChange}
          withoutRounded
        />

        <IconPicker
          label="Icon"
          onSelectIcon={(key, value) => handleSelectIcon(key, value)}
          value={selectedButton.iconBtn}
          withoutIconSize
          withoutIconPosition
          withoutRemove
        />
      </div>
    );
  };

  return (
    <TabsEditor withoutStyles withoutTransition>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1 mt-3">
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
                            handleStylesChange("align", item.value);
                          }}
                          variant={
                            item.value === wrapperStyle.align ? "" : "outline"
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
                            handleStylesChange("position", item.value);
                          }}
                          variant={
                            item.value === wrapperStyle.position
                              ? ""
                              : "outline"
                          }
                          size="sm"
                        >
                          {item.icon}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <DraggableList
                    contents={contents}
                    renderContents={(value) => renderContents(value)}
                    setContents={setContents}
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
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorButton;
