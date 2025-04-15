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
import IconPicker from "../../_components/IconPicker";
import TargetOptionsNested from "../../_components/TargetOptionsNested";
import DraggableListNested from "./DraggableListNested";

const EditorGroupLink = ({
  item,
  handleComponentChange,
  selectedComponent,
  setCurrentComponent,
}) => {
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

  const handleAddImage = () => {
    const currentComponent = selectedComponent.get("customComponent");
    if (!currentComponent) return;

    setEditItem("");

    const newId = generateId();

    const newContent = {
      id: newId,
      label: "New Link",
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
          (content) => content.id === item.id
        );

        if (content) {
          content.options = [...content.options, newContent];
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

  const handleChangeNestedTargetValue = (optId, value) => {
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
                  target: value,
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

  const handleSelectIcon = (key, value) => {
    handleComponentChange(`contents.${item.id}.iconHeading.${key}`, value);
  };

  const renderContents = (contentItem) => {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="my-2 flex flex-col gap-y-3">
          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              value={contentItem?.label || ""}
              onChange={(e) =>
                handleChangeItemValue(contentItem.id, "label", e.target.value)
              }
            />
          </div>

          <TargetOptionsNested
            option={contentItem}
            handleChangeNestedTargetValue={handleChangeNestedTargetValue}
            handleComponentChange={handleComponentChange}
          />
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
          <p className="pb-3 mb-3 px-5 border-b ">List Images</p>

          <div className="h-auto max-h-[450px] overflow-y-auto p px-5">
            <DraggableListNested
              label="List Images"
              item={item}
              renderContents={(value) => renderContents(value)}
              setCurrentComponent={setCurrentComponent}
              editItem={editItem}
              selectedComponent={selectedComponent}
              setEditItem={setEditItem}
            >
              <Button
                onClick={handleAddImage}
                variant="outline"
                className="my-3 w-full"
              >
                Add Image <Plus />
              </Button>
            </DraggableListNested>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditorGroupLink;
