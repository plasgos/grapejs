import GjsEditor, { Canvas, WithEditor } from "@grapesjs/react";
import "animate.css";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { createRoot } from "react-dom/client";
import "../index.css";
import Watermark from "./Watermark";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { useState } from "react";
import Navbar from "./Navbar";

import plasgosPlugin from "@/plugins";

import {
  setGoogleFont,
  setIsCollapsedSideBar,
  setIsEditComponent,
  setSidebarWidth,
} from "@/redux/modules/landing-page/landingPageSlice";
import { injectExternalCSS } from "@/utils/injectExternalCSS";
import { onCustomToolbar } from "@/utils/onCustomToolbar";
import { overrideCopyCommand } from "@/utils/overrideCopyCommand";
import { overrideDeleteCommand } from "@/utils/overrideDeleteCommand";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { googleFonts } from "@/lib/googleFonts";
import { cn, generateId } from "@/lib/utils";
import { generateGoogleFontsImportWithWeights } from "@/utils/injectGoogleFonts";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./sidebar";

import useWindowWidth from "@/hooks/useWindowWidth";
import { onSyncSchemeColor } from "@/utils/onSyncSchemeColor";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { schemeColours } from "./theme-colors";
import NavigationGuard from "./NavigationGuard";
import { useCallback } from "react";
import { produce } from "immer";

const rootMap = new Map();

export const handleAddWatermark = (editor) => {
  const canvasEl = editor.Canvas.getFrameEl();
  if (!canvasEl) return;

  const canvasDoc = canvasEl.contentDocument;
  const body = canvasDoc?.body;
  if (!body) return;

  let watermarkContainer = canvasDoc.getElementById(
    "plasgos-watermark-container"
  );

  if (!watermarkContainer) {
    watermarkContainer = canvasDoc.createElement("div");
    watermarkContainer.id = "plasgos-watermark-container";
    body.appendChild(watermarkContainer);
  }

  // Cek apakah DOM node sudah pernah di-createRoot
  if (!rootMap.has(watermarkContainer)) {
    const root = createRoot(watermarkContainer);
    rootMap.set(watermarkContainer, root);
  }

  // Ambil root dari map dan render/update watermark
  const root = rootMap.get(watermarkContainer);
  root.render(<Watermark />);

  // Pindahkan ke akhir body jika tidak di posisi akhir
  const moveWatermarkToEnd = () => {
    if (body.lastChild !== watermarkContainer) {
      body.appendChild(watermarkContainer);
    }
  };

  // Observer untuk menjaga posisi watermark di akhir
  const observer = new MutationObserver(() => {
    moveWatermarkToEnd();
  });

  observer.observe(body, { childList: true, subtree: false });
  moveWatermarkToEnd();
};

export const handleRemoveWatermark = (editor) => {
  const canvasEl = editor?.Canvas.getFrameEl();
  if (!canvasEl) return;

  const canvasDoc = canvasEl.contentDocument;
  const watermarkContainer = canvasDoc?.getElementById(
    "plasgos-watermark-container"
  );
  if (!watermarkContainer) return;

  // Unmount React root jika ada
  const root = rootMap.get(watermarkContainer);
  if (root) {
    root.unmount();
    rootMap.delete(watermarkContainer);
  }

  // Hapus elemen dari DOM
  watermarkContainer.remove();
};

const getAllComponents = (editor) => {
  return editor?.getComponents()?.map((comp, index) => ({
    id: comp.getId(),
    name: comp.get("tagName") || `Component ${index + 1}`,
    model: comp,
    category: comp.get("category"),
  }));
};

export const updateCanvasComponents = (editor, setCanvasComponents) => {
  if (!editor) {
    return;
  }

  const components = getAllComponents(editor);
  setCanvasComponents(components);
};

const MainWebEditor = () => {
  const { projectsData, isCollapsedSideBar, projectDataFromAI } = useSelector(
    (state) => state.landingPage
  );

  const { slug } = useParams();

  const currentProject = projectsData.find((project) => project.slug === slug);

  const windowWidth = useWindowWidth();

  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(undefined);
  const [activeTab, setActiveTab] = useState("components");
  const [canvasComponents, setCanvasComponents] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedComponent && selectedComponent.get("type") === "wrapper") {
      dispatch(setIsEditComponent(false));
    }
  }, [dispatch, selectedComponent]);

  // useEffect(() => {
  //   if (!currentProject) {
  //     navigate("/files");
  //   }
  // }, [currentProject, dispatch, navigate]);

  const handleReorder = (event, editor, isFloatingComponent) => {
    if (isFloatingComponent) {
      return;
    }

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = canvasComponents.findIndex((c) => c.id === active.id);
    const newIndex = canvasComponents.findIndex((c) => c.id === over.id);

    // Swap posisi di array
    const updatedComponents = [...canvasComponents];
    const movedComponent = updatedComponents.splice(oldIndex, 1)[0];
    updatedComponents.splice(newIndex, 0, movedComponent);

    // Update state
    setCanvasComponents(updatedComponents);

    // Update order di dalam GrapesJS

    const componentToMove = movedComponent.model;
    editor.select(componentToMove);
    const parent = componentToMove.parent();

    // const parent = movedComponent.model.parent();
    if (parent) {
      parent.append(movedComponent.model, { at: newIndex });
    }
  };

  const handleEditorInit = (editor) => {
    setEditorInstance(editor);
    onCustomToolbar(editor);

    editor.on("load", () => {
      injectExternalCSS(editor);
      updateCanvasComponents(editor, setCanvasComponents);
      handleFocusDropComponent(editor);
      addGlobalOptions(editor);
      handleAddWatermark(editor);
      handleAddGoogleFont();
      handleLoadCurrentProject(editor);

      if (projectDataFromAI) {
        importGeneratedSection(editor, projectDataFromAI);
      }
    });

    editor.on("component:add", () => {
      updateCanvasComponents(editor, setCanvasComponents);

      const globalOptions = editor.getModel().get("globalOptions");

      if (globalOptions?.schemeColor) {
        const schemeColorValue = schemeColours.find(
          (schemeColor) => schemeColor.name === globalOptions?.schemeColor
        );

        if (schemeColorValue) {
          onSyncSchemeColor(editor, schemeColorValue);
        }
      }
    });
    editor.on("component:remove", () =>
      updateCanvasComponents(editor, setCanvasComponents)
    );
    editor.on("component:drag:end", () =>
      updateCanvasComponents(editor, setCanvasComponents)
    );

    editor.on("component:drag:start", () => {
      setIsDragging(true);

      setTimeout(() => {
        editor.refresh(); // Memaksa reflow & repaint canvas
      }, 50);
    });

    editor.on("component:drag:end", ({ target }) => {
      if (!target) return;

      const movedElement = target.view?.el;

      if (movedElement) {
        setTimeout(() => {
          movedElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 100);
      }

      setIsDragging(false);

      // Force re-render canvas
      setTimeout(() => {
        editor.refresh(); // Memaksa reflow & repaint canvas
      }, 50);
    });

    const handleComponentSelected = (model) => {
      setSelectedComponent(model);
      setActiveTab("components");
    };

    editor.on("component:selected", handleComponentSelected);

    overrideDeleteCommand(editor);
    overrideCopyCommand(editor);
  };

  const addGlobalOptions = (editor) => {
    const editorModel = editor.getModel();

    if (!currentProject?.frameProject?.globalOptions) {
      const intialStateGlobalData = {
        maxWidthPage: 1360,
        schemeColor: null,
        bgColor: "",
        scrollTarget: [
          { id: "target-01", value: "scrollToTop", label: "Scroll To Top" },
        ],
        popup: [],
        isFocusContent: "",
        watermark: true,
        isSubscribed: true,
      };

      // Set global options
      editorModel.set("globalOptions", intialStateGlobalData);
    } else {
      return;
    }
  };

  const handleFocusDropComponent = (editor) => {
    const canvas = editor.Canvas.getFrameEl();
    if (!canvas) return;

    // Scroll ke komponen baru setelah ditambahkan
    editor.on("component:add", (model) => {
      setTimeout(() => {
        const el = model.view?.el; // Ambil elemen DOM dari komponen
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    });
  };

  const handleAddGoogleFont = () => {
    function parseGoogleFontsImport(importStr) {
      const url = importStr.match(/url\(['"]?([^'")]+)['"]?\)/)?.[1];
      if (!url) return [];

      const fontOptions = [];
      const query = new URL(url).searchParams;
      const families = query.getAll("family");

      families.forEach((familyStr) => {
        const [rawName, weightPart] = familyStr.split(":");
        const fontFamily = rawName.replace(/\+/g, " ");
        let weights = [];

        if (weightPart?.includes("ital,wght@")) {
          // Contoh: ital,wght@0,100;1,200 => ambil angka kedua saja
          const entries = weightPart.split("ital,wght@")[1].split(";");
          weights = entries.map((entry) => parseInt(entry.split(",")[1], 10));
        } else if (weightPart?.includes("wght@")) {
          // Contoh: wght@100;300;700 atau wght@100..900
          const entries = weightPart.split("wght@")[1].split(";");
          weights = entries.flatMap((w) => {
            if (w.includes("..")) {
              const [start, end] = w.split("..").map(Number);
              return Array.from(
                { length: Math.floor((end - start) / 100) + 1 },
                (_, i) => start + i * 100
              );
            }
            return parseInt(w, 10);
          });
        }

        fontOptions.push({
          fontFamily,
          weights: [...new Set(weights)].sort((a, b) => a - b),
        });
      });

      return fontOptions;
    }

    const googleFontsImport = generateGoogleFontsImportWithWeights(googleFonts);

    const fontOptions = parseGoogleFontsImport(googleFontsImport);

    dispatch(setGoogleFont(fontOptions));
  };

  const sidebarRef = useRef(null);

  const handleToggleSidebar = () => {
    if (!sidebarRef.current) return;
    if (sidebarRef.current.isCollapsed()) {
      sidebarRef.current.expand();
    } else {
      sidebarRef.current.collapse();
    }
  };

  const handleLoadCurrentProject = (editor) => {
    if (slug) {
      const um = editor.UndoManager;

      um.stop();

      editor.loadProjectData(currentProject?.frameProject);
      const editorModel = editor.getModel();

      if (currentProject?.frameProject?.globalOptions) {
        editorModel.set(
          "globalOptions",
          currentProject?.frameProject.globalOptions
        );
      }

      handleAddWatermark(editor);
      injectExternalCSS(editor);

      updateCanvasComponents(editor, setCanvasComponents);

      // Start tracking again AFTER all initial loads
      um.start();

      // Optional: Clear undo stack, to avoid leftovers
      um.clear();
    } else {
      return;
    }
  };

  const importGeneratedSection = (editor, dataFromAI) => {
    console.log("🚀 ~ dataFromAI:", dataFromAI);
    try {
      const schemeColorValue = schemeColours.find(
        (schemeColor) => schemeColor.name === dataFromAI?.schemeColor
      );

      const schema = {
        assets: [],
        styles: [],
        pages: [
          {
            frames: [
              {
                component: {
                  type: "wrapper",
                  stylable: [],
                  components: [],
                  head: { type: "head" },
                  docEl: { tagName: "html" },
                },
                id: `frame-id-${generateId()}`,
              },
            ],
            type: "main",
            id: `page-id-${generateId()}`,
          },
        ],
        symbols: [],
        dataSources: [],
        globalOptions: {
          maxWidthPage: 1360,
          bgColor: schemeColorValue ? schemeColorValue.baseColor : "",
          schemeColor: dataFromAI.schemeColor ? dataFromAI.schemeColor : null,
          scrollTarget: [
            { id: "target-01", value: "scrollToTop", label: "Scroll To Top" },
          ],
          popup: [],
          isFocusContent: "",
          watermark: true,
          isSubscribed: true,
        },
      };

      const parsedData = dataFromAI?.components.map((data) => ({
        ...data,
        isFromAI: true,
      }));
      const resultComponent = produce(schema, (draft) => {
        draft.pages[0].frames[0].component.components = parsedData;
      });

      editor.loadProjectData(resultComponent);

      const editorModel = editor.getModel();
      if (resultComponent.globalOptions) {
        editorModel.set("globalOptions", resultComponent.globalOptions);
      }

      if (schemeColorValue) {
        onSyncSchemeColor(editor, schemeColorValue);

        setTimeout(() => {
          const wrapper = editor.getWrapper();
          if (wrapper) {
            wrapper.addStyle({
              "background-color": schemeColorValue.baseColor,
            });
          }
        }, 100);
      }

      handleAddWatermark(editor);
      injectExternalCSS(editor);

      updateCanvasComponents(editor, setCanvasComponents);
    } catch (error) {
      console.error("🚀 Import error:", error);
    }
  };

  return (
    <div>
      <GjsEditor
        onEditor={handleEditorInit}
        grapesjs={grapesjs}
        plugins={[plasgosPlugin]}
        options={{
          storageManager: false,

          canvasCss: `
          .gjs-selected {
          border : 2px solid
          }

          .lazy-load-image-background.lazy-load-image-loaded {
  filter: none !important;
  transition: filter 0.3s ease-in-out;
}
        `,
        }}
      >
        <div>
          <NavigationGuard editor={editorInstance} />
          <WithEditor>
            <Navbar
              setIsPreviewActive={(value) => setIsPreviewActive(value)}
              selectedComponent={selectedComponent}
              components={canvasComponents}
              onReorder={handleReorder}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsDragging={setIsDragging}
            />
          </WithEditor>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              ref={sidebarRef}
              onResize={(value) => {
                const widthPanel = Math.round(value);

                dispatch(setSidebarWidth(widthPanel));
                if (widthPanel === 5) {
                  dispatch(setIsCollapsedSideBar(true));
                } else {
                  dispatch(setIsCollapsedSideBar(false));
                }
              }}
              minSize={5}
              collapsedSize={5}
              collapsible
              className={cn(
                isCollapsedSideBar && "!w-[100px] min-w-[100px] max-w-[100px]",
                isPreviewActive && "hidden"
              )}
              defaultSize={windowWidth <= 768 ? 35 : 25}
            >
              <motion.nav layout>
                <WithEditor>
                  <Sidebar
                    selectedComponent={selectedComponent}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setCanvasComponents={setCanvasComponents}
                    onToggleSidebar={handleToggleSidebar}
                  />
                </WithEditor>
              </motion.nav>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={isPreviewActive ? 100 : 75}>
              <div
                className={`flex flex-col justify-center ${
                  isPreviewActive ? "h-screen" : "h-full"
                } items-center relative z-50`}
              >
                <Canvas
                  style={{
                    backgroundColor: "#FFF4EA",
                    width: "100%",
                    minHeight: isDragging ? "200%" : "100%",
                    transform: isDragging ? "scale(0.5)" : "scale(1)",
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </GjsEditor>
    </div>
  );
};

export default MainWebEditor;
