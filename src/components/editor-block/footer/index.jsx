import TabsEditor from "@/components/TabsEditor";
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

import bca from "@/assets/bca.png";
import mandiri from "@/assets/mandiri.png";

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { BsInfoSquareFill } from "react-icons/bs";
import { FaLink, FaMapMarkerAlt, FaRegImages } from "react-icons/fa";
import BackgroundEditor from "../_components/BackgroundEditor";
import StylesTab from "./StylesTab";
import EditorGroupLink from "./_components/EditorGroupLink";
import EditorImagesFooter from "./_components/EditorImagesFooter";
import EditorTextFooter from "./_components/EditorTextFooter";

const fieldOptions = [
  {
    type: "text",
    label: "Text",
    icon: <CiText />,
    title: "TYPE YOUR TEXT",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quis praesentium a officia aperiam deserunt incidunt, voluptatem ex amet explicabo dolores? Laboriosam quas itaque recusandae necessitatibus reiciendis nam voluptatum. Placeat.",
    width: 300,
    imageSize: 50,
    iconHeading: {
      icon: "",
      color: "rgba(0,0,0,0,1)",
      size: 24,
      position: "left",
    },
  },
  {
    type: "images",
    label: "Images",
    icon: <FaRegImages />,
    options: [
      {
        id: "img-01",
        image: bca,
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
      {
        id: "img-02",
        image: mandiri,
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
    ],
    title: "PAYMENT METHOD",
    width: 300,
    imageSize: 50,
    iconHeading: {
      icon: "",
      color: "rgba(0,0,0,0,1)",
      size: 24,
      position: "left",
    },
  },
  {
    type: "group-link",
    label: "Group Link",
    icon: <FaLink />,
    options: [
      {
        id: "link-01",
        label: "Introduction",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
      {
        id: "link-02",
        label: "Usage",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
      {
        id: "link-03",
        label: "Globals",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
      {
        id: "link-04",
        label: "About",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
    ],
    title: "GETTING STARTED",
    width: 300,
    iconHeading: {
      icon: "",
      color: "rgba(0,0,0,0,1)",
      size: 24,
      position: "left",
    },
  },
  {
    type: "contact-info",
    label: "Contact Info",
    icon: <BsInfoSquareFill />,
    options: [
      {
        id: "address-01",
        label: "Address",
        text: "Jl Sudirman 31 Jakarta Selatan",
        icon: <FaMapMarkerAlt />,
      },
    ],
    title: "Contact Info",
    width: 300,
    iconHeading: {
      icon: "",
      color: "rgba(0,0,0,0,1)",
      size: 24,
      position: "left",
    },
  },
];

const EditorFooter = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents } = currentComponent;

  const [isOpenFields, setisOpenFields] = useState(false);

  const [editItem, setEditItem] = useState("");

  const handleAddField = (field) => {
    setEditItem("");

    const newId = generateId();

    const newField = {
      id: newId,
      ...field,
      isFocused: false,
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
        {item.type === "images" && (
          <EditorImagesFooter
            item={item}
            handleComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
            setCurrentComponent={setCurrentComponent}
          />
        )}

        {item.type === "group-link" && (
          <EditorGroupLink
            item={item}
            handleComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
            setCurrentComponent={setCurrentComponent}
          />
        )}
        {item.type === "text" && (
          <EditorTextFooter
            item={item}
            handleComponentChange={handleComponentChange}
          />
        )}
      </>
    );
  };

  return (
    <TabsEditor withoutTransition>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5">
          <DraggableList
            label="Custom Fields"
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
        <StylesTab selectedComponent={selectedComponent} />
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

export default EditorFooter;
