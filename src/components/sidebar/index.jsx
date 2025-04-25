import { useEditor } from "@grapesjs/react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useToast } from "@/hooks/use-toast";
import { setIsEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { injectExternalCSS } from "@/utils/injectExternalCSS";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CollapsedView from "./_components/CollapsedView";
import ExpandedView from "./_components/ExpandedView";
import EditorBlockComponents from "./_components/EditorBlockComponents";
import { handleAddWatermark, updateCanvasComponents } from "../MainWebEditor";
import Bottombar from "./_components/Bottombar";

const Sidebar = ({
  selectedComponent,
  activeTab,
  setActiveTab,
  setCanvasComponents,
  onToggleSidebar,
}) => {
  const editor = useEditor();
  const { toast } = useToast();

  const { isEditComponent, isCollapsedSideBar } = useSelector(
    (state) => state.landingPage
  );
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
            height: "calc(100vh - 125px)",
          }}
          className="flex flex-col   "
        >
          {isCollapsedSideBar ? (
            <CollapsedView
              searchBlock={searchBlock}
              handleSearchChange={handleSearchChange}
              selectedComponent={selectedComponent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <ExpandedView
              searchBlock={searchBlock}
              handleSearchChange={handleSearchChange}
              selectedComponent={selectedComponent}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      )}

      {/* Bottom Bar */}
      <Bottombar
        isCollapsedSideBar={isCollapsedSideBar}
        onToggleSidebar={onToggleSidebar}
        exportProjectAsFile={exportProjectAsFile}
        importProjectFromFile={importProjectFromFile}
      />
    </>
  );
};

export default Sidebar;
