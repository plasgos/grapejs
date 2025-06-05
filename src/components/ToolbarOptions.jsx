import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { setEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { useEffect, useMemo, useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { HiAdjustments } from "react-icons/hi";
import { MdDeblur } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import { FaTrashAlt } from "react-icons/fa";
import { FaPenToSquare, FaRegCopy } from "react-icons/fa6";
import { FiMove } from "react-icons/fi";

const ToolbarOptions = ({ editor }) => {
  const { editComponent, isDraggingComponent } = useSelector(
    (state) => state.landingPage
  );

  const dispatch = useDispatch();

  const [editElement, setEditElement] = useState("");
  console.log("🚀 ~ ToolbarOptions ~ editElement:", editElement);

  const handleRemove = () => {
    if (editElement == "text-element") {
      return;
    } else {
      editor.runCommand("core:component-delete");
    }
  };

  const items = [
    {
      icon: <FaPenToSquare />,
      tooltip: "Edit Component",
      onClick: () => {
        const selectedComponent = editor.getSelected()?.attributes?.blockLabel;
        dispatch(setEditComponent(selectedComponent));
      },
    },
    {
      icon: <FiMove />,
      tooltip: "Move",
      onClick: () => editor.runCommand("tlb-move"),
    },
    {
      icon: <FaRegCopy />,
      tooltip: "Copy",
      onClick: () => editor.runCommand("custom-copy"),
    },
    {
      icon: <FaTrashAlt />,
      tooltip: "Delete",
      onClick: () => handleRemove(),
    },
  ];

  const component = editor?.getSelected()?.get("customComponent");

  const isEditableTransition = !!(component && "animation" in component);
  const isEditableStyles = !!(component && "wrapperStyle" in component);
  const isEditableBackground = !!(component && "background" in component);

  const tabs = useMemo(() => {
    return [
      {
        label: "Content",
        value: "content",
        icon: <TbEdit size={20} />,
        isEditable: true,
      },
      {
        label: "Styles",
        value: "styles",
        icon: <HiAdjustments size={20} />,
        isEditable: isEditableStyles,
      },
      {
        label: "Transition",
        value: "transition",
        icon: <MdDeblur size={20} />,
        isEditable: isEditableTransition,
      },
      {
        label: "Background",
        value: "background",
        icon: <BsImageAlt size={18} />,
        isEditable: isEditableBackground,
      },
    ];
  }, [isEditableBackground, isEditableStyles, isEditableTransition]);

  const filteredTabs = tabs.filter((tab) => tab.isEditable);

  useEffect(() => {
    if (editor) {
      editor.on("component:selected", () => {
        dispatch(setEditComponent(""));
      });
    }
  }, [dispatch, editor]);

  const monitoredTypes = ["text-element", "image-element"];

  let updateTimeout;
  editor.on("component:update", (component) => {
    const type = component.get("type");
    if (monitoredTypes.includes(type)) {
      setEditElement(type);

      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        setEditElement("");
      }, 500);
    }
  });

  return (
    <>
      <div className="sticky w-max ml-auto  m-[15px] top-5 right-5  z-[9999]">
        {/* {editComponent ? (
          <Popover open={editComponent}>
            <PopoverTrigger className="invisible">Open</PopoverTrigger>
            <PopoverContent className="relative -left-10 w-96 p-0 rounded-lg">
              <div className="sticky top-0 z-10 bg-white border-b p-3 flex justify-between items-center rounded-t-lg">
                <h3 className="text-xl font-semibold">{editComponent}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(setEditComponent(""))}
                  className="text-xs"
                >
                  <MdClose className="scale-125" />
                </Button>
              </div>

              <div className="h-[500px] bg-[#FEEBDB]  overflow-y-auto  space-y-2">
                <Tabs
                  onValueChange={(value) => setActiveTab(value)}
                  defaultValue={activeTab}
                >
                  <TabsList className="bg-white">
                    {filteredTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        className="w-full p-0 data-[state=active]:border-orange-400 data-[state=active]:border-b-[3px] data-[state=active]:text-orange-400"
                        value={tab.value}
                      >
                        <div className="flex flex-col  items-center pt-3">
                          <div
                            className={`flex justify-center items-center rounded-full ${
                              activeTab === tab.value
                                ? "bg-[#FF8E29] text-[#FFF4EA]"
                                : "bg-muted"
                            } p-2`}
                          >
                            {tab.icon}
                          </div>
                          <p className="font-semibold text-sm my-2">
                            {tab.label}
                          </p>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <div className=" bg-[#FEEBDB]">
                    <ComponentStyleEditor
                      editor={editor}
                      selectedComponent={editor?.getSelected()}
                    />
                  </div>
                </Tabs>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex space-x-2 bg-white border rounded-xl shadow p-1 w-fit">
            {items.map(({ icon, tooltip, onClick }) => (
              <TooltipProvider key={icon} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={onClick}
                      className="w-7 h-7 hover:bg-orange-200"
                      variant="ghost"
                    >
                      {createElement(Icons[icon], { size: 12 })}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-sm">{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        )} */}

        {!editComponent && !editElement ? (
          <div className="flex space-x-2 bg-white border rounded-xl shadow p-1 w-fit">
            {items.map(({ icon, tooltip, onClick }) => (
              <TooltipProvider key={tooltip} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={onClick}
                      className="w-7 h-7 hover:bg-orange-200"
                      variant="ghost"
                    >
                      {icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-sm">{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ToolbarOptions;
