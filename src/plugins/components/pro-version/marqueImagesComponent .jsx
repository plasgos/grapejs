import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import ViewMarqueImages from "@/view/pro-version/marque-images";
import { LiaImagesSolid } from "react-icons/lia";

const data = [
  { id: 1, image: "https://picsum.photos/id/10/200/300", height: 400 },
  { id: 2, image: "https://picsum.photos/id/14/200/300", height: 300 },
  { id: 3, image: "https://picsum.photos/id/15/200/300", height: 300 },
  { id: 4, image: "https://picsum.photos/id/16/200/300", height: 300 },
  { id: 5, image: "https://picsum.photos/id/17/200/300", height: 300 },
  { id: 6, image: "https://picsum.photos/id/19/200/300", height: 300 },
  { id: 7, image: "https://picsum.photos/id/37/200/300", height: 200 },
  { id: 8, image: "https://picsum.photos/id/39/200/300", height: 300 },
  { id: 9, image: "https://picsum.photos/id/85/200/300", height: 200 },
  { id: 10, image: "https://picsum.photos/id/103/200/300", height: 400 },
];

export const marqueImagesComponent = (editor) => {
  injectComponents(editor, {
    type: "marque-images",
    label: "Marque Images",
    category: "Media",
    icon: <LiaImagesSolid size={40} />,
    ViewComponent: ViewMarqueImages,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      fontFamily: "",
      fontWeight: "",
      color: "rgba(255, 255, 255, 1)",
      textAlign: "justify-center",
      fontSize: 80,
      velocity: 100,
      contents: data.map((item, index) => ({
        id: `img-${String(index + 1).padStart(2, "0")}-${generateId()}`,
        image: item.image,
        height: item.height,
      })),
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
    },
  });
};
