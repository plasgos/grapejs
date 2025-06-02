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
import { FaLink, FaRegImages } from "react-icons/fa";
import { IoMailUnreadOutline, IoShareSocialSharp } from "react-icons/io5";
import BackgroundEditor from "../_components/BackgroundEditor";
import StylesTab from "./StylesTab";
import EditorContactInfo from "./_components/EditorContactInfo";
import EditorGroupLink from "./_components/EditorGroupLink";
import EditorImagesFooter from "./_components/EditorImagesFooter";
import EditorNewsletter from "./_components/EditorNewsletter";
import EditorSocialMedia from "./_components/EditorSocialMedia";
import EditorTextFooter from "./_components/EditorTextFooter";

const fieldOptions = [
  {
    id: `text-${generateId()}`,
    type: "text",
    label: "Text",
    icon: <CiText />,
    title: "Type Your Text",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quis praesentium a officia aperiam deserunt incidunt, voluptatem ex amet explicabo dolores? Laboriosam quas itaque recusandae necessitatibus reiciendis nam voluptatum. Placeat.",
    width: 300,
    iconHeading: {
      icon: "",
      color: "",
      size: 24,
      position: "left",
    },
  },
  {
    id: `images-${generateId()}`,
    type: "images",
    label: "Images",
    icon: <FaRegImages />,
    options: [
      {
        id: `img-01-${generateId()}`,
        image: bca,
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
      {
        id: `img-02-${generateId()}`,
        image: mandiri,
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
    ],
    title: "Payment Method",
    width: 300,
    imageWidth: 80,
    iconHeading: {
      icon: "",
      color: "",
      size: 24,
      position: "left",
    },
  },
  {
    id: `group-link-${generateId()}`,
    type: "group-link",
    label: "Group Link",
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
      {
        id: `link-02-${generateId()}`,
        label: "Usage",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
      {
        id: `link-03-${generateId()}`,
        label: "Globals",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
      {
        id: `link-04-${generateId()}`,
        label: "About",
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      },
    ],
    title: "Getting Started",
    width: 300,
    iconHeading: {
      icon: "",
      color: "",
      size: 24,
      position: "left",
    },
  },
  {
    id: `contact-info-${generateId()}`,
    type: "contact-info",
    label: "Contact Info",
    icon: <BsInfoSquareFill />,
    options: [
      {
        id: `address-${generateId()}`,
        label: "Address",
        value: "Jl Sudirman 31 Jakarta Selatan",
        icon: "FaMapMarkerAlt",
      },
      {
        id: `phoneNumber-${generateId()}`,
        label: "Phone Number",
        icon: "FaPhoneAlt",
        value: "(021) 2248 1664",
      },
      {
        id: `email-${generateId()}`,
        label: "Email",
        icon: "FaEnvelope",
        value: "costumer.care@plasgos.co.id",
      },
      {
        id: `whatsapp-${generateId()}`,
        label: "whatsapp",
        icon: "FaWhatsapp",
        value: "0853-1111-1010",
      },
    ],
    title: "Contact Info",
    width: 300,
    iconHeading: {
      icon: "",
      color: "",
      size: 24,
      position: "left",
    },
  },
  {
    id: `social-media-${generateId()}`,
    type: "social-media",
    label: "Social Media",
    icon: <IoShareSocialSharp />,
    options: [
      {
        id: `fb-${generateId()}`,
        label: "Facebook",
        value: "",
        icon: "FaFacebook",
        placeholder: "https://facebook.com/username",
      },
      {
        id: `ig-${generateId()}`,
        label: "Instagram",
        icon: "FaInstagram",
        value: "",
        placeholder: "https://instagram.com/username",
      },
      {
        id: `x-${generateId()}`,
        label: "Twitter (X)",
        icon: "FaSquareXTwitter",
        value: "",
        placeholder: "https://x.com/username",
      },
    ],
    title: "Follow us",
    width: 250,
    iconHeading: {
      icon: "",
      color: "",
      size: 24,
      position: "left",
    },
  },
  {
    id: `newsletter-${generateId()}`,
    type: "newsletter",
    label: "Newsletter",
    icon: <IoMailUnreadOutline />,
    title: "Newsletter",
    subTitle: "Receive updates on the latest news and offers",
    placeholder: "youremail@gmail.com",
    actionText: "Subscribe",
    width: 300,
    buttonColor: "",
    textButton: "",
    iconHeading: {
      icon: "",
      color: "",
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
            currentComponent={currentComponent}
          />
        )}
        {item.type === "contact-info" && (
          <EditorContactInfo
            item={item}
            handleComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
            setCurrentComponent={setCurrentComponent}
          />
        )}
        {item.type === "social-media" && (
          <EditorSocialMedia
            item={item}
            handleComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
            setCurrentComponent={setCurrentComponent}
          />
        )}
        {item.type === "newsletter" && (
          <EditorNewsletter
            item={item}
            handleComponentChange={handleComponentChange}
          />
        )}
      </>
    );
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInRight"
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
        className="p-4 mt-0 animate__animated animate__fadeInRight"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
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

export default EditorFooter;
