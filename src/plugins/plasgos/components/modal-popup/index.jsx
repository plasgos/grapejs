import { VscMultipleWindows } from "react-icons/vsc";
import { injectComponents } from "@/plugins/injectComponent";
import ModalPopup from "./view";

export const modalPopupComponent = (editor) => {
  injectComponents(editor, {
    type: "modal-popup",
    label: "Modal Popup",
    icon: <VscMultipleWindows />,
    category: "Floating Widgets",
    ViewComponent: ModalPopup,
    defaultCustomComponent: {
      scrollTarget: undefined,
      popupId: "",
      isPreviewModal: false,
      popupModalOption: {
        typeOpen: "immediately",
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
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
        rounded: 0,
        isFullWidth: false,
      },
    },
  });
};
