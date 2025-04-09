import { injectComponents } from "@/plugins/injectComponent";
import ViewSplitText from "@/view/pro/split-text/ViewSplitText";

import { MdOutlineTextFields } from "react-icons/md";

export const splitTextComponent = (editor) => {
  injectComponents(editor, {
    type: "split-text",
    label: "Split Text",
    category: "Text",
    icon: <MdOutlineTextFields size={40} />,
    ViewComponent: ViewSplitText,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      text: "Hello World!",
      delay: 150,
      textAlign: "text-center",
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
