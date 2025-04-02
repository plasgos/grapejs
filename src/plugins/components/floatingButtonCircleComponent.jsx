import ViewFLoatingButtonCircle from "@/view/floating-button-circle";
import { IoIosRadioButtonOn } from "react-icons/io";
import { injectComponents } from "../injectComponent";

export const floatingButtonCircleComponent = (editor) => {
  injectComponents(editor, {
    type: "floating-button-circle",
    label: "Floating Button Circle",
    icon: <IoIosRadioButtonOn size={40} />,
    category: "Floating Widgets",
    ViewComponent: ViewFLoatingButtonCircle,
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
      ],
      wrapperStyle: {
        position: 20,
        space: 20,
      },
    },
  });
};
