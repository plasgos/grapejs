import slider1 from "@/assets/slider1.jpg";
import slider2 from "@/assets/slider2.jpg";
import slider3 from "@/assets/slider3.jpg";
import slider4 from "@/assets/slider4.jpg";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

import ViewSliderImages from "@/view/slider-images";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

export const registerSliderImages = (editor) => {
  editor.BlockManager.add("slider-images", {
    label: "Slider Images",
    category: "Contents",
    content: { type: "slider-images" },
    activate: true,
    media: renderToString(<TfiLayoutSliderAlt size={40} />),
  });

  editor.Components.addType("slider-images", {
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
        blockLabel: "Slider Images",
        blockIcon: <TfiLayoutSliderAlt size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "slider-01",
              image: slider1,
              alt: "",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
            {
              id: "slider-02",
              image: slider2,
              alt: "",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
            {
              id: "slider-03",
              image: slider3,
              alt: "",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
            {
              id: "slider-04",
              image: slider4,
              alt: "",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
          ],
          wrapperStyle: {
            aspectRatio: 5 / 2,
            autoSlide: null,
            transitions: "scroll",
            width: 800,
            variant: "full-slider",
            pagination: false,
            navigation: true,
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

        this.renderReactComponent();
      },

      renderReactComponent() {
        if (!this.root) {
          this.root = createRoot(this.el); // Hanya buat satu instance root
        }

        this.root.render(
          <ViewSliderImages
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
