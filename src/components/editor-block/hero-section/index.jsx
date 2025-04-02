import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { generateId } from "@/lib/utils";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import ImageUploader from "../_components/ImageUploader";
import RangeInputSlider from "../_components/RangeInputSlider";
import TextEditor from "../_components/TextEditor";
import TransitionEditor from "../_components/TransitionEditor";

import { BsAlignCenter, BsAlignEnd, BsAlignStart } from "react-icons/bs";
import SelectCircle from "../_components/SelectCircle";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { CiImageOff, CiImageOn } from "react-icons/ci";
import DraggableList from "../_components/DraggableList";
import IconPicker from "../_components/IconPicker";
import ButtonStylesEditor from "../_components/ButtonStylesEditor";
import TargetOptions from "../_components/TargetOptions";

const imagePostionOptions = [
  { value: "left", label: "Left", icon: <BsAlignStart /> },
  { value: "right", label: "Right", icon: <BsAlignEnd /> },
];

export const btnPostionOptions = [
  { value: "justify-start", label: "Left", icon: <BsAlignStart /> },
  { value: "justify-center", label: "Center", icon: <BsAlignCenter /> },
  { value: "justify-end", label: "Right", icon: <BsAlignEnd /> },
];

const variantOptions = [
  { value: "basic", label: "Basic", icon: <CiImageOn /> },
  { value: "no-image", label: "No Image", icon: <CiImageOff /> },
];

const EditorHeroSection = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  const handleFileUpload = (id) => {
    onChangeFileUpload(id, handleComponentChange);
  };

  const [editItem, setEditItem] = useState("");

  const handleAddButton = () => {
    setEditItem("");

    const newId = generateId();

    const newButton = {
      id: newId,
      stylesBtn: {
        title: "Please Click Me Again",
        btnColor: "",
        textColor: "",
        size: "default",
        variant: "default",
        rounded: 10,
        shadow: "",
      },
      iconBtn: {
        icon: "",
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
        />

        <TargetOptions
          content={item}
          path="buttons"
          setCurrentComponent={setCurrentComponent}
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
    <TabsEditor>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <div className="bg-white p-3 rounded-lg">
            <SelectCircle
              label="Variant"
              options={variantOptions}
              value={wrapperStyle.variant}
              onClick={(value) => {
                handleComponentChange("wrapperStyle.variant", value);
              }}
            />
          </div>

          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          {wrapperStyle.variant === "basic" && (
            <Accordion type="single" collapsible>
              <AccordionItem value="image">
                <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
                  Image
                </AccordionTrigger>
                <AccordionContent className="bg-white p-2 rounded-b-lg ">
                  <div className="flex flex-col gap-y-5">
                    <ImageUploader
                      handleFileUpload={() =>
                        handleFileUpload(currentComponent?.contents[0].id)
                      }
                      image={currentComponent?.contents[0].image}
                    />

                    <div className="flex justify-between items-center">
                      <Label className="font-normal">Image Position</Label>

                      <div className="flex items-center gap-x-2">
                        {imagePostionOptions.map((item) => (
                          <Button
                            key={item.value}
                            onClick={() => {
                              handleComponentChange(
                                `contents.${currentComponent.contents[0].id}.imagePosition`,
                                item.value
                              );
                            }}
                            variant={
                              item.value ===
                              currentComponent.contents[0].imagePosition
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

                    <RangeInputSlider
                      asChild
                      label="Width"
                      value={currentComponent?.contents[0].width}
                      onChange={(value) =>
                        handleComponentChange(
                          `contents.${currentComponent.contents[0].id}.width`,
                          value
                        )
                      }
                      min={100}
                      max={1440}
                    />

                    <RangeInputSlider
                      asChild
                      label="Rotation"
                      value={currentComponent?.contents[0].rotation}
                      onChange={(value) =>
                        handleComponentChange(
                          `contents.${currentComponent.contents[0].id}.rotation`,
                          value
                        )
                      }
                      min={-90}
                      max={90}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <TextEditor
            label="Content"
            value={currentComponent?.contents[0].textBanner}
            onChange={(value) =>
              handleComponentChange(
                `contents.${currentComponent.contents[0].id}.textBanner`,
                value
              )
            }
          />

          {/* <LexicalTextEditor /> */}

          <Accordion defaultValue="button" type="single" collapsible>
            <AccordionItem value="button">
              <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
                Button
              </AccordionTrigger>
              <AccordionContent className="bg-white  rounded-b-lg ">
                <div className="flex flex-col gap-y-5">
                  <div className="flex justify-between items-center mx-3">
                    <Label className="font-normal">With Button</Label>
                    <Switch
                      checked={wrapperStyle.withButton}
                      onCheckedChange={(checked) =>
                        handleComponentChange(
                          "wrapperStyle.withButton",
                          checked
                        )
                      }
                    />
                  </div>

                  {wrapperStyle.withButton && (
                    <>
                      {wrapperStyle.variant === "basic" && (
                        <div className="flex justify-between items-center">
                          <Label className="font-normal">Position</Label>

                          <div className="flex items-center gap-x-2">
                            {btnPostionOptions.map((item) => (
                              <Button
                                key={item.value}
                                onClick={() => {
                                  handleComponentChange(
                                    "wrapperStyle.btnPosition",
                                    item.value
                                  );
                                }}
                                variant={
                                  item.value === wrapperStyle.btnPosition
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
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransitionEditor selectedComponent={selectedComponent} />
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

export default EditorHeroSection;
