import { injectComponents } from "@/plugins/injectComponent";
import ViewFuzzyText from "@/view/pro-version/fuzzy-text/ViewFuzzyText";

import { RiTornadoFill } from "react-icons/ri";

export const fuzzyTextComponent = (editor) => {
  injectComponents(editor, {
    type: "fuzzy-text",
    label: "Fuzzy Text",
    category: "Text",
    icon: <RiTornadoFill />,
    ViewComponent: ViewFuzzyText,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      text: "404",
      fontFamily: "Roboto",
      fontWeight: 500,
      color: "rgba(255, 255, 255, 1)",
      textAlign: "justify-center",
      fontSize: 120,
      hoverIntensity: 0.5,
      baseIntensity: 0.2,
      enableHover: true,
      contents: [],
      wrapperStyle: {},
      background: {
        bgType: "bgColor",
        bgColor: "rgba(0, 0, 0, 1)",
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
