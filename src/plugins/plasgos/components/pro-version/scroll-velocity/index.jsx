import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import ViewScrollVelocity from "./view/ViewScrollVelocity";

export const scrollVelocityTextComponent = (editor) => {
  injectComponents(editor, {
    type: "scroll-velocity-text",
    label: "Scroll Velocity Text",
    category: "Text",
    icon: <PiSlidersHorizontalFill />,
    ViewComponent: ViewScrollVelocity,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      fontFamily: "",
      fontWeight: "",
      colorVelocity: "rgba(255, 255, 255, 1)",
      textAlign: "justify-center",
      fontSize: 80,
      velocity: 100,
      contents: [
        { id: `text-01-${generateId()}`, title: "Plasgos Web" },
        { id: `text-02-${generateId()}`, title: "Scroll Down" },
      ],

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
