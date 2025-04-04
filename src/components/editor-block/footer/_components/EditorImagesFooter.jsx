import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RangeInputSlider from "../../_components/RangeInputSlider";
import { produce } from "immer";
import { generateId } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import bri from "@/assets/bri.png";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { RxDragHandleDots2 } from "react-icons/rx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { MdClose } from "react-icons/md";
import { closestCenter, DndContext } from "@dnd-kit/core";
import ImageUploader from "../../_components/ImageUploader";

import Compressor from "compressorjs";
import TargetOptions from "../../_components/TargetOptions";
import IconPicker from "../../_components/IconPicker";

const SortableItem = ({
  item,
  setCurrentComponent,
  selectedComponent,
  setEditItem,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const handleEdit = () => {
    setEditItem(item.id);
  };

  const handleRemoveItem = () => {
    const removeItemFromComponent = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.type === "images"
        );

        if (content) {
          content.options = content.options.filter(
            (checkbox) => checkbox.id !== item.id
          );
        }
      });
    };

    selectedComponent?.set(
      "customComponent",
      removeItemFromComponent(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) =>
      removeItemFromComponent(prevComponent)
    );
  };

  const commandNavigation = [
    { action: "Edit", command: handleEdit, icon: <TbEdit /> },
    {
      action: "Remove",
      command: handleRemoveItem,
      icon: <FaTrashAlt color="red" />,
    },
  ];

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`w-full    px-2 bg-white shadow cursor-move  rounded-xl relative ${
        isDragging ? "z-20 bg-purple-200 ring-2 ring-purple-700" : ""
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div
        className={`absolute left-0 top-0 closestCenteroverflow-hidden w-5 h-full ${
          isDragging ? "bg-orange-500" : "bg-orange-300"
        }  rounded-l-xl`}
      >
        <div className="flex flex-col justify-center items-center h-full ">
          <RxDragHandleDots2 />
          <RxDragHandleDots2 className="-mt-[3px]" />
        </div>
      </div>

      <div className="flex items-center justify-between  ml-5">
        <div className="flex gap-x-3  items-center p-1">
          {item.image ? (
            <img
              src={item.image}
              alt="item-img"
              className="object-contain w-16 h-12 "
            />
          ) : null}

          <div className=" font-semibold text-sm  max-w-32">
            <p className="truncate">{item?.label}</p>
          </div>
        </div>
        <div className="">
          {commandNavigation.map((navigate) => (
            <TooltipProvider key={navigate.action} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="p-1.5"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate.command();
                    }}
                    variant="ghost"
                  >
                    {navigate.icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{navigate.action}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditorImagesFooter = ({
  item,
  handleComponentChange,
  selectedComponent,
  contents,
  setCurrentComponent,
}) => {
  const selectedType = contents.find((content) => content.type === "images");

  const [editItem, setEditItem] = useState(false);

  const itemRefs = useRef({});

  // Ref untuk setiap item

  useEffect(() => {
    if (editItem && itemRefs.current[editItem]) {
      const element = itemRefs.current[editItem];
      // Tunda scroll hingga animasi selesai
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 500); // Sesuaikan waktu dengan durasi animasi Accordion
    }
  }, [editItem]);

  const handleDragEnd = (event) => {
    const currentComponent = selectedComponent?.get("customComponent");
    const { active, over } = event;

    if (!currentComponent || !active || !over || active.id === over.id) return;

    const checkboxContent = currentComponent.contents.find(
      (content) => content.type === "images"
    );
    if (!checkboxContent) return;

    const { options } = checkboxContent;

    const oldIndex = options.findIndex((item) => item.id === active.id);
    const newIndex = options.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newOptions = arrayMove(options, oldIndex, newIndex);

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.type === "images"
        );

        if (content) {
          content.options = newOptions;
        }
      });
    };

    selectedComponent?.set(
      "customComponent",
      updateField(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => updateField(prevComponent));
  };

  const handleCloseEdit = () => {
    setEditItem("");
  };

  const handleAddImage = () => {
    const currentComponent = selectedComponent.get("customComponent");
    if (!currentComponent) return;

    setEditItem("");

    const newId = generateId();

    const newImage = {
      id: newId,
      image: bri,
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
    };

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.type === "images"
        );

        if (content) {
          content.options = [...content.options, newImage];
        }
      });
    };

    selectedComponent?.set(
      "customComponent",
      updateField(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => updateField(prevComponent));

    setEditItem(newId);
  };

  const onChangeFileUpload = (optId) => {
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

            const updateField = (component) => {
              return produce(component, (draft) => {
                const content = draft.contents.find(
                  (content) => content.type === "images"
                );

                if (content) {
                  content.options = content.options.map((opt) =>
                    opt.id === optId
                      ? {
                          ...opt,
                          image: imageUrl,
                        }
                      : opt
                  );
                }
              });
            };

            selectedComponent?.set(
              "customComponent",
              updateField(selectedComponent.get("customComponent"))
            );

            setCurrentComponent((prevComponent) => updateField(prevComponent));
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

  const handleSelectIcon = (key, value) => {
    handleComponentChange(`contents.${item.id}.iconBtn.${key}`, value);
  };

  const handleChangeCustomField = (id, value) => {
    const formattedValue = value.toLowerCase().replace(/\s+/g, "-");

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.type === "images"
        );

        if (content) {
          content.options = content.options.map((opt) =>
            opt.id === id
              ? {
                  ...opt,
                  value: formattedValue,
                  label: value,
                }
              : opt
          );
        }
      });
    };

    selectedComponent?.set(
      "customComponent",
      updateField(selectedComponent.get("customComponent"))
    );

    setCurrentComponent((prevComponent) => updateField(prevComponent));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={item?.title || ""}
          onChange={(e) =>
            handleComponentChange(`contents.${item.id}.title`, e.target.value)
          }
        />
      </div>

      <IconPicker
        label="Icon"
        value={item.iconBtn}
        onSelectIcon={(key, value) => handleSelectIcon(key, value)}
      />

      <RangeInputSlider
        label="Width"
        value={item.width}
        onChange={(value) =>
          handleComponentChange(`contents.${item.id}.width`, value)
        }
        min={80}
        max={600}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <HiMiniAdjustmentsHorizontal />

            {item.type === "images" ? "Customize Images" : "Customize Menu"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 w-[350px] bg-secondary">
          <p className="pb-3 mb-3 px-5 border-b ">List Images</p>

          <div className="h-auto max-h-[350px] overflow-y-auto p px-5">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={() => setEditItem("")}
            >
              <SortableContext
                items={
                  contents.find((content) => content.type === "images").options
                }
                strategy={verticalListSortingStrategy}
              >
                <Accordion
                  type="single"
                  collapsible
                  className="w-full !overflow-visible"
                  value={editItem}
                  onValueChange={(val) => setEditItem(val)}
                >
                  <div className="flex flex-col gap-y-3">
                    {selectedType.options.length > 0 ? (
                      <>
                        {contents
                          .find((content) => content.type === "images")
                          .options.map((opt) => (
                            <AccordionItem
                              ref={(el) => (itemRefs.current[opt.id] = el)}
                              key={opt.id}
                              value={opt.id}
                            >
                              <SortableItem
                                key={opt.id}
                                item={opt}
                                setCurrentComponent={setCurrentComponent}
                                selectedComponent={selectedComponent}
                                setEditItem={setEditItem}
                              />
                              <AccordionContent className="bg-white p-2 rounded-b-lg  ">
                                <div className="flex flex-col gap-y-3">
                                  <div className="my-2 flex flex-col gap-y-3">
                                    <ImageUploader
                                      label="Image"
                                      handleFileUpload={() =>
                                        onChangeFileUpload(opt.id)
                                      }
                                      image={opt.image}
                                    />

                                    <TargetOptions
                                      content={item}
                                      handleComponentChange={
                                        handleComponentChange
                                      }
                                    />
                                  </div>
                                  <div className="flex justify-end text-muted-foreground">
                                    <Button
                                      onClick={() => handleCloseEdit(opt.id)}
                                      variant="ghost"
                                    >
                                      <MdClose />
                                    </Button>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                      </>
                    ) : (
                      <p className="text-center my-3">Not Found</p>
                    )}
                  </div>

                  <Button onClick={handleAddImage} className="w-full my-5">
                    Add Image
                  </Button>

                  {/* {children} */}
                </Accordion>
              </SortableContext>
            </DndContext>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditorImagesFooter;
