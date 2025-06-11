import store from "@/redux/store";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { VscMultipleWindows } from "react-icons/vsc";
import { Provider } from "react-redux";
import ModalPopup from "./view";

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
  editor.BlockManager.add("modal-popup", {
    label: "Modal Popup",
    content: { type: "modal-popup" },
    category: "Popup",
    activate: true,
    media: renderToString(<VscMultipleWindows />),
    attributes: {
      isLocked: false,
    },
  });

  editor.Components.addType("modal-popup", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        selectable: true,
        highlightable: true,
        hoverable: true,
        removable: false,
        copyable: false,
        toolbar: [],
        components: [],
        attributes: { "data-slot": "modal-children" },

        // noMove: true,
        // noResize: true,
        // attributes: {},
        category: "Popup",
        blockLabel: "Modal Popup",
        blockIcon: <VscMultipleWindows />,
        customComponent: defaultCustomComponent,
      },

      init() {
        const attrs = this.get("attributes") || {};
        const hasAIAttributes = this.get("isFromAI");
        const existingCustomComponent = this.get("customComponent");

        const listTypeDefaultComponents = ["footer", "navbar"];

        this.set(
          "customComponent",
          hasAIAttributes && listTypeDefaultComponents.includes("modal-popup")
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

        const childrenModels = this.model.components();

        this.root.render(
          <Provider store={store}>
            <ModalPopup
              editor={editor}
              section={this.model.get("customComponent")}
              childrenModels={childrenModels}
              buildContainerStyle={null}
            />
          </Provider>
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
