import avatar1 from "@/assets/avatar1.jpg";
import avatar2 from "@/assets/avatar2.jpg";
import avatar3 from "@/assets/avatar3.jpg";
import avatar4 from "@/assets/avatar4.jpg";
import ViewTestimony from "@/view/testimony";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { BsChatRightQuoteFill } from "react-icons/bs";

export const registerTestimony = (editor) => {
  editor.BlockManager.add("testimony", {
    label: "Testimony",
    category: "Contents",
    content: { type: "testimony" },
    activate: true,
    media: renderToString(<BsChatRightQuoteFill size={40} />),
  });

  editor.Components.addType("testimony", {
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
        blockLabel: "Testimony",
        blockIcon: <BsChatRightQuoteFill size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "testimony-01",
              image: avatar1,
              name: "John",
              profetion: "Designer",
              description:
                "Waktu pengiriman berkisar antara 1-3 hari kerja, tergantung pada lokasi tujuan.",
              stars: 3,
              isFocused: false,
            },
            {
              id: "testimony-02",
              image: avatar2,
              name: "Emily",
              profetion: "Developer",
              description:
                "Produk berkualitas dan layanan pelanggan yang sangat responsif!",
              stars: 4,
              isFocused: false,
            },
            {
              id: "testimony-03",
              image: avatar3,
              name: "Michael",
              profetion: "Entrepreneur",
              description:
                "Sangat puas dengan pengalaman belanja di sini, akan kembali lagi!",
              stars: 5,
              isFocused: false,
            },
            {
              id: "testimony-04",
              image: avatar4,
              name: "Sophia",
              profetion: "Marketing Specialist",
              description:
                "Pengiriman cepat dan barang sesuai dengan deskripsi. Sangat direkomendasikan!",
              stars: 5,
              isFocused: false,
            },
          ],
          wrapperStyle: {
            variant: "basic",

            nameColor: "#000000",
            fontWeight: "font-semibold",
            fontFamily: "Roboto",
            fontSize: 16,
            textAligment: "justify-center",
            borderColor: "rgba(223, 221, 221, 1)",

            profectionColor: "rgba(148, 148, 150, 1)",

            starsColor: "rgba(255,210,80,1)",
            starsSize: 20,
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
          <ViewTestimony
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
