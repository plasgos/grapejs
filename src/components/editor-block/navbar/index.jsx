import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";

import DraggableList from "../_components/DraggableList";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiText } from "react-icons/ci";
<CiText />;

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { componentsNavbar } from "@/view/navbar";
import { FaLink } from "react-icons/fa";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import BackgroundEditor from "../_components/BackgroundEditor";
import ImageUploader from "../_components/ImageUploader";
import RangeInputSlider from "../_components/RangeInputSlider";
import StylesTab from "./StylesTab";
import EditorMenuLink from "./_components/EditorMenuLink";
import EditorSingleLink from "./_components/EditorSingleLink";

const fieldOptions = [
  {
    id: `single-link-${generateId()}`,
    type: "single-link",
    label: "Single Link",
    icon: <FaLink />,
    options: [
      {
        id: `link-01-${generateId()}`,
        label: "Introduction",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
    ],

    iconHeading: {
      icon: "",
      color: "rgba(0,0,0,0,1)",
      size: 24,
      position: "left",
    },
  },
  {
    id: `menu-link-${generateId()}`,
    type: "menu-link",
    label: "Menu Link",
    icon: <TfiLayoutAccordionList />,
    options: componentsNavbar.map((component, index) => ({
      ...component,
      id: `menu-${index}-${generateId()}`,
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
    })),
    titleHeading: "Component Menu",
    iconHeading: {
      icon: "",
      color: "rgba(0,0,0,0,1)",
      size: 24,
      position: "left",
    },
  },
];

const EditorNavbar = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents, logo, logoWidth } = currentComponent;
  const [isOpenFields, setisOpenFields] = useState(false);

  const [editItem, setEditItem] = useState("");

  const handleAddField = (field) => {
    setEditItem("");

    const newId = generateId();

    const newField = {
      id: newId,
      ...field,
    };

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents.push(newField);
      })
    );

    setCurrentComponent((prevComponent) =>
      produce(prevComponent, (draft) => {
        draft.contents = [...draft.contents, newField];
      })
    );

    setEditItem(newId);
  };

  const renderContents = (item) => {
    return (
      <>
        {item.type === "single-link" && (
          <EditorSingleLink
            item={item}
            handleComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
            setCurrentComponent={setCurrentComponent}
          />
        )}

        {item.type === "menu-link" && (
          <EditorMenuLink
            item={item}
            handleComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
            setCurrentComponent={setCurrentComponent}
          />
        )}
      </>
    );
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 bg-white p-3 rounded-lg mb-5">
          <ImageUploader
            label="Image"
            handleFileUpload={(url) => handleComponentChange("logo", url)}
            image={logo}
          />

          <RangeInputSlider
            label="Width"
            value={logoWidth}
            onChange={(value) => handleComponentChange("logoWidth", value)}
            min={32}
            max={300}
          />
        </div>

        <div className="flex flex-col gap-y-5">
          <DraggableList
            label="Custom Navbar Items"
            contents={contents}
            renderContents={(value) => renderContents(value)}
            setCurrentComponent={setCurrentComponent}
            editItem={editItem}
            selectedComponent={selectedComponent}
            setEditItem={setEditItem}
          >
            <Popover open={isOpenFields} onOpenChange={setisOpenFields}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="my-3 w-full">
                  Add Field <Plus />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[310px]">
                <div className="grid grid-cols-3 gap-3">
                  {fieldOptions.map((field) => (
                    <div
                      key={field.type}
                      className="p-3 rounded-lg border flex flex-col items-center justify-center gap-y-1 cursor-pointer hover:border-black"
                      onClick={() => {
                        handleAddField(field);
                        setisOpenFields(false);
                      }}
                    >
                      {field.icon}
                      <p className="text-xs whitespace-nowrap">{field.label}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </DraggableList>
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
          handleComponentChange={handleComponentChange}
        />
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

export default EditorNavbar;
