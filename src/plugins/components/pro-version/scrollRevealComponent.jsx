import { injectComponents } from "@/plugins/injectComponent";
import ViewScrollReveal from "@/view/pro-version/scroll-reveal/ViewSplitText";

import { SiScrollreveal } from "react-icons/si";

export const scrollRevealComponent = (editor) => {
  injectComponents(editor, {
    type: "scroll-reveal",
    label: "Scroll Reveal",
    category: "Text",
    icon: <SiScrollreveal />,
    ViewComponent: ViewScrollReveal,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      text: `When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!`,
      fontFamily: "Roboto",
      fontWeight: 500,
      color: "rgba(0, 0, 0, 1)",
      delay: 150,
      textAlign: "text-center",
      fontSize: 36,
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
