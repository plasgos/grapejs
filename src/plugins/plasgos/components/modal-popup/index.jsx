import { produce } from "immer";
import { useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { IoCloseSharp } from "react-icons/io5";
import { VscMultipleWindows } from "react-icons/vsc";

const Popup = ({ component, section, editor, childrenModels }) => {
  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");
  const { typeOpen, delayDuration } = section;

  const parent = component.parent();
  const el = parent.view?.el;
  const popupId = parent.getId();

  const handleStyleWrapperChange = useCallback(
    (key, value) => {
      const parentComponent = component?.parent();

      const parentStyle = parentComponent.getStyle();
      const update = (current) => {
        return produce(current, (draft) => {
          draft[key] = value;
        });
      };

      parentComponent.setStyle(update(parentStyle));

      if (el && value === "flex") {
        el.classList.remove("animate-out", "fade-out-5", "duration-300");
        el.classList.add("animate-in", "fade-in-5", "duration-300");
      } else {
        setTimeout(() => {
          el.classList.remove("animate-in", "fade-in-5", "duration-300");
          el.classList.add("animate-out", "fade-out-5", "duration-300");
        }, 300);
      }
    },
    [component, el]
  );

  useEffect(() => {
    if (typeOpen === "immediately") {
      handleStyleWrapperChange("display", "flex");
    } else if (typeOpen === "delay" && delayDuration) {
      setTimeout(() => {
        handleStyleWrapperChange("display", "flex");
      }, delayDuration);
    } else if (typeOpen === "onClick" && globalOptions.popup.length > 0) {
      const selectedPopup = globalOptions.popup.find(
        (popup) => popup.id === popupId
      );

      if (selectedPopup?.isShown) {
        handleStyleWrapperChange("display", "flex");
      }
    }
  }, [
    delayDuration,
    globalOptions.popup,
    handleStyleWrapperChange,
    popupId,
    section,
    typeOpen,
  ]);

  const handleClose = () => {
    if (typeOpen === "onClick" && globalOptions.popup.length > 0) {
      const selectedPopup = globalOptions.popup.find(
        (popup) => popup.id === popupId
      );

      if (selectedPopup) {
        editorModel.set("globalOptions", {
          ...globalOptions,
          popup: globalOptions.popup.map((item) =>
            item.id === selectedPopup.id
              ? {
                  ...item,
                  isShown: false,
                }
              : item
          ),
        });
      }

      handleStyleWrapperChange("display", "none");
    } else {
      handleStyleWrapperChange("display", "none");
    }
  };

  return (
    <>
      <IoCloseSharp
        onClick={handleClose}
        style={{
          right: 0,
          top: 0,
        }}
        className="sticky ml-auto text-muted-foreground cursor-pointer hover:scale-125 transition-all ease-out z-50 shadow-sm  "
        size={32}
      />

      {/* 🔽 Tambahkan ini untuk render children */}
      {/* <div className="children-wrapper">
        {childrenModels?.map((child) => {
          const el = child.view?.el;
          return el ? (
            <div key={child.cid} ref={(ref) => ref && ref.appendChild(el)} />
          ) : null;
        })}
      </div> */}
    </>
  );
};

const defaultCustomComponent = {
  scrollTarget: undefined,
  isPreviewModal: false,
  typeOpen: "immediately",
  delayDuration: 3000,
  contents: [],
  wrapperStyle: {
    popupName: "popup-01",
    rounded: 10,
    isPopupShown: true,
    width: 700,
    appearEffect: "animate__fadeInUp",
  },
};

export const modalPopupComponent = (editor) => {
  editor.Components.addType("popup-wrapper", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        stylable: false,
        selectable: true,
        highlightable: false,
        toolbar: [],
        hoverable: false,
        category: "popup",
        attributes: { class: "transition-opacity" },
        blockLabel: "Popup",
        blockIcon: <VscMultipleWindows />,
        style: {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          display: "none",
          "justify-content": "center",
          "align-items": "center",
          "background-color": "rgba(0, 0, 0, 0.4)",
          "z-index": "9999",
        },
        components: [
          {
            type: "popup-content",
          },
        ],
      },
    },
  });

  editor.Components.addType("popup-content", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: (component) => {
          const type = component.get("type");
          return !type.startsWith("floating-");
        },
        stylable: true,
        highlightable: false,
        selectable: true,
        toolbar: [],
        hoverable: false,
        category: "popup",
        attributes: {},
        customComponent: defaultCustomComponent,
        style: {
          "background-color": "white",
          padding: "20px",
          "border-radius": "8px",
          width: "70%",
          "min-height": "300px",
          "max-height": "600px",
          "overflow-y": "auto",
          position: "relative",
        },
        components: [
          {
            type: "countdown",
          },
        ],
      },

      init() {
        const attrs = this.get("attributes") || {};
        const hasAIAttributes = this.get("isFromAI");
        const existingCustomComponent = this.get("customComponent");

        const listTypeDefaultComponents = ["footer", "navbar"];

        this.set(
          "customComponent",
          hasAIAttributes && listTypeDefaultComponents.includes("modal-content")
            ? { ...defaultCustomComponent }
            : hasAIAttributes
            ? { ...attrs }
            : { ...(existingCustomComponent || {}) }
        );
      },
    },

    view: {
      init() {
        this.listenTo(
          this.model,
          "change:customComponent",
          this.renderReactComponent
        );

        this.listenTo(this.model, "change:style", this.renderReactComponent);

        const editorModel = editor.getModel();
        this.listenTo(
          editorModel,
          "change:globalOptions",
          this.handleGlobalOptionsChange
        );

        this.renderReactComponent();
      },

      handleGlobalOptionsChange() {
        this.renderReactComponent();
      },

      renderReactComponent() {
        if (!this.root) {
          this.root = createRoot(this.el);
        }

        this.root.render(
          <Popup
            editor={editor}
            component={this.model}
            section={this.model.get("customComponent")}
            childrenModels={this.model.components()}
          />
        );
      },
    },
    remove() {
      if (this.root) {
        this.root.unmount();
      }
    },
  });
};
