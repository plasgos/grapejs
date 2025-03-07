import products1 from "@/assets/products1.webp";
import products2 from "@/assets/products2.webp";
import products3 from "@/assets/products3.webp";
import { generateId } from "@/lib/utils";
import ViewListImages from "@/view/list-images";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { FaRegImages } from "react-icons/fa";
export const registerListImages = (editor, canvasFrame) => {
  editor.BlockManager.add("list-images", {
    label: "List Images",
    category: "Contents",
    content: { type: "list-images" },
    activate: true,
    media: renderToString(<FaRegImages size={40} />),
  });

  editor.Components.addType("list-images", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        attributes: {},
        blockLabel: "List Images",
        category: "Contents",
        blockIcon: <FaRegImages size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: generateId(),
              image: products1,
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
              isFocused: false,
            },
            {
              id: generateId(),
              image: products2,
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
              isFocused: false,
            },
            {
              id: generateId(),
              image: products3,
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
            column: "3",
            aspectRatio: 1 / 1,
          },
          background: {
            bgType: null,
            bgColor: "",
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

        this.renderReactComponent();
      },

      renderReactComponent() {
        if (!this.root) {
          this.root = createRoot(this.el); // Hanya buat satu instance root
        }

        this.root.render(
          <ViewListImages
            section={this.model.get("customComponent")}
            canvas={canvasFrame}
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
