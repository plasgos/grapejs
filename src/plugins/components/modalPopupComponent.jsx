import ModalPopup from "@/view/modal-popup";
import { VscMultipleWindows } from "react-icons/vsc";
import { injectComponents } from "../injectComponent";

export const modalPopupComponent = (editor) => {
  injectComponents(editor, {
    type: "modal-popup",
    label: "Modal Popup",
    icon: <VscMultipleWindows size={40} />,
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
  });
};
