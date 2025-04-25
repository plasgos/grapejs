import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { HiAdjustments } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { MdDeblur } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../../ui/button";
import { IoGrid } from "react-icons/io5";
import ComponentStyleEditor from "./ComponentStyleEditor";
import { useMemo } from "react";

const EditorBlockComponents = ({
  isEditComponent,
  selectedComponent,
  handleCloseComponent,
}) => {
  const [activeTab, setActiveTab] = useState("content");

  const { disableTransition, disableStyles, disableBackground } =
    selectedComponent.get("customComponent").editorTabConfig || {};

  const tabs = useMemo(() => {
    return [
      { label: "Content", value: "content", icon: <TbEdit size={20} /> },
      {
        label: "Styles",
        value: "styles",
        icon: <HiAdjustments size={20} />,
        disabled: disableStyles,
      },
      {
        label: "Transition",
        value: "transition",
        icon: <MdDeblur size={20} />,
        disabled: disableTransition,
      },
      {
        label: "Background",
        value: "background",
        icon: <BsImageAlt size={18} />,
        disabled: disableBackground,
      },
    ];
  }, [disableBackground, disableStyles, disableTransition]);

  const filteredTabs = tabs.filter((tab) => !tab.disabled);

  return (
    <div
      style={{
        height: "calc(100vh - 125px)",
      }}
      className="flex flex-col"
    >
      <Tabs
        onValueChange={(value) => setActiveTab(value)}
        defaultValue={activeTab}
        className=""
      >
        <div className="sticky top-0  z-10 bg-white shadow  ">
          {isEditComponent && selectedComponent?.get("type") !== "wrapper" && (
            <div className=" flex items-center justify-between   border-b p-4 shadow-sm ">
              <p className="font-semibold">
                {selectedComponent?.get("blockLabel")}
              </p>

              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={handleCloseComponent} variant="ghost">
                      <IoGrid className=" cursor-pointer" size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Components</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <TabsList className="">
            {filteredTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                className="w-full p-0"
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
                  <p className="font-normal text-sm my-2">{tab.label}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div
          style={{
            height: "calc(100vh - 260px)",
          }}
          className="flex-1  overflow-y-auto  space-y-4 bg-[#FEEBDB] py-2 pb-5"
        >
          <ComponentStyleEditor selectedComponent={selectedComponent} />
        </div>
      </Tabs>
    </div>
  );
};

export default EditorBlockComponents;
