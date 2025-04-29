import { injectComponents } from "@/plugins/injectComponent";
import ViewGlitchText from "@/view/pro-version/glitch-text/ViewGlitchText";
import { PiTornadoFill } from "react-icons/pi";

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
      color: "rgba(255, 255, 255, 1)",
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
