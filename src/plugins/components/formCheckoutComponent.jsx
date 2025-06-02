import ViewFormCheckout from "@/view/checkout-form";
import { FaClipboardList } from "react-icons/fa";
import { injectComponents } from "../injectComponent";

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
