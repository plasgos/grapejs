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
import { Label } from "@/components/ui/label";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";

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
          content.options = content.options.filter((opt) => opt.id !== item.id);
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

          <div className=" font-semibold text-sm  max-w-44">
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

const DraggableListNested = ({
  children,
  label,
  item,
  selectedComponent,
  setCurrentComponent,
  setEditItem,
  editItem,
  renderContents,
}) => {
  const itemRefs = useRef({}); // Ref untuk setiap item

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
      (content) => content.id === item.id
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

  const handleCloseEdit = (id) => {
    setEditItem("");
    // const currentComponent = selectedComponent?.get("customComponent");

    // const updatedComponent = produce(currentComponent, (draft) => {
    //   draft[path].forEach((content) => {
    //     if (content.id === id) {
    //       content.isFocused = false;
    //     }
    //   });
    // });

    // selectedComponent?.set("customComponent", updatedComponent);
  };

  return (
    <div className="flex flex-col gap-y-5    bg-white p-2 rounded-lg">
      {label && <Label className="text-base">{label}</Label>}
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
                        {renderContents(contentItem)}
                      </div>
                      <div className="flex justify-end text-muted-foreground">
                        <Button
                          onClick={() => handleCloseEdit(contentItem.id)}
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

            {children}
          </Accordion>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DraggableListNested;
