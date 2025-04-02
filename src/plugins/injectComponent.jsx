import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

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

        this.root.render(
          <ViewComponent
            section={this.model.get("customComponent")}
            editor={editor}
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
