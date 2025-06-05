import store from "@/redux/store";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

import { Provider } from "react-redux";
import WrapperViewComponent from "./WrapperViewComponent";
import { generateId } from "@/lib/utils";

export const injectComponents = (editor, options) => {
  const {
    type,
    label,
    category = "Contents",
    icon,
    ViewComponent,
    defaultCustomComponent,
  } = options;

  editor.BlockManager.add(type, {
    label,
    category,
    content: { type },
    activate: true,
    media: renderToString(icon),
    attributes: {
      isLocked: defaultCustomComponent?.isLocked ?? false,
    },
  });

  editor.Components.addType(type, {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: (target) => {
          const allowedParents = [
            "split-text",
            "button-content",
            "custom-text",
            "text-element",
          ];
          const parentType = target?.get("type");
          return allowedParents.includes(parentType);
        },
        selectable: true,
        highlightable: true,
        hoverable: true,
        removable: false,
        copyable: false,
        toolbar: [],
        components: [],

        // noMove: true,
        // noResize: true,
        attributes: {},
        category,
        blockLabel: label,
        blockIcon: icon,
        customComponent: defaultCustomComponent,
      },

      init() {
        const attrs = this.get("attributes") || {};
        const hasAIAttributes = this.get("isFromAI");
        const existingCustomComponent = this.get("customComponent");

        const listTypeDefaultComponents = ["footer", "navbar"];

        this.set(
          "customComponent",
          hasAIAttributes && listTypeDefaultComponents.includes(type)
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
            <WrapperViewComponent
              id={generateId()}
              ViewComponent={ViewComponent}
              editor={editor}
              section={this.model.get("customComponent")}
              childrenModels={childrenModels}
              buildContainerStyle={null}
              buildChildComponents={null}
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

export const injectELements = (editor, options) => {
  const {
    type,
    label,
    category = "Contents",
    icon,
    ViewComponent,
    defaultCustomComponent,
  } = options;

  editor.BlockManager.add(type, {
    label,
    category,
    content: { type },
    activate: true,
    media: renderToString(icon),
    attributes: {
      isLocked: defaultCustomComponent?.isLocked ?? false,
    },
  });

  editor.Components.addType(type, {
    model: {
      defaults: {
        tagName: "div",
        style: {
          display: "inline-block", // ini penting!
          maxWidth: "100%",
          height: "auto", // atau default sesuai kebutuhan
          position: "relative", // untuk bisa dipindahkan
        },
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        removable: false,
        copyable: false,
        toolbar: [],
        components: [],
        resizable: {
          tl: true, // top-left
          tc: true, // top-center
          tr: true, // top-right
          cl: true, // center-left
          cr: true, // center-right
          bl: true, // bottom-left
          bc: true, // bottom-center
          br: true, // bottom-right
          keyWidth: "width",
          keyHeight: "height",
          currentUnit: "px",
          minDim: 10,
        },

        noMove: false,
        noResize: true,
        attributes: {},
        category,
        blockLabel: label,
        blockIcon: icon,
        customComponent: defaultCustomComponent,
      },

      init() {
        const attrs = this.get("attributes") || {};
        const hasAIAttributes = this.get("isFromAI");
        const existingCustomComponent = this.get("customComponent");

        const listTypeDefaultComponents = ["footer", "navbar"];

        this.set(
          "customComponent",
          hasAIAttributes && listTypeDefaultComponents.includes(type)
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

        const id = this.model.cid;

        this.root.render(
          <Provider store={store}>
            <ViewComponent
              section={this.model.get("customComponent")}
              editor={editor}
              viewId={id}
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
