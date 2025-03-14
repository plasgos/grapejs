import ViewFAQ from "@/view/faq";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { TfiLayoutAccordionList } from "react-icons/tfi";

export const registerFAQ = (editor) => {
  editor.BlockManager.add("faq", {
    label: "FAQ",
    category: "Contents",
    content: { type: "faq" },
    activate: true,
    media: renderToString(<TfiLayoutAccordionList size={40} />),
  });

  editor.Components.addType("faq", {
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
        blockLabel: "FAQ",
        blockIcon: <TfiLayoutAccordionList size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "faq-01",
              title: "Berapa lama waktu pengiriman?",
              description:
                "Waktu pengiriman berkisar antara 1-3 hari kerja, tergantung pada lokasi tujuan.",
              isFocused: false,
            },
            {
              id: "faq-02",
              title: "Apakah ada biaya pengiriman?",
              description:
                "Gratis ongkos kirim untuk semua pesanan di atas Rp 200.000 ke seluruh Indonesia.",
              isFocused: false,
            },
            {
              id: "faq-03",
              title: "Bagaimana jika barang rusak saat diterima?",
              description:
                "Segera hubungi tim kami dalam 24 jam dengan melampirkan foto barang rusak untuk proses pengembalian atau penggantian.",
              isFocused: false,
            },
            {
              id: "faq-04",
              title: "Apakah bisa melakukan pengembalian barang?",
              description:
                "Ya, Anda dapat mengembalikan barang dalam kondisi belum digunakan dalam waktu 7 hari setelah penerimaan.",
              isFocused: false,
            },
          ],
          wrapperStyle: {
            variant: "basic",
            space: 20,
            textShadow: null,
            color: "#000000",
            fontWeight: "font-semibold",
            fontFamily: "Roboto",
            fontSize: 16,
            textAligment: "justify-center",
            borderColor: "rgba(115, 115, 115, 0.5)",
            iconColor: "rgb(46, 30, 24,1)",
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
          <ViewFAQ
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
