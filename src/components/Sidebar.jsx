import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlocksProvider, useEditor } from "@grapesjs/react";
import { Save } from "lucide-react";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import ComponentStyleEditor from "./ComponentStyleEditor";
import CustomBlockManager from "./CustomBlockProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { injectExternalCSS } from "@/utils/injectExternalCSS";
import { CiExport, CiImport } from "react-icons/ci";
import { IoGrid, IoSettingsSharp } from "react-icons/io5";
import { handleAddWatermark, updateCanvasComponents } from "./MainWebEditor";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import GlobalStyles from "./GlobalStyles";
import { useEffect } from "react";
import { FaGlobe } from "react-icons/fa";

const Sidebar = ({
  selectedComponent,
  activeTab,
  setActiveTab,
  setCanvasComponents,
}) => {
  const editor = useEditor();
  const { toast } = useToast();

  const { isEditComponent } = useSelector((state) => state.landingPage);
  const dispatch = useDispatch();

  const [searchBlock, setSearchBlock] = useState("");

  const handleSearchChange = (value) => {
    setSearchBlock(value);
  };

  const handleCloseComponent = () => {
    dispatch(setIsEditComponent(false));
    const wrapper = editor.getWrapper();
    editor.select(wrapper);
  };

  const exportProjectAsFile = () => {
    const editorModel = editor.getModel();

    // Ambil data proyek
    const projectData = editor.getProjectData();
    console.log("🚀 ~ exportProjectAsFile ~ projectData:", projectData);

    // Tambahkan globalOptions ke data proyek
    projectData.globalOptions = editorModel.get("globalOptions");

    // Konversi data ke JSON
    const jsonString = JSON.stringify(projectData, null, 2);
    console.log("🚀 ~ exportProjectAsFile ~ jsonString:", jsonString);

    // Buat file untuk diunduh
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Simpan file dengan nama "grapesjs-project.json"
    const link = document.createElement("a");
    link.href = url;
    link.download = "grapesjs-project.json";
    link.click();

    // Bersihkan URL setelah download
    URL.revokeObjectURL(url);
  };

  const importProjectFromFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const projectData = JSON.parse(e.target.result);

          // Muat data proyek ke editor
          editor.loadProjectData(projectData);

          // Ambil globalOptions dari data proyek jika ada
          const editorModel = editor.getModel();
          if (projectData.globalOptions) {
            editorModel.set("globalOptions", projectData.globalOptions);
            console.log("Global Options loaded:", projectData.globalOptions);
          }
          handleAddWatermark(editor);

          injectExternalCSS(editor);

          updateCanvasComponents(editor, setCanvasComponents);

          // Tampilkan toast sukses
          toast({
            title: "Project imported successfully!",
            className: "bg-green-100 text-green-800 border border-green-300",
            duration: 2000,
          });
        } catch (error) {
          console.error("Import Error:", error);

          // Tampilkan toast error
          toast({
            title: "Invalid JSON format!",
            variant: "destructive",
            duration: 2000,
          });
        }
      };
      reader.readAsText(file);
    };

    input.click();
  };

  useEffect(() => {
    if (activeTab === "styles" && isEditComponent) {
      setActiveTab("components");
    }
  }, [activeTab, isEditComponent, setActiveTab]);

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 60px)",
        }}
        className="flex flex-col  "
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-10 bg-white shadow ">
            <TabsList
              className={`w-full  ${
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

            {isEditComponent &&
              selectedComponent?.get("type") !== "wrapper" && (
                <div className="flex items-center justify-between   border-b p-4 shadow-sm ">
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

            {(!isEditComponent ||
              selectedComponent?.get("type") === "wrapper") &&
              activeTab === "components" && (
                <div className="relative  p-5">
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
          <div className="flex-1 h-screen overflow-y-auto  space-y-4 bg-gray-50">
            <TabsContent
              className="data-[state=inactive]:bg-[#EFF3F4] bg-[#FEEBDB] !m-0"
              value="components"
            >
              <div className="relative">
                {isEditComponent &&
                selectedComponent &&
                selectedComponent?.get("type") !== "wrapper" ? (
                  <div
                    // style={{
                    //   minHeight: "calc(100vh - 200px)",
                    // }}
                    className=""
                  >
                    <ComponentStyleEditor
                      selectedComponent={selectedComponent}
                    />
                  </div>
                ) : (
                  <div>
                    <BlocksProvider>
                      {(props) => (
                        <CustomBlockManager
                          {...props}
                          searchBlock={searchBlock}
                        />
                      )}
                    </BlocksProvider>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent
              className="bg-[#FEEBDB] h-screen m-0 p-4"
              value="styles"
            >
              <GlobalStyles selectedComponent={selectedComponent} />
            </TabsContent>
          </div>

          {/* Bottom Bar */}
          <div className="sticky bottom-0 z-10 bg-white shadow p-2 bg-gradient-to-r from-[#FF8F2B] to-[#FFC794]">
            <div className="flex justify-between gap-x-5 p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <IoSettingsSharp />
                    Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={exportProjectAsFile}
                  >
                    {" "}
                    <CiExport /> Export Project
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={importProjectFromFile}
                  >
                    {" "}
                    <CiImport /> Import Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="bg-[#102442] rounded-full">
                Save <Save />
              </Button>
            </div>
          </div>
        </Tabs>
      </div>

      {/* <div
        id="blocks"
        className="relative top-0 left-0 w-full h-full   overflow-y-auto z-20  shadow-xl px-2    "
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList
            className={`w-full ${
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

          {isEditComponent && selectedComponent?.get("type") !== "wrapper" && (
            <div className="flex items-center justify-between   border-b p-4 shadow-sm ">
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

          {(!isEditComponent || selectedComponent?.get("type") === "wrapper") &&
            activeTab === "components" && (
              <div className="relative my-5 px-5">
                <Input
                  value={searchBlock || ""}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="rounded-full  pr-10"
                  placeholder="Search..."
                />

                <div className="absolute right-10 top-2.5 z-10 ">
                  <HiMagnifyingGlass className="text-slate-400" />
                </div>
              </div>
            )}

          <TabsContent
            className="data-[state=inactive]:bg-[#EFF3F4] bg-[#FEEBDB] "
            value="components"
          >
            <div className="">
              {isEditComponent &&
              selectedComponent &&
              selectedComponent?.get("type") !== "wrapper" ? (
                <div
                  className="bg-[#FEEBDB]"
                  style={{
                    overflowY: "auto",
                    height: "calc(100vh - 177px)",
                  }}
                >
                  <ComponentStyleEditor selectedComponent={selectedComponent} />
                </div>
              ) : (
                <div
                  className="min-h-screen"
                  style={{
                    overflowY: "auto",
                    // height: "calc(100vh - 300px)",
                  }}
                >
                  <BlocksProvider>
                    {(props) => (
                      <CustomBlockManager
                        {...props}
                        searchBlock={searchBlock}
                      />
                    )}
                  </BlocksProvider>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="styles">
            <GlobalStyles selectedComponent={selectedComponent} />
          </TabsContent>
        </Tabs>

        <div className="absolute bottom-0 left-0 bg-gradient-to-r from-[#FF8F2B] to-[#FFC794]    w-full h-14 shadow-xl ">
          <div className="flex justify-between gap-x-5 p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <IoSettingsSharp />
                  Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={exportProjectAsFile}
                >
                  {" "}
                  <CiExport /> Export Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={importProjectFromFile}
                >
                  {" "}
                  <CiImport /> Import Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-[#102442] rounded-full">
              Save <Save />
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
