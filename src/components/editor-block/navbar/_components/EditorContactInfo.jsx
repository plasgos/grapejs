import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateId } from "@/lib/utils";
import { produce } from "immer";
import RangeInputSlider from "../../_components/RangeInputSlider";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

import { Plus } from "lucide-react";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import IconPicker from "../../_components/IconPicker";
import DraggableListNested from "./DraggableListNested";
import { MdOutlineMailOutline } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

const infoOptions = [
  {
    label: "Address",
    icon: <FaMapMarkerAlt />,
    value: "Jl Sudirman 31 Jakarta Selatan",
  },
  { label: "Phone Number", icon: <IoCall />, value: "(021) 2248 1664" },
  {
    label: "Email",
    icon: <MdOutlineMailOutline />,
    value: "costumer.care@plasgos.co.id",
  },
  {
    label: "whatsapp",
    icon: <FaWhatsapp />,
    value: "0853-1111-1010",
  },
];

const EditorContactInfo = ({
  item,
  handleComponentChange,
  selectedComponent,
  setCurrentComponent,
}) => {
  const [isOpenFields, setisOpenFields] = useState(false);

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

  const handleChangeItemValue = (optId, key, value) => {
    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === item.id
        );

        if (content) {
          content.options = content.options.map((opt) =>
            opt.id === optId
              ? {
                  ...opt,
                  [key]: value,
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

  const handleAddInfo = (field) => {
    const currentComponent = selectedComponent.get("customComponent");
    if (!currentComponent) return;

    setEditItem("");

    const newId = generateId();

    const newInfo = {
      id: newId,
      ...field,
    };

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === item.id
        );

        if (content) {
          content.options = [...content.options, newInfo];
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

  const handleSelectIcon = (key, value) => {
    handleComponentChange(`contents.${item.id}.iconHeading.${key}`, value);
  };

  const renderContents = (contentItem) => {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="space-y-2">
          <Label>Value</Label>

          {contentItem.label === "Address" ? (
            <Textarea
              value={contentItem?.value || ""}
              onChange={(e) =>
                handleChangeItemValue(contentItem.id, "value", e.target.value)
              }
            />
          ) : (
            <Input
              value={contentItem?.value || ""}
              onChange={(e) =>
                handleChangeItemValue(contentItem.id, "value", e.target.value)
              }
            />
          )}
        </div>
      </div>
    );
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
        value={item.iconHeading}
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

            {item.type === "images" ? "Customize Images" : "Customize Lists"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 w-[350px] bg-secondary">
          <p className="pb-3 mb-3 px-5 border-b ">List Info</p>

          <div className="h-auto max-h-[450px] overflow-y-auto p px-5">
            <DraggableListNested
              item={item}
              renderContents={(value) => renderContents(value)}
              setCurrentComponent={setCurrentComponent}
              editItem={editItem}
              selectedComponent={selectedComponent}
              setEditItem={setEditItem}
            >
              {/* <Button
                onClick={handleAddInfo}
                variant="outline"
                className="my-3 w-full"
              >
                Add Image <Plus />
              </Button> */}

              <Popover open={isOpenFields} onOpenChange={setisOpenFields}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="my-3 w-full">
                    Add Field <Plus />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[310px]">
                  <div className="grid grid-cols-3 gap-3">
                    {infoOptions.map((field, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border flex flex-col items-center justify-center gap-y-1 cursor-pointer hover:border-black"
                        onClick={() => {
                          handleAddInfo(field);
                          setisOpenFields(false);
                        }}
                      >
                        {field.icon}
                        <p className="text-xs whitespace-nowrap">
                          {field.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </DraggableListNested>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditorContactInfo;
