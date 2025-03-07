import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../components/BackgroundEditor";
import SectionAddScrollTargetId from "../components/SectionAddScrollTargetId";
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
import { useChangeContents } from "@/hooks/useChangeContents";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import { generateId } from "@/lib/utils";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableListButtons from "../components/DraggableListButtons";
import ImageUploader from "../components/ImageUploader";
import RangeInputSlider from "../components/RangeInputSlider";
import TextEditor from "../components/TextEditor";
import TransiitonEditor from "../components/TransiitonEditor";

import { BsAlignCenter, BsAlignEnd, BsAlignStart } from "react-icons/bs";
import ButtonStylesEditor from "../components/ButtonStylesEditor";
import SelectCircle from "../components/SelectCircle";

import { CiImageOff, CiImageOn } from "react-icons/ci";
import IconPicker from "../components/IconPicker";

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
  const { contents, handleContentChange } =
    useChangeContents(selectedComponent);

  const [buttons, setButtons] = useState(
    selectedComponent?.get("customComponent").contents[0].buttons
  );
  console.log("🚀 ~ EditorHeroSection ~ buttons:", buttons);

  const handleButtonTargetChange = (id, key, value) => {
    //update local state editor
    setButtons((prevButton) =>
      prevButton.map((btn) =>
        btn.id === id
          ? {
              ...btn,
              [key]: value,
            }
          : btn
      )
    );

    //update grapejs canvas component
    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents[0].buttons.forEach((btn) => {
          if (btn.id === id) {
            btn[key] = value;
          }
        });
      })
    );
  };

  const handleButtonChange = (id, source, key, value) => {
    setButtons((prevButton) =>
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
        draft.contents[0].buttons = draft.contents[0].buttons.map((btn) =>
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

  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  const handleFileUpload = (id) => {
    onChangeFileUpload(id, handleContentChange);
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
        draft.contents[0].buttons.push(newButton);
      })
    );

    setButtons((content) => [...content, newButton]);

    setEditItem(newId);
  };

  const renderContents = (item) => {
    const selectedButton = buttons.find((btn) => btn.id === item.id);

    const handleSelectIcon = (key, value) => {
      handleButtonChange(selectedButton.id, "iconBtn", key, value);
    };

    return (
      <div className="flex flex-col gap-y-3">
        <ButtonStylesEditor
          selectedButton={selectedButton}
          handleButtonChange={handleButtonChange}
          handleButtonTargetChange={handleButtonTargetChange}
        />

        <IconPicker
          label="Icon"
          onSelectIcon={(key, value) => handleSelectIcon(key, value)}
          value={selectedButton.iconBtn}
          withoutIconSize
        />
      </div>
    );
  };

  return (
    <TabsEditor>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <div className="bg-white p-3 rounded-lg">
            <SelectCircle
              label="Variant"
              options={variantOptions}
              value={wrapperStyle.variant}
              onClick={(value) => {
                handleStylesChange("variant", value);
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
                      handleFileUpload={() => handleFileUpload(contents[0].id)}
                      image={contents[0].image}
                    />

                    <div className="flex justify-between items-center">
                      <Label className="font-normal">Image Position</Label>

                      <div className="flex items-center gap-x-2">
                        {imagePostionOptions.map((item) => (
                          <Button
                            key={item.value}
                            onClick={() => {
                              handleContentChange(
                                contents[0].id,
                                "imagePosition",
                                item.value
                              );
                            }}
                            variant={
                              item.value === contents[0].imagePosition
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
                      value={contents[0].width}
                      onChange={(value) =>
                        handleContentChange(contents[0].id, "width", value)
                      }
                      min={100}
                      max={1440}
                    />

                    <RangeInputSlider
                      asChild
                      label="Rotation"
                      value={contents[0].rotation}
                      onChange={(value) =>
                        handleContentChange(contents[0].id, "rotation", value)
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
            value={contents[0].textBanner}
            onChange={(value) =>
              handleContentChange(contents[0].id, "textBanner", value)
            }
          />

          {/* <LexicalTextEditor /> */}

          <Accordion type="single" collapsible>
            <AccordionItem value="button">
              <AccordionTrigger className="!no-underline font-semibold bg-white px-2 rounded-t-lg data-[state=closed]:rounded-lg">
                Button
              </AccordionTrigger>
              <AccordionContent className="bg-white p-2 rounded-b-lg ">
                <div className="flex flex-col gap-y-5">
                  <div className="flex justify-between items-center">
                    <Label className="font-normal">With Button</Label>
                    <Switch
                      checked={wrapperStyle.withButton}
                      onCheckedChange={(checked) =>
                        handleStylesChange("withButton", checked)
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
                                  handleStylesChange("btnPosition", item.value);
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
                      <DraggableListButtons
                        contents={buttons}
                        renderContents={(value) => renderContents(value)}
                        setContents={setButtons}
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
                      </DraggableListButtons>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransiitonEditor selectedComponent={selectedComponent} />
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

export default EditorHeroSection;
