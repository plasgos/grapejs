import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlocksProvider, useEditor } from "@grapesjs/react";
import { Save } from "lucide-react";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CustomBlockManager from "./CustomBlockProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { setIsEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { injectExternalCSS } from "@/utils/injectExternalCSS";
import { useEffect } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import { FaGlobe } from "react-icons/fa";
import { IoGrid, IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import EditorBlockComponents from "./EditorBlockComponents";
import GlobalStyles from "./GlobalStyles";
import { handleAddWatermark, updateCanvasComponents } from "./MainWebEditor";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = ({
  selectedComponent,
  activeTab,
  setActiveTab,
  setCanvasComponents,
  onToggleSidebar,
}) => {
  const editor = useEditor();
  const { toast } = useToast();

  const { isEditComponent, sidebarWidth, isCollapsedSideBar } = useSelector(
    (state) => state.landingPage
  );
  console.log("🚀 ~ isCollapsedSideBar:", isCollapsedSideBar);
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
      {isEditComponent &&
      selectedComponent &&
      selectedComponent?.get("type") !== "wrapper" ? (
        <>
          <EditorBlockComponents
            isEditComponent={isEditComponent}
            selectedComponent={selectedComponent}
            handleCloseComponent={handleCloseComponent}
          />
        </>
      ) : (
        <div
          style={{
            height: "calc(100vh - 60px)",
          }}
          className="flex flex-col   "
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
                  !isEditComponent ||
                  selectedComponent?.get("type") === "wrapper"
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

              {(!isEditComponent ||
                selectedComponent?.get("type") === "wrapper") &&
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

                <div className="flex gap-x-2">
                  <Button className="bg-[#102442] rounded-full">
                    Save <Save />
                  </Button>
                  <Button
                    onClick={() => onToggleSidebar()}
                    variant="ghost"
                    size="icon"
                  >
                    <TbLayoutSidebarLeftCollapseFilled />
                  </Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Sidebar;
