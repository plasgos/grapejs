import GjsEditor, { Canvas, WithEditor } from "@grapesjs/react";
import "animate.css";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { createRoot } from "react-dom/client";
import "../index.css";
import Watermark from "./Watermark";

// import basicPlugin from "grapesjs-blocks-basic";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import plasgosPlugin from "@/plugins";

import { setIsEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import { injectExternalCSS } from "@/utils/injectExternalCSS";
import { onCustomToolbar } from "@/utils/onCustomToolbar";
import { overrideCopyCommand } from "@/utils/overrideCopyCommand";
import { overrideDeleteCommand } from "@/utils/overrideDeleteCommand";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

  // Cek apakah root sudah ada di Map
  let root = rootMap.get(watermarkContainer);

  if (!root) {
    root = createRoot(watermarkContainer);
    rootMap.set(watermarkContainer, root);
  }

  // Render atau update komponen watermark
  root.render(<Watermark />);

  // Pastikan watermark tetap di akhir
  const moveWatermarkToEnd = () => {
    if (body.lastChild !== watermarkContainer) {
      body.appendChild(watermarkContainer);
    }
  };

  // Observer untuk mendeteksi perubahan
  const observer = new MutationObserver(() => {
    moveWatermarkToEnd();
  });

  observer.observe(body, { childList: true, subtree: false });

  moveWatermarkToEnd();
};

export const getAllComponents = (editor) => {
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
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(undefined);
  const [activeTab, setActiveTab] = useState("components");
  const [canvasComponents, setCanvasComponents] = useState([]);

  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedComponent && selectedComponent.get("type") === "wrapper") {
      dispatch(setIsEditComponent(false));
    }
  }, [dispatch, selectedComponent]);

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
    onCustomToolbar(editor);

    editor.on("load", () => {
      injectExternalCSS(editor);
      updateCanvasComponents(editor, setCanvasComponents);
      handleFocusDropComponent(editor);
      addGlobalOptions(editor);
      handleAddWatermark(editor);
    });

    editor.on("component:add", () => {
      updateCanvasComponents(editor, setCanvasComponents);
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

    const intialStateGlobalData = {
      maxWidthPage: 1360,
      bgColor: "",
      scrollTarget: [
        { id: "target-01", value: "scrollToTop", label: "Scroll To Top" },
      ],
      popup: [],
    };

    // Set global options
    editorModel.set("globalOptions", intialStateGlobalData);
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
          <div className="flex flex-col h-screen overflow-auto">
            {/* Custom Navbar */}
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

            {/* Main Content with Sidebar */}
            <div className="flex flex-row  h-full  ">
              {isPreviewActive ? null : (
                <WithEditor>
                  <Sidebar
                    selectedComponent={selectedComponent}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setCanvasComponents={setCanvasComponents}
                  />
                </WithEditor>
              )}

              <div
                className={`flex-1 relative overflow-y-auto ${
                  isDragging && "flex"
                } bg-[#FFF4EA] justify-center items-center`}
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
            </div>
          </div>
        </div>
      </GjsEditor>
    </div>
  );
};

export default MainWebEditor;
