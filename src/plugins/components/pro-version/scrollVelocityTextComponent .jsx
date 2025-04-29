import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import ViewScrollVelocity from "@/view/pro-version/scroll-velocity/ViewScrollVelocity";
import { PiSlidersHorizontalFill } from "react-icons/pi";

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
      color: "rgba(255, 255, 255, 1)",
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
