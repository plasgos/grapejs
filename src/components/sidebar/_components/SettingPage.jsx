import { handleAddWatermark } from "@/components/MainWebEditor";
import { useToast } from "@/hooks/use-toast";
import { injectExternalCSS } from "@/utils/injectExternalCSS";
import { useEditor } from "@grapesjs/react";
import { cx } from "class-variance-authority";
import { produce } from "immer";
import { ChevronRight } from "lucide-react";
import { CiExport, CiImport } from "react-icons/ci";

const SettingPage = ({ currentProject }) => {
  const editor = useEditor();
  const { toast } = useToast();

  const components = editor.getComponents()?.models;

  const settingItems = [
    {
      key: "import",
      label: "Import Project",
      icon: <CiImport size={18} />,
      action: () => importProjectFromFile(),
      disable: false,
    },
    {
      key: "export",
      label: "Export Project",
      icon: <CiExport size={18} />,
      action: () => exportProjectAsFile(),
      disable: components.length === 0,
    },
  ];

  const exportProjectAsFile = () => {
    if (components.length > 0) {
      const editorModel = editor.getModel();

      // Ambil data proyek
      const projectData = editor.getProjectData();
      const resultComponent = produce(projectData, (draft) => {
        draft.pages[0].frames[0].component.components.forEach(
          (compt) => (compt.isFromAI = false)
        );

        draft.globalOptions = editorModel.get("globalOptions");
      });
      // Konversi data ke JSON
      const jsonString = JSON.stringify(resultComponent, null, 2);

      // Buat file untuk diunduh
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Simpan file dengan nama "grapesjs-project.json"
      const link = document.createElement("a");
      link.href = url;
      link.download = `${currentProject?.name}.json`;
      link.click();

      // Bersihkan URL setelah download
      URL.revokeObjectURL(url);
    }
  };

  const resetAllComponents = () => {
    const editorModel = editor.getModel();
    const currentGlobalOptions = editorModel.get("globalOptions");

    if (currentGlobalOptions.schemeColor) {
      editorModel.set("globalOptions", {
        ...currentGlobalOptions,
        schemeColor: null,
        bgColor: "",
      });
    }

    const components = editor?.getComponents().models;
    if (components.length > 0) {
      editor?.DomComponents.clear();
    }
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
          resetAllComponents();
          const projectData = JSON.parse(e.target.result);
          // Muat data proyek ke editor
          editor.loadProjectData(projectData);

          // Ambil globalOptions dari data proyek jika ada
          const editorModel = editor.getModel();
          if (projectData.globalOptions) {
            editorModel.set("globalOptions", projectData.globalOptions);
          }
          handleAddWatermark(editor);

          injectExternalCSS(editor);

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
    <div>
      <div className="sticky top-0 z-10  border-b shadow  p-4 bg-orange-200  flex justify-between items-center ">
        <p className="font-semibold">Settings</p>
      </div>

      <div className="p-4 h-[86vh] overflow-y-auto">
        <div className="flex flex-col gap-y-3 p-3 bg-white rounded-lg">
          {settingItems.map((item) => {
            return (
              <div
                key={item.key}
                className={cx(
                  "flex justify-between items-center border-b p-3  hover:bg-accent",

                  item.disable ? "cursor-not-allowed" : "cursor-pointer"
                )}
                onClick={() => item.action()}
              >
                <div
                  className={cx(
                    "flex items-center gap-x-3",
                    item.disable ? "text-muted-foreground" : ""
                  )}
                >
                  {item.icon}

                  <p>{item.label}</p>
                </div>

                <div>
                  <ChevronRight
                    className={cx(
                      "",
                      item.disable
                        ? "text-muted-foreground/40"
                        : "text-muted-foreground"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
