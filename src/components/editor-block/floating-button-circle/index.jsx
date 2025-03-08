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
import TransiitonEditor from "../components/TransiitonEditor";

import ButtonStylesEditor from "../components/ButtonStylesEditor";
import DraggableList from "../components/DraggableList";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import RangeInputSlider from "../components/RangeInputSlider";
import SelectOptions from "../components/SelectOptions";
import IconPicker from "../components/IconPicker";

export const spaceOptions = [
  { value: 5, label: "Very Close" },
  { value: 10, label: "Close" },
  { value: 20, label: "Moderate" },
  { value: 40, label: "Far" },
  { value: 60, label: "Very Far" },
];

const EditorFloatingButtonCircle = ({ selectedComponent }) => {
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
    <TabsEditor withoutBackground withoutStyles withoutTransition>
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
                  <RangeInputSlider
                    asChild
                    label="Position"
                    value={wrapperStyle.position}
                    onChange={(value) => handleStylesChange("position", value)}
                    min={10}
                    max={500}
                  />

                  {contents.length > 1 && (
                    <SelectOptions
                      options={spaceOptions}
                      asChild
                      label="Space"
                      value={wrapperStyle.space}
                      onChange={(value) => handleStylesChange("space", value)}
                    />
                  )}

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

      <TabsContent className="px-4 pb-5" value="transition">
        <TransiitonEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorFloatingButtonCircle;
