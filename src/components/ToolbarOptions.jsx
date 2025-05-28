import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { createElement, useEffect, useMemo, useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import * as Icons from "react-icons/fa6";
import { HiAdjustments } from "react-icons/hi";
import { MdClose, MdDeblur } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import ComponentStyleEditor from "./sidebar/_components/ComponentStyleEditor";

const ToolbarOptions = ({ editor }) => {
  const [editComponent, setEditComponent] = useState("");
  const [activeTab, setActiveTab] = useState("content");

  const items = [
    {
      icon: "FaPenToSquare",
      tooltip: "Edit Component",
      onClick: () => {
        // editor.runCommand("custom-edit")

        const selectedComponent = editor.getSelected()?.attributes?.blockLabel;
        setEditComponent(selectedComponent);
      },
    },
    {
      icon: "FaRegCopy",
      tooltip: "Copy",
      onClick: () => editor.runCommand("custom-copy"),
    },
    {
      icon: "FaTrashCan",
      tooltip: "Delete",
      onClick: () => editor.runCommand("core:component-delete"),
    },
  ];

  const component = editor?.getSelected()?.get("customComponent");

  const isEditableTransition = "animation" in component;
  const isEditableStyles = "wrapperStyle" in component;
  const isEditableBackground = "background" in component;

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
        setEditComponent("");
      });
    }
  }, [editor]);

  return (
    <div className="absolute right-3 top-3 z-[9999]">
      {editComponent ? (
        <Popover open={editComponent}>
          <PopoverTrigger className="invisible">Open</PopoverTrigger>
          <PopoverContent className="relative -left-10 w-96 p-0 rounded-lg">
            {/* Header (Sticky) */}
            <div className="sticky top-0 z-10 bg-white border-b p-3 flex justify-between items-center rounded-t-lg">
              <h3 className="text-xl font-semibold">{editComponent}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditComponent("")}
                className="text-xs"
              >
                <MdClose className="scale-125" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[500px] overflow-y-auto p-1 space-y-2">
              <Tabs
                onValueChange={(value) => setActiveTab(value)}
                defaultValue={activeTab}
              >
                <TabsList className="">
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

                <div className="bg-[#FEEBDB]">
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
      )}
    </div>
  );
};

export default ToolbarOptions;
