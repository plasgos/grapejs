import store from "@/redux/store";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

import { Provider } from "react-redux";

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
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        removable: false,
        copyable: false,
        toolbar: [],
        noMove: true,
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

        //ths action for monitoring schema colours index component
        if (this.model.collection) {
          this.listenTo(this.model.collection, "add remove reset sort", () => {
            this.renderReactComponent();
          });
        }

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
          <Provider store={store}>
            <ViewComponent
              section={this.model.get("customComponent")}
              editor={editor}
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
