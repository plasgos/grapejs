import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import ViewBusinessOverview from "@/view/pro-version/business-overview";

import { RiSortNumberDesc } from "react-icons/ri";

export const businessOverviewComponent = (editor) => {
  injectComponents(editor, {
    type: "business-overview",
    label: "Business Overview",
    category: "Contents",
    icon: <RiSortNumberDesc />,
    ViewComponent: ViewBusinessOverview,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      contents: [
        {
          id: generateId(),
          overview: `<p><span style="font-family:'Courier New', Courier, monospace;font-size:18px;"><strong>Products</strong></span></p>`,
          from: 0,
          rangeValue: 100,
          symbol: "+",
        },
        {
          id: generateId(),
          overview: `<p><span style="font-family:'Courier New', Courier, monospace;font-size:18px;"><strong>Monthly Orders</strong></span></p>`,
          from: 0,
          rangeValue: 2500,
          symbol: "+",
        },
        {
          id: generateId(),
          overview: `<p><span style="font-family:'Courier New', Courier, monospace;font-size:18px;"><strong>Happy Customer</strong></span></p>`,
          from: 0,
          rangeValue: 100,
          symbol: "%",
        },
      ],
      wrapperStyle: {
        separator: ",",
        direction: "up",
        duration: 1,
        fontWeight: 500,
        color: "rgba(0, 0, 0, 1)",
        textAligment: "justify-center",
        fontSize: 36,
        fontFamily: "Roboto",
        textShadow: null,
        distance: 100,
      },
      background: {
        bgType: null,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 40,
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
