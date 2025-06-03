import { injectComponents } from "@/plugins/injectComponent";
import { FaClipboardList } from "react-icons/fa";
import ViewFormCheckout from "./view";

export const formCheckoutComponent = (editor) => {
  injectComponents(editor, {
    type: "checkout-form",
    label: "Form Checkout",
    icon: <FaClipboardList />,
    category: "Form",
    ViewComponent: ViewFormCheckout,
    defaultCustomComponent: {
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
          color: "",
          size: 24,
          position: "right",
        },
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
