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
import { Textarea } from "../ui/textarea";
import Groq from "groq-sdk";

import { Button } from "../ui/button";

const listComponents = [
  "navbar",
  "split-text",
  "blur-text",
  "fuzzy-text",
  "glitch-text",
  "scroll-velocity-text",
  "count-up",
  "marque-images",
  "gallery-masonry",
  "buttons",
  "content-showcase",
  "image",
  "modal-popup",
  "list-images",
  "video",
  "video-text",
  "hero-section",
  "floating-button-circle",
  "floating-button",
  "slider-images",
  "quote",
  "countdown",
  "feature-highlights",
  "faq",
  "testimony",
  "divider",
  "empty-space",
  "form-checkout",
  "footer",
];

const sampleAiResponse = {
  assets: [],
  styles: [],
  pages: [
    {
      frames: [
        {
          component: {
            type: "wrapper",
            stylable: [],
            components: [
              {
                type: "content-showcase",
                attributes: {
                  isLocked: false,
                  contents: [
                    {
                      id: "abc1-random-string",
                      title: "Perawatan Kulit Pria yang Tepat",
                      description:
                        "Dapatkan kulit yang sehat dan cerah dengan perawatan kulit pria yang tepat. Pelajari tentang pentingnya membersihkan wajah, menggunakan pelembab, dan melindungi kulit dari sinar UV.",
                      image: "https://example.com/image1.jpg",
                      target: {
                        actionType: "link",
                        options: {
                          isOpenNewTab: true,
                          link: "https://wwwexample.com/mens-skincare",
                          type: "url",
                        },
                      },
                    },
                    {
                      id: "abc2-random-string",
                      title: "Mengatasi Jerawat dan Komedo",
                      description:
                        "Temukan solusi untuk mengatasi jerawat dan komedo pada kulit pria. Pelajari tentang produk perawatan kulit yang efektif dan tips untuk mencegah jerawat dan komedo.",
                      image: "https://example.com/image2.jpg",
                      target: {
                        actionType: "link",
                        options: {
                          type: null,
                        },
                      },
                    },
                    {
                      id: "abc3-random-string",
                      title: "Tips Meningkatkan Kesehatan Kulit",
                      description:
                        "Pelajari tips untuk meningkatkan kesehatan kulit pria, termasuk pola makan yang seimbang, olahraga teratur, dan istirahat yang cukup. Dapatkan kulit yang sehat dan cerah dengan gaya hidup sehat.",
                      image: "https://example.com/image3.jpg",
                      target: {
                        actionType: "link",
                        options: {
                          type: null,
                        },
                      },
                    },
                  ],
                  wrapperStyle: {
                    column: "3",
                    aspectRatio: 2,
                    titleColor: "#000000",
                    fontWeight: "font-semibold",
                    descriptionColor: "#000000",
                    fontSizeTitle: "tw-text-sm",
                    imagePosition: "center",
                    fontFamily: "Roboto",
                    fontSize: 16,
                    textAligment: "text-center",
                  },
                  background: {
                    bgType: null,
                    bgColor: "",
                    bgImage: "",
                    blur: 0,
                    opacity: 0,
                    paddingY: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingType: "vertical",
                    direction: "to right",
                    fromColor: "",
                    toColor: "",
                    isRevert: false,
                    pattern: "",
                  },
                },
              },
            ],
            head: {
              type: "head",
            },
            docEl: {
              tagName: "html",
            },
          },
          id: "RANDOM_FRAME_ID",
        },
      ],
      type: "main",
      id: "RANDOM_PAGE_ID",
    },
  ],
  symbols: [],
  dataSources: [],
  globalOptions: {
    maxWidthPage: 1360,
    bgColor: "",
    scrollTarget: [],
    popup: [],
  },
};

const contentShowcaseSchema = {
  isLocked: false,
  scrollTarget: undefined,
  contents: [
    {
      id: "random-string-id",
      title: "",
      description: "",
      image: "https://placehold.co/600x400",
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
    },
  ],
  wrapperStyle: {
    column: "3",
    aspectRatio: 2 / 1,
    titleColor: "#000000",
    fontWeight: "font-semibold",
    descriptionColor: "#000000",
    fontSizeTitle: "tw-text-sm",
    imagePosition: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    textAligment: "text-center",
  },
  background: {
    bgType: null,
    bgColor: "",
    bgImage: "",
    blur: 0,
    opacity: 0,
    paddingY: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingType: "vertical",
    direction: "to right",
    fromColor: "",
    toColor: "",
    isRevert: false,
    pattern: "",
  },
};

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

    // Tambahkan globalOptions ke data proyek
    projectData.globalOptions = editorModel.get("globalOptions");

    // Konversi data ke JSON
    const jsonString = JSON.stringify(projectData, null, 2);

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

  const [aiPrompt, setAiPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const importGeneratedSection = (rawJson) => {
    try {
      const parsedData = JSON.parse(rawJson);

      if (!parsedData.pages || !parsedData.pages[0].frames) {
        throw new Error("Invalid generated format");
      }

      // editor.clearProjectData(); // Clear dulu biar fresh

      editor.loadProjectData(parsedData);

      console.log("🚀 Section berhasil di-import ke GrapesJS!");

      const editorModel = editor.getModel();
      if (parsedData.globalOptions) {
        editorModel.set("globalOptions", parsedData.globalOptions);
        console.log("Global Options loaded:", parsedData.globalOptions);
      }
      handleAddWatermark(editor);

      injectExternalCSS(editor);

      updateCanvasComponents(editor, setCanvasComponents);
    } catch (error) {
      console.error("🚀 Import error:", error);
    }
  };

  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const getGrogChatyCompletion = async () => {
    setIsLoading(true);

    try {
      const systemInstruction = `
  Kamu adalah AI untuk menyusun struktur landing page dari komponen GrapesJS yang sudah disiapkan.

  Hanya gunakan type berikut untuk menyusun section landing page: [content-showcase]

  Gunakan format attributes seperti ini:
  ${JSON.stringify(contentShowcaseSchema, null, 2)}

  Berikan output dalam format JSON berikut (JSON Mode), dan pastikan valid:

  {
    "assets": [],
    "styles": [],
    "pages": [
      {
        "frames": [
          {
            "component": {
              "type": "wrapper",
              "stylable": [],
              "components": [ 
                {
                  "type": "content-showcase",
                  "attributes": {
                    "id": "abc1-random string",
                    // ...isi lainnya sesuai skema di atas
                  }
                }
              ],
              "head": { "type": "head" },
              "docEl": { "tagName": "html" }
            },
            "id": "RANDOM_FRAME_ID"
          }
        ],
        "type": "main",
        "id": "RANDOM_PAGE_ID"
      }
    ],
    "symbols": [],
    "dataSources": [],
    "globalOptions": {
      "maxWidthPage": 1360,
      "bgColor": "",
      "scrollTarget": [],
      "popup": []
    }
  }
`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: aiPrompt }, // ini dari user input bebas
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }, // WAJIBKAN JSON mode
      });

      const result = completion.choices[0]?.message?.content;
      console.log("🚀 AI Result:", result);

      // const result = JSON.stringify(sampleAiResponse, null, 2);

      if (result) {
        importGeneratedSection(result);
      }
    } catch (error) {
      console.error("🚀 Error Generating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isEditComponent && selectedComponent?.get("type") !== "wrapper" ? (
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
          <Textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />

          <Button onClick={getGrogChatyCompletion}>Submit</Button>
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
