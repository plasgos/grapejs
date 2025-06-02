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
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import ImageUploader from "../_components/ImageUploader";
import TransitionEditor from "../_components/TransitionEditor";

import { BsAlignCenter, BsAlignEnd, BsAlignStart } from "react-icons/bs";
import SelectCircle from "../_components/SelectCircle";

import RichTextEditor from "@/components/rich-text-editor";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { CiImageOff, CiImageOn } from "react-icons/ci";
import ButtonStylesEditor from "../_components/ButtonStylesEditor";
import DraggableList from "../_components/DraggableList";
import IconPicker from "../_components/IconPicker";
import TargetOptions from "../_components/TargetOptions";
import SelectOptions from "../_components/SelectOptions";
import { textShadowOptions } from "@/components/SelectOptions";

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
  const { contents, buttons } = currentComponent;
  const { wrapperStyle } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  const [editItem, setEditItem] = useState("");

  const handleAddButton = () => {
    setEditItem("");

    const newId = generateId();

    const newButton = {
      id: newId,
      stylesBtn: {
        title: "Please Click Me Again",
        btnColor: "rgba(74,144,226,100)",
        textColor: "rgba(255,255,255,100)",
        size: "default",
        variant: "default",
        rounded: 10,
        shadow: "",
      },
      iconBtn: {
        icon: "",
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

            <div className="flex justify-between items-center m-3">
              <Label className="">Full Width</Label>
              <Switch
                checked={wrapperStyle.isFullWidth}
                onCheckedChange={(checked) =>
                  handleComponentChange("wrapperStyle.isFullWidth", checked)
                }
              />
            </div>
          </div>

          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          {wrapperStyle.variant === "basic" && (
            <Accordion defaultValue="image" type="single" collapsible>
              <AccordionItem value="image">
                <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
                  Image
                </AccordionTrigger>
                <AccordionContent className="bg-white p-2 rounded-b-lg ">
                  <div className="flex flex-col gap-y-5">
                    <ImageUploader
                      handleFileUpload={(url) =>
                        handleComponentChange(
                          `contents.${contents[0].id}.image`,
                          url
                        )
                      }
                      image={currentComponent?.contents[0].image}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <div className="bg-white rounded-lg p-3">
            <RichTextEditor
              label="Content"
              value={currentComponent?.contents[0].textBanner}
              onChange={(value) => {
                handleComponentChange(
                  `contents.${contents[0].id}.textBanner`,
                  value
                );
              }}
              schemeColor={"textBannerColor"}
              bgColor={currentComponent?.background?.bgColor}
            />
          </div>

          <SelectOptions
            label="Text Shadow"
            options={textShadowOptions}
            value={currentComponent.contents[0].textShadow}
            onChange={(value) =>
              handleComponentChange(
                `contents.${currentComponent.contents[0].id}.textShadow`,
                value
              )
            }
          />

          <Accordion defaultValue="button" type="single" collapsible>
            <AccordionItem value="button">
              <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
                Button
              </AccordionTrigger>
              <AccordionContent className="bg-white  rounded-b-lg ">
                <div className="flex flex-col gap-y-5">
                  <div className="flex justify-between items-center m-3">
                    <Label className="">With Button</Label>
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
                        <div className="flex justify-between items-center mx-3">
                          <Label className="">Position</Label>

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
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
          label="Image Transition"
          type="animation"
        />

        <TransitionEditor
          selectedComponent={selectedComponent}
          label="Text Transition"
          type="animationText"
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

export default EditorHeroSection;
