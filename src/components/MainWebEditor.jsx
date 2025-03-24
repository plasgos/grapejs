import GjsEditor, { Canvas, WithEditor } from "@grapesjs/react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { renderToStaticMarkup } from "react-dom/server";
import "../index.css";
import "animate.css";

import { createRoot } from "react-dom/client";
import Watermark from "./Watermark";

import basicPlugin from "grapesjs-blocks-basic";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import plasgosPlugin from "@/plugins";
import animateCSS from "animate.css/animate.min.css?inline";

import swiperCSS from "swiper/swiper-bundle.css?inline";
import datepickerCSS from "react-datepicker/dist/react-datepicker.css?inline";

export const onAddingDatepickerCss = (editor) => {
  const frame = editor.Canvas.getFrameEl();
  const frameDoc = frame?.contentDocument;

  if (frameDoc) {
    // Cek apakah Datepicker CSS sudah ada
    if (!frameDoc.querySelector("#datepicker-css")) {
      const style = frameDoc.createElement("style");
      style.id = "datepicker-css";
      style.innerHTML = datepickerCSS;
      frameDoc.head.appendChild(style);
    }
  }
};

export const onAddingSwiperCss = (editor) => {
  const frame = editor.Canvas.getFrameEl();
  const frameDoc = frame?.contentDocument;

  if (frameDoc) {
    // Cek apakah Swiper CSS sudah ada
    if (!frameDoc.querySelector("#swiper-css")) {
      const style = frameDoc.createElement("style");
      style.id = "swiper-css";
      style.innerHTML = swiperCSS;
      frameDoc.head.appendChild(style);
    }
  }
};

export const onAddingAnimateCss = (editor) => {
  const frame = editor.Canvas.getFrameEl();
  const frameDoc = frame?.contentDocument;

  if (frameDoc) {
    // Cek apakah animate.css sudah ada
    if (!frameDoc.querySelector("#animate-css")) {
      const style = frameDoc.createElement("style");
      style.id = "animate-css";
      style.innerHTML = animateCSS;
      frameDoc.head.appendChild(style);
    }
  }
};

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

export const injectTailwindCss = (editor) => {
  const canvasDoc = editor.Canvas.getFrameEl().contentDocument;
  const head = canvasDoc.head;

  // Ambil file Tailwind dari yang sudah ada di project
  const tailwindStyle = document.createElement("link");
  tailwindStyle.rel = "stylesheet";
  tailwindStyle.href = "/src/index.css";
  head.appendChild(tailwindStyle);
};

export const injectCustomAnimate = (editor) => {
  const canvasDoc = editor.Canvas.getFrameEl().contentDocument;
  const head = canvasDoc.head;

  // Ambil file Tailwind dari yang sudah ada di project
  const tailwindStyle = document.createElement("link");
  tailwindStyle.rel = "stylesheet";
  tailwindStyle.href = "/animation.css";
  head.appendChild(tailwindStyle);
};

const MainWebEditor = () => {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(undefined);
  const [activeTab, setActiveTab] = useState("components");
  const [canvasComponents, setCanvasComponents] = useState([]);

  const [isDragging, setIsDragging] = useState(false);

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
    handleAddWatermark(editor);
    handleFocusDropComponent(editor);
    onCustomToolbar(editor);

    editor.on("load", () => {
      injectTailwindCss(editor);
      onAddingAnimateCss(editor);
      onAddingSwiperCss(editor);
      onAddingDatepickerCss(editor);
      updateCanvasComponents(editor, setCanvasComponents);
      handleAddWatermark(editor);
    });

    editor.on("component:add", () => {
      updateCanvasComponents(editor, setCanvasComponents);
      handleAddWatermark(editor);
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

    editor.setStyle(`
      .gjs-dashed *[data-gjs-highlightable] {
          outline: 1px dashed black !important;
          outline-offset: -2px;
      }
    `);

    setTimeout(() => {
      const iframe = editor?.Canvas?.getDocument();
      if (iframe) {
        const styleLink = iframe.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = "/animation.css";
        iframe.head.appendChild(styleLink);
      }
    }, 500); // Delay 500ms untuk memberi waktu iframe dimuat

    const handleComponentSelected = (model) => {
      setSelectedComponent(model);
      setActiveTab("components");
    };

    editor.on("component:selected", handleComponentSelected);

    editor.on("load", () => {
      const editorModel = editor.getModel();

      const intialStateGlobalData = {
        scrollTarget: [{ value: "scrollToTop", label: "Scroll To Top" }],
        popup: [],
      };

      // Set global options
      editorModel.set("globalOptions", intialStateGlobalData);
    });

    overrideDeleteCommand(editor);
    overrideCopyCommand(editor);
  };

  const overrideDeleteCommand = (editor) => {
    // Override fungsi delete default
    editor.Commands.add("core:component-delete", {
      run(editor) {
        const editorModel = editor.getModel();

        const globalOptions = editorModel.get("globalOptions");

        const selected = editor.getSelected();
        console.log("🚀 ~ run ~ selected:", selected);
        if (selected) {
          if (selected.get("type") === "modal-popup") {
            console.log("REMOVE POPUP");

            editorModel.set("globalOptions", {
              ...globalOptions,
              popup: globalOptions.popup.filter(
                (opt) => opt.id !== selected.get("customComponent").popupId
              ),
            });

            selected.remove();
          } else {
            selected.remove();
          }

          editor.select(editor.getWrapper());
        }
      },
    });
  };

  const overrideCopyCommand = (editor) => {
    const originalCopy = editor.Commands.get("core:copy");

    editor.Commands.add("core:copy", {
      run(editor) {
        const selected = editor.getSelected();
        if (!selected) return;

        originalCopy.run(editor); // Jalankan copy bawaan

        // Setelah copy, pilih wrapper
        editor.select(editor.getWrapper());
      },
    });
  };

  const handleFocusDropComponent = (editor) => {
    editor.on("load", () => {
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
    });
  };

  const onCustomToolbar = (editor) => {
    editor.on("component:selected", (component) => {
      const wrapper = editor.getWrapper();

      // Kondisikan jika komponen yang dipilih adalah modal-popup
      if (component.get("type") === "modal-popup") {
        // Menampilkan hanya toolbar delete pada modal-popup
        const customToolbar = [
          {
            id: "custom-tool-2",
            attributes: {
              title: "Remove",
            },
            label: renderToStaticMarkup(<FaTrashAlt />),
            command: "core:component-delete", // Perintah custom delete
          },
        ];

        // Menambahkan toolbar custom (hanya delete) ke komponen modal-popup
        component.set("toolbar", customToolbar);
        return;
      }

      // Cek apakah komponen yang dipilih adalah wrapper atau tidak
      if (component === wrapper) {
        component.set("toolbar", []); // Hilangkan toolbar jika wrapper dipilih
        return;
      }
      // Menghapus toolbar bawaan dengan mengatur toolbar menjadi array kosong
      component.set("toolbar", []);

      // Membuat toolbar custom
      const customToolbar = [
        {
          id: "custom-tool-1",
          attributes: {
            class: "fa fa-plus", // Ganti dengan icon yang sesuai
            title: "Custom Tool 1",
          },
          command: "custom-tool-cmd-1", // Perintah custom
        },
        {
          id: "custom-copy",
          attributes: {
            title: "Copy",
          },
          label: renderToStaticMarkup(<IoCopyOutline />),
          command: "custom-copy", // Perintah custom-copy
        },
        {
          id: "custom-tool-2",
          attributes: {
            title: "Remove",
          },
          label: renderToStaticMarkup(<FaTrashAlt />),
          command: "core:component-delete", // Perintah custom
        },
        // Anda dapat menambahkan lebih banyak item toolbar custom di sini
      ];

      // Menambahkan toolbar custom ke komponen yang dipilih
      component.set("toolbar", customToolbar);
    });

    // Menambahkan perintah custom ke editor
    editor.Commands.add("custom-tool-cmd-1", {
      run(editor) {
        // Logika perintah untuk tool custom 1
        console.log("Custom Tool 1 activated!");
      },
    });

    editor.Commands.add("custom-copy", {
      run(editor) {
        const selected = editor.getSelected();

        if (selected) {
          const clonedComponent = selected.clone(); // Mengkloning komponen yang dipilih
          // const clonedComponent = selected.model.clone();

          const parent = selected.parent();

          if (parent) {
            // Find the index of the original component within the parent container
            const components = parent.get("components");
            const currentIndex = components.indexOf(selected); // Find index of the original component

            // Append the cloned component right after the original component
            parent.append(clonedComponent, { at: currentIndex + 1 });
          }

          // Select the cloned component
          editor.select(clonedComponent);

          // Get the DOM element of the cloned component
          const clonedElement = clonedComponent.view.el;

          // Scroll the page to the cloned component
          if (clonedElement) {
            clonedElement.scrollIntoView({
              behavior: "smooth", // Smooth scroll
              block: "center", // Scroll to the center of the screen
            });
          }
        }
      },
    });

    editor.Commands.add("custom-tool-cmd-2", {
      run(editor) {
        // Logika perintah untuk tool custom 2
        console.log("Custom Tool 2 activated!");
      },
    });
  };

  return (
    <div>
      <GjsEditor
        onEditor={handleEditorInit}
        grapesjs={grapesjs}
        plugins={[basicPlugin, plasgosPlugin]}
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
                    components={canvasComponents}
                    onReorder={handleReorder}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setIsDragging={setIsDragging}
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
