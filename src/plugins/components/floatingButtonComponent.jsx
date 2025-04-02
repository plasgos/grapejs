import ViewFLoatingButton from "@/view/floating-button";
import { CiSquareMore } from "react-icons/ci";
import { injectComponents } from "../injectComponent";

export const floatingButtonComponent = (editor) => {
  injectComponents(editor, {
    type: "floating-button",
    label: "Floating Button",
    icon: <CiSquareMore size={40} />,
    category: "Floating Widgets",
    ViewComponent: ViewFLoatingButton,
    defaultCustomComponent: {
      scrollTarget: undefined,
      buttons: [
        {
          id: "button-01",
          stylesBtn: {
            title: "Get Started",
            btnColor: "rgba(126,211,33,100)",
            textColor: "",
            size: "default",
            variant: "default",
            rounded: 10,

            shadow: "",
          },
          iconBtn: {
            icon: "FaWhatsapp",
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "right",
          },
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
          isFocused: false,
        },
        {
          id: "button-02",
          stylesBtn: {
            title: "Get Started",
            btnColor: "rgba(126,211,33,100)",
            textColor: "",
            size: "default",
            variant: "default",
            shadow: "",
            rounded: 10,
          },
          iconBtn: {
            icon: "FaWhatsapp",
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "right",
          },
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
        space: 20,
        position: "flex-row",
        shadow: "shadow",
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
  });
};
