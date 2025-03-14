import ViewDivider from "@/view/divider";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { RxDividerHorizontal } from "react-icons/rx";

// divider style
// -single ,double , double with icon , single with icon, dahsed
export const registerDivider = (editor) => {
  editor.BlockManager.add("divider", {
    label: "Divider",
    category: "Contents",
    content: { type: "divider" },
    activate: true,
    media: renderToString(<RxDividerHorizontal size={40} />),
  });

  editor.Components.addType("divider", {
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
        blockLabel: "Divider",
        blockIcon: <RxDividerHorizontal size={20} />,
        customComponent: {
          scrollTarget: undefined,
          wrapperStyle: {
            variant: "solid",
            width: 30,
            gap: 10,
            color: "rgba(19, 86, 236, 0.8)",
            color2: "rgba(236, 146, 19, 0.8)",
            iconBtn: {
              icon: "",
              color: "rgba(0,0,0,0,1)",
              size: 24,
              position: "right",
            },
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

        // const globalOptions = editor.getModel().get("globalOptions");

        this.root.render(
          <ViewDivider
            section={this.model.get("customComponent")}
            editor={editor}
            // globalOptions={globalOptions}
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
