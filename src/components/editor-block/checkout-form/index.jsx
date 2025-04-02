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
import { BsTextareaResize } from "react-icons/bs";
import { CiText } from "react-icons/ci";
import { FaPhone, FaStar } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";
import { LuTextCursorInput } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import EditorCheckbox from "./_components/EditorCheckbox";
import EditorTextTitle from "./_components/EditorTitle";
<CiText />;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { BiSolidImageAdd } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RxDividerHorizontal, RxDropdownMenu } from "react-icons/rx";
import ColorPicker from "../_components/ColorPicker";
import IconPicker from "../_components/IconPicker";
import BasicInputProps from "./_components/BasicInputProps";
import EditorDividerField from "./_components/EditorDividerField";
import EditorImageField from "./_components/EditorImageField";
import EditorRating from "./_components/EditorRating";
import StylesTab from "./StylesTab";
const fieldOptions = [
  { type: "title", label: "Title", icon: <CiText />, value: "Custom Title" },
  {
    type: "text-input",
    label: "Text Input",
    icon: <LuTextCursorInput />,
    labelField: "",
    isRequired: true,
    value: "",
    placeholder: "Type Here...",
  },
  {
    type: "email",
    label: "Email",
    icon: <MdOutlineMailOutline />,
    labelField: "Email",
    isRequired: true,
    value: "",
    placeholder: "example@email.com",
  },
  {
    type: "phoneNumber",
    label: "Phone",
    icon: <FaPhone />,
    labelField: "Phone",
    isRequired: true,
    value: "",
    placeholder: "628952367xxxx",
  },
  {
    type: "text-area",
    label: "Text Area",
    labelField: "",
    icon: <BsTextareaResize />,
    isRequired: true,
    value: "",
    placeholder: "Type Here...",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    labelField: "Type a question",
    icon: <IoIosCheckboxOutline />,
    options: [
      { id: "option-1", value: "option-1", label: "Option 1" },
      { id: "option-2", value: "option-2", label: "Option 2" },
      { id: "option-3", value: "option-3", label: "Option 3" },
    ],
    isRequired: true,
    layout: "horizontal",
    isMultipleSelect: false,
    value: "",
  },
  {
    type: "dropdown-menu",
    label: "Dropdown",
    labelField: "Dropdown Menu",
    searchPlaceholder: "Search options...",
    placeholder: "Select options...",
    width: 200,
    icon: <RxDropdownMenu />,
    options: [
      { id: "option-1", value: "option-1", label: "Option 1" },
      { id: "option-2", value: "option-2", label: "Option 2" },
      { id: "option-3", value: "option-3", label: "Option 3" },
    ],
    isRequired: true,
    value: "",
  },
  {
    type: "date",
    label: "Date & Time",
    labelField: "Date",
    placeholder: "Select Date",
    width: 220,
    icon: <FaRegCalendarAlt />,
    isShowTime: true,
    isRequired: true,
    value: "",
  },
  {
    type: "rating",
    label: "Rating",
    labelField: "Rating",
    icon: <FaStar />,
    isRequired: true,
    design: "stars",
    ratingSize: 24,
    value: "",
  },
  {
    type: "image",
    label: "Image",
    labelField: "Upload Image",
    icon: <BiSolidImageAdd />,
    isRequired: true,
    value: "",
  },
  {
    type: "divider",
    label: "Divider",
    labelField: "Divider",
    fullWidth: true,
    width: 500,
    height: 5,
    variant: "solid",
    color: "rgba(19, 86, 236, 0.8)",
    icon: <RxDividerHorizontal />,
    value: "",
  },
];

const EditorCheckoutForm = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents, wrapperStyle } = currentComponent;

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
        {item.type === "title" && (
          <EditorTextTitle
            item={item}
            handleComponentChange={handleComponentChange}
          />
        )}
        {(item.type === "text-input" ||
          item.type === "email" ||
          item.type === "text-area" ||
          item.type === "phoneNumber" ||
          item.type === "date") && (
          <BasicInputProps
            item={item}
            handleComponentChange={handleComponentChange}
          />
        )}
        {(item.type === "checkbox" || item.type === "dropdown-menu") && (
          <EditorCheckbox
            item={item}
            handleComponentChange={handleComponentChange}
            selectedComponent={selectedComponent}
            contents={contents}
            setCurrentComponent={setCurrentComponent}
          />
        )}

        {item.type === "rating" && (
          <EditorRating
            item={item}
            handleComponentChange={handleComponentChange}
          />
        )}
        {item.type === "image" && (
          <EditorImageField
            item={item}
            handleComponentChange={handleComponentChange}
          />
        )}
        {item.type === "divider" && (
          <EditorDividerField
            item={item}
            handleComponentChange={handleComponentChange}
          />
        )}
      </>
    );
  };

  const handleSelectIcon = (key, value) => {
    handleComponentChange(`wrapperStyle.iconBtn.${key}`, value);
  };

  return (
    <TabsEditor withoutTransition withoutBackground>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5">
          <div className="p-3 bg-white rounded-lg flex flex-col gap-y-5">
            <div className="mb-3">
              <Label className="text-base ">Button Submit</Label>
            </div>
            <div className="space-y-2">
              <Label>Text</Label>
              <Input
                value={wrapperStyle?.buttonText || ""}
                onChange={(e) =>
                  handleComponentChange(
                    "wrapperStyle.buttonText",
                    e.target.value
                  )
                }
              />
            </div>

            <ColorPicker
              label="Color"
              value={wrapperStyle.buttonColor}
              onChange={(color) =>
                handleComponentChange("wrapperStyle.buttonColor", color)
              }
            />

            <IconPicker
              label="Icon"
              value={wrapperStyle.iconBtn}
              onSelectIcon={(key, value) => handleSelectIcon(key, value)}
              withoutIconSize
            />
          </div>

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
    </TabsEditor>
  );
};

export default EditorCheckoutForm;
