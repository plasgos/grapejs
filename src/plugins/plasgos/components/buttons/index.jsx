import { injectComponents } from "@/plugins/injectComponent";
import { TbSquareRoundedLetterBFilled } from "react-icons/tb";
import ViewButton from "./view";

export const buttonsComponent = (editor) => {
  injectComponents(editor, {
    type: "button-content",
    label: "Button",
    icon: <TbSquareRoundedLetterBFilled />,
    ViewComponent: ViewButton,
    defaultCustomComponent: {
      isLocked: false,
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
            color: "",
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
            title: "Explore Demo",
            btnColor: "",
            textColor: "",
            size: "default",
            variant: "outline",
            rounded: 10,
            shadow: "",
          },
          iconBtn: {
            icon: "",
            color: "",
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
      mainStyle: {
        space: 20,
        position: "flex-row",
        align: "justify-center",
        shadow: "shadow",
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
