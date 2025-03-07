import ViewFLoatingButtonCircle from "@/view/floating-button-circle";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { IoIosRadioButtonOn } from "react-icons/io";

export const registerFloatingButtonCircle = (editor) => {
  editor.BlockManager.add("floating-button-circle", {
    label: "Floating Button Circle",
    category: "Floating Widgets",
    content: { type: "floating-button-circle" },
    activate: true,
    media: renderToString(<IoIosRadioButtonOn size={40} />),
  });

  editor.Components.addType("floating-button-circle", {
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
        category: "Floating Widgets",
        blockLabel: "Floating Button Circle",
        blockIcon: <IoIosRadioButtonOn size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "button-01",
              stylesBtn: {
                title: "Get Started",
                btnColor: "rgba(126,211,33,100)",
                textColor: "",
                size: "default",
                variant: "default",
                shadow: "",
              },
              iconBtn: {
                icon: "FaWhatsapp",
                color: "rgba(0,0,0,0,1)",
                size: 24,
                position: "right",
              },
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
              isFocused: false,
            },
          ],
          wrapperStyle: {
            position: 20,
            space: 20,
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
          <ViewFLoatingButtonCircle
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
