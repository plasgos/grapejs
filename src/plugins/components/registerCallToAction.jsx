import CallToAction from "@/view/call-to-action";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { MdOutlineCallToAction } from "react-icons/md";

export const registerCallToAction = (editor, canvasFrame) => {
  editor.BlockManager.add("call-to-action", {
    label: "Call To Action",
    category: "Contents",
    content: { type: "call-to-action" },
    activate: true,
    media: renderToString(<MdOutlineCallToAction size={40} />),
  });

  editor.Components.addType("call-to-action", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        attributes: {},
        blockLabel: "Call To Action",
        category: "Contents",
        blockIcon: <MdOutlineCallToAction size={20} />,
        isDragging: false,
        customComponent: {
          scrollTarget: undefined,
          content: {
            title: "Join Us Today!",
            description: "Sign up now and get access to exclusive content.",
            buttonText: "Sign Up",
            stylesBtn: {
              btnColor: "",
              textColor: "",
              size: "md",
              variant: "fill",
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
            animation: {
              type: null,
              duration: 1,
              isReplay: false,
            },
          },
          background: {
            bgType: "bgColor",
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
          "change:customComponent change:isDragging",
          this.renderReactComponent
        );
        this.renderReactComponent();
      },

      renderReactComponent() {
        if (!this.root) {
          this.root = createRoot(this.el); // Hanya buat satu instance root
        }

        this.root.render(
          <CallToAction
            section={this.model.get("customComponent")}
            canvas={canvasFrame}
            isDragging={this.model.get("isDragging")}
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
