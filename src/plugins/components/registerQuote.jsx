import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

import ViewQuote from "@/view/quote";
import { FaQuoteLeft } from "react-icons/fa";
export const registerQuote = (editor) => {
  editor.BlockManager.add("quotes", {
    label: "Quotes",
    category: "Contents",
    content: { type: "quotes" },
    activate: true,
    media: renderToString(<FaQuoteLeft size={40} />),
  });

  editor.Components.addType("quotes", {
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
        blockLabel: "Quotes",
        blockIcon: <FaQuoteLeft size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "quote-01",
              quoteText:
                "Kamu tidak bisa membangunkan orang yang pura-pura tidur",
              quoteTextColor: "#000000",
              quoteTagColor: "616161",
              writer: "Tere Liye",
              writerColor: "#9E9E9E",
              fontSize: "tw-text-base",
            },
          ],
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

        this.renderReactComponent();
      },

      renderReactComponent() {
        if (!this.root) {
          this.root = createRoot(this.el); // Hanya buat satu instance root
        }

        this.root.render(
          <ViewQuote
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
