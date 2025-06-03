import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditor } from "@grapesjs/react";
import { IoCopyOutline } from "react-icons/io5";
import { RxDragHandleDots2 } from "react-icons/rx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cx } from "class-variance-authority";
import { cloneElement } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { PiTargetBold } from "react-icons/pi";
import { useReducer } from "react";
import { useEffect } from "react";
import { MdOutlineFilterCenterFocus } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  setEditComponent,
  setIsDraggingComponent,
} from "@/redux/modules/landing-page/landingPageSlice";
import { useSelector } from "react-redux";

const SortableItem = ({ item, isFloatingComponent }) => {
  const editor = useEditor();
  const { editComponent } = useSelector((state) => state.landingPage);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.getId(),

    disabled: isFloatingComponent,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSelect = () => {
    if (item) {
      // Pilih komponen tertentu yang dimaksud
      editor.select(item);
      // Mendapatkan elemen DOM dari komponen yang dipilih
      const selectedElement = item.view.el;
      if (selectedElement) {
        // Scroll otomatis ke elemen yang dipilih
        selectedElement.scrollIntoView({
          behavior: "smooth", // Menggunakan smooth scroll
          block: "center", // Menempatkan elemen di tengah layar
        });
      }
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDragging && !!editComponent) {
      dispatch(setEditComponent(""));
    }
  }, [dispatch, editComponent, isDragging]);

  useEffect(() => {
    dispatch(setIsDraggingComponent(isDragging));
  }, [dispatch, isDragging]);

  const handleDelete = () => {
    if (item) {
      item.remove();
      const wrapper = editor.getWrapper();
      editor.select(wrapper);
    }
  };

  const handleCopy = () => {
    if (item) {
      const clonedComponent = item.clone(); // Clone the component

      const parent = item.parent();

      if (parent) {
        // Find the index of the original component within the parent container
        const components = parent.get("components");
        const currentIndex = components.indexOf(item); // Find index of the original component

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
      action: "Focus",
      command: handleSelect,
      icon: <MdOutlineFilterCenterFocus />,
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

  const itHasScrollTarget = item?.attributes?.customComponent?.scrollTarget;

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
      style={style}
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
            {`( ${item?.attributes?.customComponent?.scrollTarget?.value} )`}
            <PiTargetBold />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between relative">
        <div className="pl-5 flex items-center gap-x-2">
          {cloneElement(item?.attributes?.blockIcon, { size: 24 })}
          <div className=" font-semibold text-sm">
            <p>{item?.attributes?.blockLabel}</p>
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
  editor,
  components,
  handleReorder,
  isFloatingComponent,
}) => {
  const dispatch = useDispatch();

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        if (!isFloatingComponent) {
          handleReorder(event, editor, isFloatingComponent);

          // dispatch(setIsDraggingComponent(true));
        }
      }}
    >
      <SortableContext
        items={components.map((child) => child.getId())}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-y-3">
          {components.length > 0 ? (
            components.map((item) => (
              <SortableItem
                key={item.getId()}
                item={item}
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

const SortComponent = () => {
  const editor = useEditor();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const update = () => forceUpdate();
    editor.on("component:add", update);
    editor.on("component:remove", update);
    editor.on("component:clone", update);
    editor.on("component:update", update);

    return () => {
      editor.off("component:add", update);
      editor.off("component:remove", update);
      editor.off("component:clone", update);
      editor.off("component:update", update);
    };
  }, [editor]);

  const components = editor.getComponents()?.models;
  const handleReorder = (event, editor, isFloatingComponent) => {
    if (isFloatingComponent) {
      return;
    }

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = components.findIndex((c) => c.getId() === active.id);
    const newIndex = components.findIndex((c) => c.getId() === over.id);

    // Swap posisi di array
    const updatedComponents = [...components];
    const movedComponent = updatedComponents.splice(oldIndex, 1)[0];

    // Update order di dalam GrapesJS

    const componentToMove = movedComponent;

    editor.select(componentToMove);
    const parent = componentToMove.parent();

    if (parent) {
      parent.append(movedComponent, { at: newIndex });
    }
  };

  const mainComponents = components.filter(
    (comp) => !comp?.get("category")?.toLowerCase().includes("floating")
  );

  const floatingComponents = components.filter((comp) =>
    comp?.get("category")?.toLowerCase().includes("floating")
  );

  return (
    <>
      <Tabs defaultValue="components" className="w-full">
        <TabsList>
          <TabsTrigger
            className="w-full data-[state=active]:border-orange-400 data-[state=active]:border-b-[3px] data-[state=active]:text-orange-400"
            value="components"
          >
            Components
          </TabsTrigger>
          <TabsTrigger
            className="w-full data-[state=active]:border-orange-400 data-[state=active]:border-b-[3px] data-[state=active]:text-orange-400"
            value="Floating Components"
          >
            Floating Components
          </TabsTrigger>
        </TabsList>
        <TabsContent value="components">
          <div className="p-3 h-[85vh] overflow-y-auto overflow-x-hidden max-w-full">
            <Navigator
              editor={editor}
              components={mainComponents}
              handleReorder={handleReorder}
            />
          </div>
        </TabsContent>
        <TabsContent value="Floating Components">
          <div className="p-3 h-[93vh]  overflow-y-auto overflow-x-hidden max-w-full">
            <Navigator
              editor={editor}
              components={floatingComponents}
              handleReorder={handleReorder}
              isFloatingComponent
            />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SortComponent;
