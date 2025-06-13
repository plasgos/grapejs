import { produce } from "immer";
import { useState } from "react";
import { useEffect, useReducer } from "react";
import { createRoot } from "react-dom/client";
import { IoCloseSharp } from "react-icons/io5";
import { VscMultipleWindows } from "react-icons/vsc";

const Popup = ({ component, section, editor }) => {
  const [currentStyles, setCurrentStyles] = useState(component.getStyle());
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    if (component) {
      const update = () => forceUpdate();
      component.on("change:style", update);

      return () => {
        component.off("change:style", update);
      };
    }
  }, [component]);

  const handleStyleWrapperChange = (key, value) => {
    const parentComponent = component?.parent();

    const parentStyle = parentComponent.getStyle();
    const update = (current) => {
      return produce(current, (draft) => {
        draft[key] = value;
      });
    };

    parentComponent.setStyle(update(parentStyle));
    setCurrentStyles(update(parentStyle));
  };

  return (
    <div
      style={{
        backgroundColor: currentStyles["background-color"],
      }}
      className="  flex justify-between sticky top-0 bg-white z-10 p-3"
    >
      <p className="text-4xl font-semibold">Header Modal</p>

      <IoCloseSharp
        onClick={() => {
          handleStyleWrapperChange("display", "none");
        }}
        style={{
          right: -10,
        }}
        className="absolute text-muted-foreground cursor-pointer hover:scale-125 transition-all ease-out  "
        size={32}
      />
    </div>
  );
};

const defaultCustomComponent = {
  scrollTarget: undefined,
  popupId: "",
  isPreviewModal: false,
  popupModalOption: {
    typeOpen: "immediately",
    delayDuration: 3000,
  },
  contents: [],
  wrapperStyle: {
    popupName: "popup-01",
    rounded: 10,
    isPopupShown: true,
    width: 700,
    appearEffect: "animate__fadeInUp",
  },
  background: {
    bgType: null,
    bgColor: "",
    bgImage: "",
    blur: 0,
    opacity: 0,
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    direction: "to right",
    fromColor: "",
    toColor: "",
    isRevert: false,
    pattern: "",
    rounded: 0,
    isFullWidth: false,
  },
};

export const modalPopupComponent = (editor) => {
  editor.Components.addType("modal-popup", {
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
        attributes: {},
        blockLabel: "Popup",
        blockIcon: <VscMultipleWindows />,
        // customComponent: defaultCustomComponent,
        style: {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          "background-color": "rgba(0, 0, 0, 0.4)",
          "z-index": "9999",
        },
        components: [
          {
            type: "modal-content",
          },
        ],
      },
    },
  });

  editor.Components.addType("modal-content", {
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
          padding: "0px 20px 20px 20px",
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
