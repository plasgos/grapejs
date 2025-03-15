import ViewEmptySpace from "@/view/empty-space";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { FaRegSquare } from "react-icons/fa6";

export const registerEmptySpace = (editor) => {
  editor.BlockManager.add("empty-space", {
    label: "Empty Space",
    category: "Contents",
    content: { type: "empty-space" },
    activate: true,
    media: renderToString(<FaRegSquare size={40} />),
  });

  editor.Components.addType("empty-space", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        removable: false, // Nonaktifkan penghapusan
        copyable: false, // Nonaktifkan copy
        toolbar: [], // Hilangkan toolbar
        noMove: true, // Nonaktifkan pergerakan (sorting)
        noResize: true, // Nonaktifkan perubahan ukuran
        attributes: {},
        category: "Contents",
        blockLabel: "Empty Space",
        blockIcon: <FaRegSquare size={20} />,
        customComponent: {
          scrollTarget: undefined,
          wrapperStyle: {
            height: 50,
          },
        },
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
          this.root = createRoot(this.el); // Hanya buat satu instance root
        }

        this.root.render(
          <ViewEmptySpace
            section={this.model.get("customComponent")}
            editor={editor}
          />
        );
      },
    },
    remove() {
      if (this.reactRoot) {
        this.reactRoot.unmount();
      }
    },
  });
};
