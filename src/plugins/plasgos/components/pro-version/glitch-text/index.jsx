import { injectComponents } from "@/plugins/injectComponent";
import { PiTornadoFill } from "react-icons/pi";
import ViewGlitchText from "./view/ViewGlitchText";

export const glitchTextComponent = (editor) => {
  injectComponents(editor, {
    type: "glitch-text",
    label: "Glitch Text",
    category: "Text",
    icon: <PiTornadoFill />,
    ViewComponent: ViewGlitchText,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      text: "Plasgos",
      fontFamily: "",
      fontWeight: "",
      colorGlitchText: "rgba(255, 255, 255, 1)",
      textAlign: "justify-center",
      fontSize: 120,
      speed: 5,
      enableHover: true,
      enableShadows: true,
      enableOnHover: false,
      contents: [],

      background: {
        bgType: "bgColor",
        bgColor: "rgba(6, 6, 6, 1)",
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
