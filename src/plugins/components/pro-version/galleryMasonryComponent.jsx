import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import ViewGalleryMasonry from "@/view/pro-version/gallery-masonry";
import { TfiGallery } from "react-icons/tfi";

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

export const galleryMasonryComponent = (editor) => {
  injectComponents(editor, {
    type: "gallery-masonry",
    label: "Gallery Masonry",
    category: "Media",
    icon: <TfiGallery size={40} />,
    ViewComponent: ViewGalleryMasonry,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      contents: data.map((item, index) => ({
        id: `img-${String(index + 1).padStart(2, "0")}-${generateId()}`,
        image: item.image,
        height: item.height,
      })),
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
    },
  });
};
