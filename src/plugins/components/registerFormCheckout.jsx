import ViewFormCheckout from "@/view/checkout-form";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { FaClipboardList } from "react-icons/fa";

export const registerFormCheckout = (editor) => {
  editor.BlockManager.add("checkout-form", {
    label: "Form Checkout",
    category: "Form",
    content: { type: "checkout-form" },
    activate: true,
    media: renderToString(<FaClipboardList size={40} />),
  });

  editor.Components.addType("checkout-form", {
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
        category: "Form",
        blockLabel: "Form Checkout",
        blockIcon: <FaClipboardList size={20} />,
        customComponent: {
          scrollTarget: undefined,
          contents: [],
          recipient: {
            name: "",
            phoneNumber: "",
            address: "",
            city: "",
            subdistrict: "",
            isDropshipping: false,
            nameDropshipper: "",
            phoneNumberDropshipper: false,
          },
          wrapperStyle: {
            width: 500,
            titleSize: 24,
            titleColor: "rgba(0, 0, 0, 1)",
            labelSize: 14,
            labelColor: "rgba(0, 0, 0, 1)",
            inputColor: "rgba(255, 255, 255, 1)",
            inputSize: 14,
            textInputColor: "rgba(0, 0, 0, 1)",
            borderColor: "rgba(115, 115, 115, 0.5)",
            rounded: 8,
            space: 20,
            buttonText: "Beli Sekarang",
            buttonColor: "rgba(250, 84, 28,1)",
            iconBtn: {
              icon: "",
              color: "rgba(0,0,0,0,1)",
              size: 24,
              position: "right",
            },
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
          <ViewFormCheckout
            editor={editor}
            section={this.model.get("customComponent")}
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
