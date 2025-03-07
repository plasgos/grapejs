import products1 from "@/assets/products1.webp";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

import ViewImage from "@/view/image";
import { FaImage } from "react-icons/fa6";

export const registerImage = (editor) => {
  editor.BlockManager.add("image-content", {
    label: "Image",
    category: "Contents",
    content: { type: "image-content" },
    activate: true,
    media: renderToString(<FaImage size={40} />),
  });

  editor.Components.addType("image-content", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        attributes: {},
        blockLabel: "Image",
        category: "Contents",
        blockIcon: <FaImage size={20} />,
        isDragging: false,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "img-01",
              image: products1,
              alt: "",
              isDownloadImage: false,
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
          ],
          wrapperStyle: {
            width: 500,
            rotation: 0,
            borderColor: "",
            shadow: "shadow-none",
            variant: "centerPage",
          },
          animation: {
            type: null,
            duration: 1,
            delay: null,
            isReplay: false,
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

        this.root.render(
          <ViewImage
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
