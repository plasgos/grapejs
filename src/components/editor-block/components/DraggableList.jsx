import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { produce } from "immer";

import { createElement } from "react";
import * as Icons from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaTrashAlt } from "react-icons/fa";
import { MdClose, MdOutlineFilterCenterFocus } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { useRef } from "react";
import { useEffect } from "react";

const SortableItem = ({
  item,
  setContents,
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
    // setEditItem((prev) => (prev ? "" : item.id));
    setEditItem(item.id);
    handleFocusItem();
  };

  const handleFocusItem = () => {
    const currentComponent = selectedComponent.get("customComponent");

    // Set isFocused = true untuk item yang diklik
    const updatedComponent = produce(currentComponent, (draft) => {
      draft.contents.forEach((content) => {
        content.isFocused = content.id === item.id; // Hanya aktifkan item yang diklik
      });
    });

    selectedComponent.set("customComponent", updatedComponent);

    // Atur timeout baru untuk mengembalikan isFocused ke false
    setTimeout(() => {
      selectedComponent.set(
        "customComponent",
        produce(updatedComponent, (draft) => {
          draft.contents.forEach((content) => {
            if (content.id === item.id) {
              content.isFocused = false; // Reset hanya untuk item yang diklik
            }
          });
        })
      );
    }, 1000);
  };

  const handleRemoveItem = () => {
    if (!selectedComponent) return;

    const currentComponent = selectedComponent.get("customComponent");
    if (!currentComponent) return;

    const newContents = currentComponent.contents?.filter(
      (content) => content.id !== item.id
    );

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.contents = newContents;
    });

    selectedComponent.set("customComponent", updatedComponent);

    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== item.id)
    );
  };

  const commandNavigation = [
    {
      action: "Select",
      command: handleFocusItem,
      icon: <MdOutlineFilterCenterFocus />,
    },
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
      className={`w-full   py-2 px-2 bg-white shadow cursor-move  rounded-xl relative ${
        isDragging ? "z-20 bg-purple-200 ring-2 ring-purple-700" : ""
      }`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div
        className={`absolute left-0 top-0 overflow-hidden w-5 h-full ${
          isDragging ? "bg-purple-500" : "bg-purple-300"
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

          {item.iconBtn.icon ? (
            <div>
              {createElement(Icons[item.iconBtn?.icon], {
                size: 24,
              })}
            </div>
          ) : null}

          <div className=" font-semibold text-sm  max-w-36">
            <p className="truncate">{item?.title}</p>
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

const DraggableList = ({
  children,
  contents,
  selectedComponent,
  setContents,
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

    // Buat salinan contents yang telah diurutkan
    const newContents = arrayMove(
      currentComponent.contents,
      currentComponent.contents.findIndex((item) => item.id === active.id),
      currentComponent.contents.findIndex((item) => item.id === over.id)
    ).map((content) => ({
      ...content,
      isFocused: content.id === active.id, // Item yang dipindahkan diberi fokus
    }));

    // Update state GrapesJS
    const updatedComponent = produce(currentComponent, (draft) => {
      draft.contents = newContents;
    });

    selectedComponent?.set("customComponent", updatedComponent);

    // Hapus fokus setelah 1 detik tanpa merusak urutan
    setTimeout(() => {
      selectedComponent?.set(
        "customComponent",
        produce(selectedComponent.get("customComponent"), (draft) => {
          draft.contents.forEach((content) => {
            content.isFocused = false;
          });
        })
      );
    }, 1000);

    setContents(newContents);
  };

  const handleCloseEdit = (id) => {
    setEditItem("");
    const currentComponent = selectedComponent?.get("customComponent");

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.contents.forEach((content) => {
        if (content.id === id) {
          content.isFocused = false;
        }
      });
    });

    selectedComponent?.set("customComponent", updatedComponent);
  };

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={() => setEditItem("")}
      >
        <SortableContext
          items={contents}
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
              {contents.length > 0 ? (
                contents.map((item) => (
                  <AccordionItem
                    ref={(el) => (itemRefs.current[item.id] = el)}
                    key={item.id}
                    value={item.id}
                  >
                    <SortableItem
                      key={item.id}
                      item={item}
                      setContents={setContents}
                      selectedComponent={selectedComponent}
                      setEditItem={setEditItem}
                    />
                    <AccordionContent className="bg-white p-2 rounded-b-lg  ">
                      <div className="flex flex-col gap-y-3">
                        {renderContents(item)}
                        <div className="flex justify-end mt-3 text-muted-foreground">
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
                ))
              ) : (
                <>
                  <p className="text-sm text-center">Item is Empty!</p>
                </>
              )}
            </div>

            {children}
          </Accordion>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DraggableList;
