import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditor } from "@grapesjs/react";
import { useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaTrashAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { setIsEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { cloneElement } from "react";
import { cx } from "class-variance-authority";
import { PiTargetBold } from "react-icons/pi";

const SortableItem = ({ item, setIsDragging, isFloatingComponent }) => {
  const editor = useEditor();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, disabled: isFloatingComponent });

  const dispatch = useDispatch();

  useEffect(() => {
    setIsDragging(isDragging);
  }, [isDragging, setIsDragging]);

  const handleSelect = () => {
    if (item?.model) {
      // Pilih komponen tertentu yang dimaksud
      editor.select(item.model);

      // Mendapatkan elemen DOM dari komponen yang dipilih
      const selectedElement = item.model.view.el;

      if (selectedElement) {
        // Scroll otomatis ke elemen yang dipilih
        selectedElement.scrollIntoView({
          behavior: "smooth", // Menggunakan smooth scroll
          block: "center", // Menempatkan elemen di tengah layar
        });
      }
      dispatch(setIsEditComponent(true));
    }
  };

  const handleDelete = () => {
    if (item?.model) {
      item.model.remove();
      const wrapper = editor.getWrapper();
      editor.select(wrapper);
    }
  };

  const handleCopy = () => {
    if (item?.model) {
      const clonedComponent = item.model.clone(); // Clone the component

      const parent = item.model.parent();

      if (parent) {
        // Find the index of the original component within the parent container
        const components = parent.get("components");
        const currentIndex = components.indexOf(item.model); // Find index of the original component

        // Append the cloned component right after the original component
        parent.append(clonedComponent, { at: currentIndex + 1 });
      }

      // Select the cloned component
      editor.select(clonedComponent);

      // Get the DOM element of the cloned component
      const clonedElement = clonedComponent.view.el;

      // Scroll the page to the cloned component
      if (clonedElement) {
        clonedElement.scrollIntoView({
          behavior: "smooth", // Smooth scroll
          block: "center", // Scroll to the center of the screen
        });
      }
    }
  };

  const commandNavigation = [
    {
      action: "Edit",
      command: handleSelect,
      icon: <LuPencilLine />,
      isDisable: false,
    },
    {
      action: "Copy",
      command: handleCopy,
      icon: <IoCopyOutline />,
      isDisable: isFloatingComponent ? true : false,
    },
    {
      action: "Remove",
      command: handleDelete,
      icon: <FaTrashAlt color="red" />,
      isDisable: false,
    },
  ];

  const itHasScrollTarget = item.model.attributes.customComponent.scrollTarget;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cx(
        "relative p-4 bg-white shadow rounded-xl",
        isDragging ? "z-20 bg-purple-200 ring-2 ring-purple-700" : "",
        isFloatingComponent ? "cursor-not-allowed" : "cursor-move "
      )}
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

      {!!itHasScrollTarget && (
        <div className=" rounded-b-lg px-2 border absolute top-0 left-7 bg-yellow-300 ">
          <div className=" text-xs text-muted-foreground font-semibold flex items-center gap-x-1">
            Scroll Target{" "}
            {`( ${item.model.attributes.customComponent.scrollTarget.value} )`}
            <PiTargetBold />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between relative">
        <div className="pl-5 flex items-center gap-x-2">
          {cloneElement(item.model.attributes.blockIcon, { size: 24 })}
          <div className=" font-semibold text-sm">
            <p>{item.model?.attributes?.blockLabel}</p>
          </div>
        </div>

        <div className="flex gap-x-1">
          {commandNavigation
            .filter((naviagtions) => !naviagtions.isDisable)
            .map((navigate) => (
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

const Navigator = ({
  components,
  onReorder,
  setIsDragging,
  isFloatingComponent,
}) => {
  const editor = useEditor();

  const handleDragStart = (event) => {
    const { active } = event;
    const component = editor
      .getComponents()
      .find((cmp) => cmp.getId() === active.id);
    if (component) {
      component.set("isDragging", true);
    }
  };

  const handleDragEnd = (event) => {
    const { active } = event;
    const component = editor
      .getComponents()
      .find((cmp) => cmp.getId() === active.id);
    if (component) {
      component.set("isDragging", false);
      editor.select(component);

      const movedElement = component.view.el;

      // Scroll the page to the moved component
      if (movedElement) {
        setTimeout(() => {
          movedElement.scrollIntoView({
            behavior: "smooth", // Smooth scroll
            block: "center", // Scroll to the center of the screen
            inline: "nearest",
          });
        }, 100);
      }
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        if (!isFloatingComponent) {
          handleDragStart(event);
        }
      }}
      onDragEnd={(event) => {
        if (!isFloatingComponent) {
          handleDragEnd(event);
        }
      }}
      onDragOver={(event) => {
        if (!isFloatingComponent) {
          onReorder(event, editor, isFloatingComponent);
        }
      }}
    >
      <SortableContext
        items={components}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-y-3">
          {components.length > 0 ? (
            components.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                setIsDragging={setIsDragging}
                isFloatingComponent={isFloatingComponent}
              />
            ))
          ) : (
            <>
              <p className="text-sm text-center">Components Empty!</p>
            </>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Navigator;
