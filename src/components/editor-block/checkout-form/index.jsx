import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { useChangeContents } from "@/hooks/useChangeContents";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import DraggableList from "../components/DraggableList";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsTextareaResize } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import { LuTextCursorInput } from "react-icons/lu";
import EditorInputField from "./_components/EditorInputField";
import { CiText } from "react-icons/ci";
import EditorTextTitle from "./_components/EditorTitle";
<CiText />;
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import EditorCheckbox from "./_components/EditorCheckbox";
const fieldOptions = [
  { type: "title", label: "Title", icon: <CiText />, value: "Custom Title " },
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
    checkboxes: [
      { id: "option-1", value: "option-1", label: "Option 1" },
      { id: "option-2", value: "option-2", label: "Option 2" },
      { id: "option-3", value: "option-3", label: "Option 3" },
    ],
    isRequired: true,
    layout: "horizontal",
    value: "",
  },
];

const EditorCheckoutForm = ({ selectedComponent }) => {
  const { contents, setContents, handleContentChange } =
    useChangeContents(selectedComponent);
  console.log("🚀 ~ EditorCheckoutForm ~ contents:", contents);

  const [isOpenFields, setisOpenFields] = useState(false);

  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

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

    setContents((content) => [...content, newField]);

    setEditItem(newId);
  };

  const renderContents = (item) => {
    return (
      <div className="flex flex-col gap-y-3">
        {item.type === "title" && (
          <EditorTextTitle
            item={item}
            handleContentChange={handleContentChange}
          />
        )}
        {(item.type === "text-input" ||
          item.type === "email" ||
          item.type === "text-area" ||
          item.type === "phoneNumber") && (
          <EditorInputField
            item={item}
            handleContentChange={handleContentChange}
          />
        )}
        {item.type === "checkbox" && (
          <EditorCheckbox
            item={item}
            handleContentChange={handleContentChange}
            selectedComponent={selectedComponent}
            contents={contents}
            setContents={setContents}
          />
        )}
      </div>
    );
  };

  return (
    <TabsEditor withoutStyles withoutTransition withoutBackground>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5  mt-5 bg-white p-5 rounded-lg">
          <DraggableList
            contents={contents}
            renderContents={(value) => renderContents(value)}
            setContents={setContents}
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
    </TabsEditor>
  );
};

export default EditorCheckoutForm;
