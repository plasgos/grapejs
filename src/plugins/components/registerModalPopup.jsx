import ModalPopup from "@/view/modal-popup";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { VscMultipleWindows } from "react-icons/vsc";

export const registerModalPopup = (editor) => {
  editor.BlockManager.add("modal-popup", {
    label: "Modal Popup",
    category: "Floating Widgets",
    content: { type: "modal-popup" },
    activate: true,
    media: renderToString(<VscMultipleWindows size={40} />),
  });

  editor.Components.addType("modal-popup", {
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
        category: "Floating Widgets",
        blockLabel: "Modal Popup",
        blockIcon: <VscMultipleWindows size={20} />,
        customComponent: {
          scrollTarget: undefined,
          popupId: "",
          isPreviewModal: false,
          popupModalOption: {
            typeOpen: "onClick",
            delayDuration: 3000,
          },
          contents: [],
          wrapperStyle: {
            popupName: "popup-01",
            rounded: 10,
            isPopupShown: true,
            width: 700,
            appearEffect: "animate__fadeInUp",
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
          <ModalPopup
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
