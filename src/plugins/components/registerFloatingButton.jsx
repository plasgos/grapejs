import ViewFLoatingButton from "@/view/floating-button";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { CiSquareMore } from "react-icons/ci";

export const registerFloatingButton = (editor) => {
  editor.BlockManager.add("floating-button", {
    label: "Floating Button",
    category: "Floating Widgets",
    content: { type: "floating-button" },
    activate: true,
    media: renderToString(<CiSquareMore size={40} />),
  });

  editor.Components.addType("floating-button", {
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
        blockLabel: "Floating Button ",
        blockIcon: <CiSquareMore size={20} />,
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
                rounded: 10,

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
            {
              id: "button-02",
              stylesBtn: {
                title: "Get Started",
                btnColor: "rgba(126,211,33,100)",
                textColor: "",
                size: "default",
                variant: "default",
                shadow: "",
                rounded: 10,
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
            space: 20,
            position: "flex-row",
            shadow: "shadow",
          },
          background: {
            bgType: null,
            bgColor: "#2196f3",
            bgImage: "",
            blur: 0,
            opacity: 0,
            paddingY: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingType: "vertical",
            direction: "to right",
            fromColor: "",
            toColor: "",
            isRevert: false,
            pattern: "",
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
          <ViewFLoatingButton
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
