import ViewFeatureHighlights from "@/view/feature-highlights";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { PiListChecksBold } from "react-icons/pi";

export const registerFeatureHighlights = (editor) => {
  editor.BlockManager.add("feature-highlights", {
    label: "Feature Highlights",
    category: "Contents",
    content: { type: "feature-highlights" },
    activate: true,
    media: renderToString(<PiListChecksBold size={40} />),
  });

  editor.Components.addType("feature-highlights", {
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
        blockLabel: "Feature Highlights",
        blockIcon: <PiListChecksBold size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "feature-01",
              title: "Rasakan Bedanya dalam Satu Sentuhan!",
              iconBtn: {
                icon: "FaCheckCircle",
                color: "rgba(126,211,33,1)",
                size: 24,
                position: "left",
              },
              isFocused: false,
            },
            {
              id: "feature-02",
              title: "Inovasi Terbaru untuk Keseharian Anda.",
              iconBtn: {
                icon: "FaCheckCircle",
                color: "rgba(126,211,33,1)",
                size: 24,
                position: "left",
              },
              isFocused: false,
            },
            {
              id: "feature-03",
              title: "Solusi Cerdas untuk Hidup Lebih Nyaman.",
              iconBtn: {
                icon: "FaCheckCircle",
                color: "rgba(126,211,33,1)",
                size: 24,
                position: "left",
              },
              isFocused: false,
            },
            {
              id: "feature-04",
              title: "Transformasi Mudah, Hasil Maksimal.",
              iconBtn: {
                icon: "FaCheckCircle",
                color: "rgba(126,211,33,1)",
                size: 24,
                position: "left",
              },
              isFocused: false,
            },
          ],
          wrapperStyle: {
            space: 20,
            textShadow: null,
            color: "#000000",
            fontWeight: "font-semibold",
            fontFamily: "Roboto",
            fontSize: 16,
            textAligment: "justify-center",
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
          animation: {
            type: null,
            duration: 1,
            delay: null,
            isReplay: false,
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
          <ViewFeatureHighlights
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
