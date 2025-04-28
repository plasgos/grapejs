import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlocksProvider } from "@grapesjs/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

import { FaGlobe } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useSelector } from "react-redux";

import CustomBlockManager from "./CustomBlockProvider";
import { Input } from "../../ui/input";
import GlobalStyles from "./GlobalStyles";
import useWindowWidth from "@/hooks/useWindowWidth";

const ExpandedView = ({
  searchBlock,
  handleSearchChange,
  selectedComponent,
  activeTab,
  setActiveTab,
}) => {
  const { isEditComponent, sidebarWidth } = useSelector(
    (state) => state.landingPage
  );

  const windowWidth = useWindowWidth();

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="w-full"
      orientation="vertical"
    >
      {/* Top Bar */}
      <div className={`sticky top-0 z-10 bg-white shadow `}>
        <TabsList
          className={`w-full ${
            sidebarWidth <= 25 && windowWidth <= 768
              ? "flex flex-col gap-y-1"
              : ""
          }   ${
            !isEditComponent || selectedComponent?.get("type") === "wrapper"
              ? ""
              : "hidden"
          }`}
        >
          <TabsTrigger
            className="w-full data-[state=inactive]:bg-[#EFF3F4] rounded-bl-xl "
            value="components"
          >
            <div className="flex  gap-x-2">
              <IoGrid className="" size={20} />
              <p>Components</p>
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="w-full data-[state=inactive]:bg-[#EFF3F4]  rounded-bl-xl"
            value="styles"
          >
            <div className="flex  gap-x-2">
              <FaGlobe className="" size={20} />
              <p> Global Styles</p>
            </div>
          </TabsTrigger>
        </TabsList>

        {(!isEditComponent || selectedComponent?.get("type") === "wrapper") &&
          activeTab === "components" && (
            <div className="relative  p-5 ">
              <Input
                value={searchBlock || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="rounded-full  pr-10"
                placeholder="Search..."
              />

              <div className="absolute top-[30px] right-10 z-10 ">
                <HiMagnifyingGlass className="text-slate-400" />
              </div>
            </div>
          )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1  overflow-y-auto  space-y-4 bg-[#FEEBDB]">
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
          <GlobalStyles selectedComponent={selectedComponent} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ExpandedView;
