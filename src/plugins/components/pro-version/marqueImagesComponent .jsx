import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import { LiaImagesSolid } from "react-icons/lia";
import svg01 from "@/assets/marquee/01.svg";
import svg02 from "@/assets/marquee/02.svg";
import svg03 from "@/assets/marquee/03.svg";
import svg04 from "@/assets/marquee/04.svg";
import svg05 from "@/assets/marquee/05.svg";
import svg06 from "@/assets/marquee/06.svg";
import svg07 from "@/assets/marquee/07.svg";
import svg08 from "@/assets/marquee/08.svg";
import svg09 from "@/assets/marquee/09.svg";
import svg10 from "@/assets/marquee/10.svg";
import svg11 from "@/assets/marquee/11.svg";
import ViewMarqueeImages from "@/view/pro-version/marquee-images";

const data = [
  { id: 1, image: svg01, height: 300 },
  { id: 2, image: svg02, height: 250 },
  { id: 3, image: svg03, height: 320 },
  { id: 4, image: svg04, height: 280 },
  { id: 5, image: svg05, height: 350 },
  { id: 6, image: svg06, height: 270 },
  { id: 7, image: svg07, height: 310 },
  { id: 8, image: svg08, height: 290 },
  { id: 9, image: svg09, height: 330 },
  { id: 10, image: svg10, height: 260 },
  { id: 11, image: svg11, height: 340 },
];

export const marqueImagesComponent = (editor) => {
  injectComponents(editor, {
    type: "marquee-images",
    label: "Marquee Images",
    category: "Media",
    icon: <LiaImagesSolid />,
    ViewComponent: ViewMarqueeImages,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      contents: data.map((item, index) => ({
        id: `img-${String(index + 1).padStart(2, "0")}-${generateId()}`,
        image: item.image,
        height: item.height,
      })),

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
