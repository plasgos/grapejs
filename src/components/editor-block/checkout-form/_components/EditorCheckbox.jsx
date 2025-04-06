import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { produce } from "immer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/utils";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import SelectOptions from "../../_components/SelectOptions";
import RangeInputSlider from "../../_components/RangeInputSlider";

const layoutOptions = [
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
];

const SortableItem = ({
  item,
  array,
  contentId,
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
    if (array.length === 1) {
      return;
    }

    const removeItemFromComponent = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === contentId
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
        <div className="flex gap-x-3  items-center">
          {item.image ? (
            <img
              src={item.image}
              alt="item-img"
              className="object-cover w-16 max-h-11 "
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
                    disabled={
                      navigate.action === "Remove" && array.length === 1
                    }
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

const EditorCheckbox = ({
  item,
  handleComponentChange,
  selectedComponent,
  setCurrentComponent,
}) => {
  const [editItem, setEditItem] = useState(false);

  const itemRefs = useRef({});

  const handleChangeCustomField = (id, value) => {
    const formattedValue = value.toLowerCase().replace(/\s+/g, "-");

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === item.id
        );

        if (content) {
          content.options = content.options.map((checkbox) =>
            checkbox.id === id
              ? {
                  ...checkbox,
                  value: formattedValue,
                  label: value,
                }
              : checkbox
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

    const { options } = item;

    const oldIndex = options.findIndex((item) => item.id === active.id);
    const newIndex = options.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newOptions = arrayMove(options, oldIndex, newIndex);

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === item.id
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

  const handleAddCheckbox = () => {
    const currentComponent = selectedComponent.get("customComponent");
    if (!currentComponent) return;

    setEditItem("");

    const checkboxContent = currentComponent.contents.find(
      (content) => content.id === item.id
    );

    const { options } = checkboxContent;

    const checkboxLength = options.length + 1;

    const newId = generateId();

    const newCheckbox = {
      id: newId,
      value: `option${checkboxLength}`,
      label: `Option ${checkboxLength}`,
    };

    const updateField = (component) => {
      return produce(component, (draft) => {
        const content = draft.contents.find(
          (content) => content.id === item.id
        );

        if (content) {
          content.options = [...content.options, newCheckbox];
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

  return (
    <div className="my-2 flex flex-col gap-y-3">
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={item?.labelField || ""}
          onChange={(e) =>
            handleComponentChange(
              `contents.${item.id}.labelField`,
              e.target.value
            )
          }
        />
      </div>

      {item.type === "checkbox" && (
        <>
          <div className="flex justify-between items-center my-2">
            <Label>Multiple Select</Label>
            <Switch
              checked={item?.isMultipleSelect}
              onCheckedChange={(checked) =>
                handleComponentChange(
                  `contents.${item.id}.isMultipleSelect`,
                  checked
                )
              }
            />
          </div>

          <SelectOptions
            asChild
            options={layoutOptions}
            label="Layout"
            value={item?.layout}
            onChange={(value) =>
              handleComponentChange(`contents.${item.id}.layout`, value)
            }
          />
        </>
      )}

      {item.type === "dropdown-menu" && (
        <>
          <div className="space-y-2">
            <Label>Select Placeholder</Label>
            <Input
              value={item?.placeholder || ""}
              onChange={(e) =>
                handleComponentChange(
                  `contents.${item.id}.placeholder`,
                  e.target.value
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Search Placeholder</Label>
            <Input
              value={item?.searchPlaceholder || ""}
              onChange={(e) =>
                handleComponentChange(
                  `contents.${item.id}.searchPlaceholder`,
                  e.target.value
                )
              }
            />
          </div>

          <RangeInputSlider
            asChild
            label="Width"
            value={item?.width}
            onChange={(value) =>
              handleComponentChange(`contents.${item.id}.width`, value)
            }
            min={100}
            max={1200}
          />
        </>
      )}

      <div className="flex justify-between items-center my-2">
        <Label>Required</Label>
        <Switch
          checked={item?.isRequired}
          onCheckedChange={(checked) =>
            handleComponentChange(`contents.${item.id}.isRequired`, checked)
          }
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <HiMiniAdjustmentsHorizontal />

            {item.type === "checkbox"
              ? "Customize Checkboxes"
              : "Customize Menu"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0">
          <p className="pb-3 mb-3 px-5 border-b ">List Options</p>

          <div className="h-auto max-h-[350px] overflow-y-auto p px-5">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={() => setEditItem("")}
            >
              <SortableContext
                items={item.options}
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
                    {item.options.map((contentItem, _, array) => (
                      <AccordionItem
                        ref={(el) => (itemRefs.current[contentItem.id] = el)}
                        key={contentItem.id}
                        value={contentItem.id}
                      >
                        <SortableItem
                          key={contentItem.id}
                          item={contentItem}
                          array={array}
                          contentId={item.id}
                          setCurrentComponent={setCurrentComponent}
                          selectedComponent={selectedComponent}
                          setEditItem={setEditItem}
                        />
                        <AccordionContent className="bg-white p-2 rounded-b-lg  ">
                          <div className="flex flex-col gap-y-3">
                            <div className="my-2 flex flex-col gap-y-3">
                              <div className="space-y-2">
                                <Label>Label</Label>
                                <Input
                                  value={contentItem?.label || ""}
                                  onChange={(e) =>
                                    handleChangeCustomField(
                                      contentItem.id,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="flex justify-end text-muted-foreground">
                              <Button
                                onClick={() => handleCloseEdit(item.id)}
                                variant="ghost"
                              >
                                <MdClose />
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </div>

                  <Button onClick={handleAddCheckbox} className="w-full my-5">
                    Add Checkbox
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

export default EditorCheckbox;
