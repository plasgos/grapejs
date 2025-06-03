import { injectComponents } from "@/plugins/injectComponent";

import { MdOutlineTextFields } from "react-icons/md";
import ViewSplitText from "./view/ViewSplitText";

export const splitTextComponent = (editor) => {
  injectComponents(editor, {
    type: "split-text",
    label: "Split Text",
    category: "Text",
    icon: <MdOutlineTextFields />,
    ViewComponent: ViewSplitText,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      text: "Hello World!",
      fontFamily: "Roboto",
      fontWeight: 500,
      colorSplitText: "rgba(0, 0, 0, 1)",
      delay: 150,
      textAlign: "text-center",
      fontSize: 36,
      contents: [],
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
