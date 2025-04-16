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

import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { componentsNavbar } from "@/view/navbar";
import Compressor from "compressorjs";
import { FaLink } from "react-icons/fa";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import BackgroundEditor from "../_components/BackgroundEditor";
import ImageUploader from "../_components/ImageUploader";
import RangeInputSlider from "../_components/RangeInputSlider";
import StylesTab from "./StylesTab";
import EditorSingleLink from "./_components/EditorSingleLink";
import EditorMenuLink from "./_components/EditorMenuLink";

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

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Hanya menerima file gambar
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      console.log(`Original file size: ${(file.size / 1024).toFixed(2)} KB`);

      // Konfigurasi Compressor
      const options = {
        mimeType: "image/webp", // Konversi ke format WebP
        success: (compressedFile) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            const imageUrl = event.target.result;

            handleComponentChange(`logo`, imageUrl);
          };

          console.log(
            `Compressed file size: ${(compressedFile.size / 1024).toFixed(
              2
            )} KB`
          );

          reader.readAsDataURL(compressedFile);
        },
        error: (err) => {
          console.error("Error compressing image:", err);
          alert("Failed to process image. Please try again.");
        },
      };

      // Jika file lebih dari 1MB, tambahkan kompresi
      if (file.size > 1048576) {
        // 1MB = 1,048,576 bytes
        options.quality = 0.5; // Kompresi dengan kualitas 50%
      }

      // Proses gambar dengan Compressor
      new Compressor(file, options);
    };
  };

  return (
    <TabsEditor withoutTransition>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 bg-white p-3 rounded-lg mb-5">
          <ImageUploader
            label="Image"
            handleFileUpload={handleFileUpload}
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

export default EditorNavbar;
