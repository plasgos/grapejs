import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";

import { RiSortNumberDesc } from "react-icons/ri";
import ViewBusinessOverview from "./view";

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
          overview: `Products`,
          from: 0,
          rangeValue: 100,
          symbol: "+",
        },
        {
          id: generateId(),
          overview: `Monthly Orders`,
          from: 0,
          rangeValue: 2500,
          symbol: "+",
        },
        {
          id: generateId(),
          overview: `Happy Customer`,
          from: 0,
          rangeValue: 100,
          symbol: "%",
        },
      ],
      wrapperStyle: {
        separator: ",",
        direction: "up",
        duration: 1,
        colorRangeValue: "rgba(0, 0, 0, 1)",
        textAligment: "justify-center",
        fontSize: 36,
        fontFamily: "Roboto",
        fontWeight: 500,
        textShadow: null,
        distance: 100,

        fontSizeOverview: 16,
        fontFamilyOverview: "Roboto",
        fontWeightOverview: 500,
        colorOverview: "rgba(0, 0, 0, 1)",
      },
      background: {
        bgType: null,
        bgColor: "",
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
