import { injectComponents } from "@/plugins/injectComponent";
import ViewCountUp from "@/view/pro-version/count-up";

import { RiSortNumberDesc } from "react-icons/ri";

export const countUpComponent = (editor) => {
  injectComponents(editor, {
    type: "count-up-text",
    label: "Count Up",
    category: "Text",
    icon: <RiSortNumberDesc />,
    ViewComponent: ViewCountUp,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      text: `<p><span style="font-family:'Courier New', Courier, monospace;font-size:36px;"><strong>Successful Conversions</strong></span></p>`,
      textShadow: null,
      fontFamily: "Roboto",
      fontWeight: 500,
      color: "rgba(0, 0, 0, 1)",
      delay: 200,
      textAlign: "justify-center",
      fontSize: 36,
      from: 0,
      to: 100,
      separator: ",",
      direction: "up",
      duration: 1,
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
      editorTabConfig: {
        disableTransition: true,
        disableStyles: true,
        disableBackground: false,
      },
    },
  });
};
