import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlocksProvider, useEditor } from "@grapesjs/react";
import { Save } from "lucide-react";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import ComponentStyleEditor from "./ComponentStyleEditor";
import CustomBlockManager from "./CustomBlockProvider";
import NavigatorSidebar from "./Navigator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoSettingsSharp } from "react-icons/io5";
import { CiExport, CiImport } from "react-icons/ci";
import { useToast } from "@/hooks/use-toast";
import {
  handleAddWatermark,
  injectTailwindCss,
  onAddingAnimateCss,
  updateCanvasComponents,
} from "./MainWebEditor";

const Sidebar = ({
  selectedComponent,
  components,
  onReorder,
  activeTab,
  setActiveTab,
  setIsDragging,
  setCanvasComponents,
}) => {
  const editor = useEditor();
  const { toast } = useToast();

  const [searchBlock, setSearchBlock] = useState("");

  const handleSearchChange = (value) => {
    setSearchBlock(value);
  };

  const handleCloseComponent = () => {
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

          injectTailwindCss(editor);
          handleAddWatermark(editor);

          onAddingAnimateCss(editor);

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

  return (
    <>
      <div
        id="blocks"
        className="relative top-0 left-0 w-96 h-full   overflow-y-auto z-20 bg-white shadow-xl border-r-2 "
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="w-full"
        >
          <TabsList
            className={`w-full ${
              !selectedComponent || selectedComponent?.get("type") === "wrapper"
                ? ""
                : "hidden"
            }`}
          >
            <TabsTrigger
              className="w-full data-[state=inactive]:bg-[#EFF3F4] rounded-bl-xl "
              value="components"
            >
              Components
            </TabsTrigger>
            {/* <TabsTrigger
              className="w-full data-[state=inactive]:bg-[#EFF3F4]  rounded-bl-xl"
              value="navigator"
            >
              Navigator
            </TabsTrigger> */}
            <TabsTrigger
              className="w-full data-[state=inactive]:bg-[#EFF3F4]  rounded-bl-xl"
              value="styles"
            >
              Styles
            </TabsTrigger>
          </TabsList>
          {selectedComponent &&
            selectedComponent?.get("type") !== "wrapper" && (
              <div
                onClick={handleCloseComponent}
                className="flex items-center justify-between   border-b p-4 shadow-sm cursor-pointer"
              >
                <p className="font-semibold">
                  {selectedComponent?.get("blockLabel")}
                </p>
                <MdClose className="text-slate-500" size={20} />
              </div>
            )}

          {(!selectedComponent ||
            selectedComponent?.get("type") === "wrapper") &&
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
              {selectedComponent &&
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
                  className=""
                  style={{
                    overflowY: "auto",
                    height: "calc(100vh - 230px)",
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
          <TabsContent
            style={{
              overflowY: "auto",
              height: "calc(100vh - 150px)",
            }}
            className="overflow-hidden px-3 bg-[#FEEBDB] mt-0 "
            value="navigator"
          >
            <NavigatorSidebar
              components={components}
              onReorder={onReorder}
              setIsDragging={setIsDragging}
            />
          </TabsContent>

          <TabsContent value="styles">Change your password here.</TabsContent>
        </Tabs>

        <div className="absolute bottom-0 left-0 bg-gradient-to-r from-[#FF8F2B] to-[#FFC794]    w-full h-14 shadow-xl ">
          <div className="flex justify-between gap-x-5 p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  // className="bg-neutral-100 text-black shadow hover:bg-neutral-100/90"
                >
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
      </div>
    </>
  );
};

export default Sidebar;
