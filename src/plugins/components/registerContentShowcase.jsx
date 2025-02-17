import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { HiMiniViewColumns } from "react-icons/hi2";
import products1 from "@/assets/products1.webp";
import products2 from "@/assets/products2.webp";
import products3 from "@/assets/products3.webp";
import ContentShowcase from "@/view/content-showcase";
import { generateId } from "@/lib/utils";

export const registerContentShowcase = (editor, canvasFrame) => {
  editor.BlockManager.add("content-showcase", {
    label: "Content Showcase",
    category: "Custom Widgets",
    content: { type: "content-showcase" },
    activate: true,
    media: renderToString(<HiMiniViewColumns size={40} />),
  });

  editor.Components.addType("content-showcase", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        attributes: {},
        blockLabel: "Content Showcase",
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: generateId(),
              title: "Panduan Lengkap Memulai Bisnis Online",
              description:
                "Temukan langkah-langkah praktis memulai bisnis online dari nol. Pelajari strategi pemasaran, manajemen produk, dan tips meningkatkan penjualan secara efektif.",
              image: products1,
              target: {
                actionType: "link",
                options: {
                  isOpenNewTab: true,
                  link: "https://www.youtube.com/",
                  type: "url",
                },
              },
              isFocused: false,
            },
            {
              id: generateId(),
              title: "Tips Meningkatkan Kualitas Produk Anda",
              description:
                "Pelajari cara meningkatkan kualitas produk Anda dengan bahan terbaik dan proses produksi yang efisien. Dapatkan kepercayaan pelanggan dan tingkatkan loyalitas merek.",
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
              title: "Langkah Menciptakan Produk Inovatif",
              description:
                "Ketahui langkah-langkah menciptakan produk inovatif yang memenuhi kebutuhan pasar. Mulai dari riset hingga peluncuran, raih peluang bisnis yang lebih besar.",
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
            aspectRatio: 2 / 1,
            titleColor: "#000000",
            fontWeight: "font-semibold",
            descriptionColor: "#000000",
            fontSizeTitle: "tw-text-sm",
            imagePosition: "center",
            fontFamily: "Roboto",
            fontSize: 16,
            textAligment: "text-center",
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
          <ContentShowcase
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
