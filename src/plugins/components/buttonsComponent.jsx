import ViewButton from "@/view/button";
import { TbSquareRoundedLetterBFilled } from "react-icons/tb";
import { injectComponents } from "../injectComponent";

export const buttonsComponent = (editor) => {
  injectComponents(editor, {
    type: "button-content",
    label: "Button",
    icon: <TbSquareRoundedLetterBFilled />,
    ViewComponent: ViewButton,
    defaultCustomComponent: {
      isLocked: true,
      scrollTarget: undefined,
      buttons: [
        {
          id: "button-01",
          stylesBtn: {
            title: "Get Started",
            btnColor: "",
            textColor: "",
            size: "default",
            variant: "default",
            rounded: 10,
            shadow: "",
          },
          iconBtn: {
            icon: "",
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
        },
        {
          id: "button-02",
          stylesBtn: {
            title: "Start Demo",
            btnColor: "rgb(228 223 223 ,1)",
            textColor: "",
            size: "default",
            variant: "outline",
            shadow: "",
            rounded: 10,
          },
          iconBtn: {
            icon: "",
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
        },
      ],
      wrapperStyle: {
        space: 20,
        position: "flex-row",
        align: "justify-center",
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
      editorTabConfig: {
        disableTransition: true,
        disableStyles: true,
        disableBackground: false,
      },
    },
  });
};
