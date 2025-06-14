import GjsEditor, { Canvas, WithEditor } from "@grapesjs/react";
import "animate.css";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { createRoot } from "react-dom/client";
import "../index.css";
import Watermark from "./Watermark";

import { useState } from "react";
import Navbar from "./Navbar";

import { motion, AnimatePresence } from "framer-motion";

import {
  setEditComponent,
  setGoogleFont,
  setIsPreviewMode,
} from "@/redux/modules/landing-page/landingPageSlice";
import { injectExternalCSS } from "@/utils/injectExternalCSS";
import { overrideCopyCommand } from "@/utils/overrideCopyCommand";
import { overrideDeleteCommand } from "@/utils/overrideDeleteCommand";
import { useDispatch } from "react-redux";

import { googleFonts } from "@/lib/googleFonts";
import { generateId } from "@/lib/utils";
import { generateGoogleFontsImportWithWeights } from "@/utils/injectGoogleFonts";
import { useSelector } from "react-redux";

import trialPlugin from "@/plugins/new-plugin/trialPlugin";
import { onSyncSchemeColor } from "@/utils/onSyncSchemeColor";
import { cx } from "class-variance-authority";
import { produce } from "immer";
import { useParams } from "react-router-dom";
import NavigationGuard from "./NavigationGuard";
import { schemeColours } from "./theme-colors";
import ToolbarPortalWrapper from "./ToolbarPortalWrapper";
import EditorSheet from "./sidebar/_components/EditorSheet";
import plasgosPlugin from "@/plugins/plasgos";
import Sidebar from "./sidebar";

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

const MainWebEditor = () => {
  const { projectsData, editComponent, isPreviewMode } = useSelector(
    (state) => state.landingPage
  );

  const { slug } = useParams();

  const currentProject = projectsData?.find((project) => project.slug === slug);

  const [editorInstance, setEditorInstance] = useState(null);

  const dispatch = useDispatch();

  const handleEditorInit = (editor) => {
    setEditorInstance(editor);

    editor.on("load", () => {
      const deviceManager = editor.Devices;
      deviceManager.add({
        id: "mobileModern",
        name: "Mobile", // yang tampil di UI
        width: "375px", // ukuran canvas
        widthMedia: "480px", // media query breakpoint
        priority: 480, // untuk urutan tampilan di UI
      });

      editor.Canvas.setZoom(70);

      deviceManager.remove("mobilePortrait");
      deviceManager.remove("mobileLandscape");

      injectExternalCSS(editor);
      addGlobalOptions(editor);
      handleAddWatermark(editor);
      handleAddGoogleFont();
      handleLoadCurrentProject(editor);
    });

    editor.on("run:core:preview", () => {
      dispatch(setIsPreviewMode(true));

      const iframes = editor.Canvas.getDocument().querySelectorAll("iframe");
      iframes.forEach((el) => {
        el.style.pointerEvents = "auto";
      });
    });

    editor.on("stop:core:preview", () => {
      dispatch(setIsPreviewMode(false));

      const iframes = editor.Canvas.getDocument().querySelectorAll("iframe");
      iframes.forEach((el) => {
        el.style.pointerEvents = "none";
      });
    });

    editor.on("component:selected", (component) => {
      component.set("draggable", false);
      dispatch(setEditComponent(""));

      const type = component.get("type");

      if (type?.startsWith("floating-")) {
        // component.set("selectable", false);
        component.set("highlightable", false);
        component.set("hoverable", false);
      }
    });

    // editor.on("component:update", (component) => {
    //   component.set("draggable", false);
    // });

    editor.on("component:add", (component) => {
      component.set("draggable", false);
      handleSyncSchemeColor(editor);
    });
    editor.on("component:remove", () => {
      handleSyncSchemeColor(editor);
    });
    editor.on("component:clone", () => {
      handleSyncSchemeColor(editor);
    });

    editor.on("component:selected", () => {
      const selected = editor.getSelected();

      const movedElement = selected.view?.el;

      if (movedElement) {
        setTimeout(() => {
          movedElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 100);
      }

      // Force re-render canvas
      setTimeout(() => {
        editor?.refresh(); // Memaksa reflow & repaint canvas
      }, 50);
    });

    overrideDeleteCommand(editor);
    overrideCopyCommand(editor);
    editor.Commands.add("custom-copy", {
      run(editor) {
        const selected = editor.getSelected();
        if (selected) {
          const clonedComponent = selected.clone();
          const parent = selected.parent();
          if (parent) {
            const components = parent.get("components");
            const currentIndex = components.indexOf(selected);
            parent.append(clonedComponent, { at: currentIndex + 1 });
          }
          editor.select(clonedComponent);
          const clonedElement = clonedComponent.view.el;
          if (clonedElement) {
            clonedElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      },
    });
  };

  const handleSyncSchemeColor = (editor) => {
    const globalOptions = editor.getModel().get("globalOptions");

    if (globalOptions?.schemeColor) {
      const schemeColorValue = schemeColours.find(
        (schemeColor) => schemeColor.name === globalOptions?.schemeColor
      );

      if (schemeColorValue) {
        onSyncSchemeColor(editor, schemeColorValue);
      }
    }
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

  const handleLoadCurrentProject = (editor) => {
    if (currentProject) {
      const um = editor.UndoManager;

      um.stop();

      if (currentProject.isFromAI) {
        importGeneratedSection(editor, currentProject?.frameProject);
      } else {
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
      }

      // Start tracking again AFTER all initial loads
      um.start();

      // Optional: Clear undo stack, to avoid leftovers
      um.clear();
    } else {
      return;
    }
  };

  const importGeneratedSection = (editor, dataFromAI) => {
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
    } catch (error) {
      console.error("🚀 Import error:", error);
    }
  };

  const handleClickOutsideCanvas = () => {
    if (editorInstance) {
      editorInstance.select(null);
      dispatch(setEditComponent(""));
    }
  };

  return (
    <div>
      <GjsEditor
        onEditor={handleEditorInit}
        grapesjs={grapesjs}
        plugins={[plasgosPlugin, trialPlugin]}
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
            <Navbar currentProject={currentProject} />
          </WithEditor>

          <div
            className={cx(
              "flex overflow-x-hidden bg-[#FFF4EA] transform transition-all ease-in-out"
            )}
          >
            <WithEditor>
              <div className={cx("", isPreviewMode && "hidden")}>
                <Sidebar currentProject={currentProject} />
              </div>
            </WithEditor>

            <div
              onClick={handleClickOutsideCanvas}
              className={cx(
                "flex flex-col flex-1  ",
                isPreviewMode ? "h-screen" : "h-[94vh]"
              )}
            >
              <Canvas
                style={{
                  backgroundColor: "#FFF4EA",
                  width: "100%",
                }}
              />
            </div>

            <AnimatePresence>
              {!!editComponent && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.3,
                  }}
                  className={cx(
                    " absolute right-0 top-0 z-[9999]  w-[380px] h-[94vh] bg-[#FEEBDB] shadow flex flex-col ",
                    isPreviewMode && "hidden"
                  )}
                >
                  <WithEditor>
                    <EditorSheet />
                  </WithEditor>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <WithEditor>
          <ToolbarPortalWrapper />
        </WithEditor>
      </GjsEditor>
    </div>
  );
};

export default MainWebEditor;
