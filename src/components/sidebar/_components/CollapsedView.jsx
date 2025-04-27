import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlocksProvider } from "@grapesjs/react";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";

import { FaGlobe } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import GlobalStyles from "./GlobalStyles";

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

import CustomBlockManager from "./CustomBlockProvider";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import { motion } from "framer-motion";

const CollapsedView = ({
  searchBlock,
  handleSearchChange,
  selectedComponent,
  activeTab,
  setActiveTab,
}) => {
  const { isEditComponent } = useSelector((state) => state.landingPage);

  const [isOpenGlobalSettingCollapsed, setIsOpenGlobalSettingCollapsed] =
    useState(false);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="w-full"
      orientation="vertical"
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white shadow ">
        <TooltipProvider delayDuration={100}>
          <TabsList
            className={`w-full flex flex-col gap-y-2  ${
              !isEditComponent || selectedComponent?.get("type") === "wrapper"
                ? ""
                : "hidden"
            }`}
          >
            <TabsTrigger
              className="w-full data-[state=inactive]:bg-[#EFF3F4]  "
              value="components"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex  gap-x-2">
                    <IoGrid className="" size={20} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Components</p>
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>

            <TabsTrigger
              onClick={() => setIsOpenGlobalSettingCollapsed(true)}
              className="w-full data-[state=inactive]:bg-[#EFF3F4]  "
              value="styles"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex  gap-x-2">
                    <FaGlobe className="" size={20} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Global Styles</p>
                </TooltipContent>
              </Tooltip>
            </TabsTrigger>
          </TabsList>
        </TooltipProvider>

        <div className="flex justify-center p-0.5">
          {(!isEditComponent || selectedComponent?.get("type") === "wrapper") &&
            activeTab === "components" && (
              <Popover>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <Button className="" variant="ghost ">
                          <HiMagnifyingGlass className="text-slate-400" />
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Search</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <PopoverContent side="right" className="relative -right-6">
                  <div className="relative   ">
                    <Input
                      value={searchBlock || ""}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="rounded-full  pr-10"
                      placeholder="Search..."
                    />

                    <div className="absolute top-[10px] right-5 z-10 ">
                      <HiMagnifyingGlass className="text-slate-400" />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
        </div>
      </div>

      {/* Scrollable Content */}
      <motion.div
        layout
        className="flex-1  overflow-y-auto  space-y-4 bg-[#FEEBDB]"
      >
        <TabsContent
          style={{
            height: "calc(100vh - 245px)",
          }}
          className="data-[state=inactive]:bg-[#EFF3F4] bg-[#FEEBDB] !m-0"
          value="components"
        >
          <BlocksProvider>
            {(props) => (
              <CustomBlockManager {...props} searchBlock={searchBlock} />
            )}
          </BlocksProvider>
        </TabsContent>

        <TabsContent
          style={{
            height: "calc(100vh - 150px)",
          }}
          className="bg-[#FEEBDB]  m-0 p-4"
          value="styles"
        >
          <Popover
            defaultOpen={true}
            open={isOpenGlobalSettingCollapsed}
            onOpenChange={setIsOpenGlobalSettingCollapsed}
          >
            <PopoverTrigger className="invisible">open</PopoverTrigger>
            <PopoverContent className="relative -right-3 -top-8 p-0">
              <GlobalStyles selectedComponent={selectedComponent} />
            </PopoverContent>
          </Popover>
        </TabsContent>
      </motion.div>
    </Tabs>
  );
};

export default CollapsedView;
