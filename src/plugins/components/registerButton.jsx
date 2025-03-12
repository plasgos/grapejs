import ViewButton from "@/view/button";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { TbSquareRoundedLetterBFilled } from "react-icons/tb";

export const registerButton = (editor) => {
  editor.BlockManager.add("button-content", {
    label: "Button",
    category: "Contents",
    content: { type: "button-content" },
    activate: true,
    media: renderToString(<TbSquareRoundedLetterBFilled size={40} />),
  });

  editor.Components.addType("button-content", {
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
        blockLabel: "Button",
        blockIcon: <TbSquareRoundedLetterBFilled size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "button-01",
              stylesBtn: {
                title: "Get Started",
                btnColor: "",
                textColor: "",
                size: "default",
                variant: "default",
                rounded: 10,

                shadow: "",
              },
              iconBtn: {
                icon: "",
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
                title: "Start Demo",
                btnColor: "rgb(228 223 223 ,1)",
                textColor: "",
                size: "default",
                variant: "outline",
                shadow: "",
                rounded: 10,
              },
              iconBtn: {
                icon: "",
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
            align: "justify-center",
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
          <ViewButton
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
