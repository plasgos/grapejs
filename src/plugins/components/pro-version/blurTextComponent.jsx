import { injectComponents } from "@/plugins/injectComponent";
import ViewBlurText from "@/view/pro-version/blur-text/ViewBlurText";

import { MdBlurOn } from "react-icons/md";

export const blurTextComponent = (editor) => {
  injectComponents(editor, {
    type: "blur-text",
    label: "Blur Text",
    category: "Text",
    icon: <MdBlurOn size={40} />,
    ViewComponent: ViewBlurText,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      text: "Isn't this so cool?!",
      fontFamily: "Roboto",
      fontWeight: 500,
      color: "rgba(0, 0, 0, 1)",
      delay: 200,
      textAlign: "justify-center",
      fontSize: 36,
      animateBy: "words",
      direction: "top",
      contents: [],
      wrapperStyle: {},
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
