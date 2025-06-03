import { injectComponents } from "@/plugins/injectComponent";

import { RiTornadoFill } from "react-icons/ri";
import ViewFuzzyText from "./view/ViewFuzzyText";

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
      colorFuzzyText: "rgba(255, 255, 255, 1)",
      textAlign: "justify-center",
      fontSize: 120,
      hoverIntensity: 0.5,
      baseIntensity: 0.2,
      enableHover: true,
      contents: [],

      background: {
        bgType: "bgColor",
        bgColor: "rgba(0, 0, 0, 1)",
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
