import { generateId } from "@/lib/utils";
import ViewListImages from "@/view/list-images";
import { FaRegImages } from "react-icons/fa";
import { injectComponents } from "../injectComponent";

const images = [
  "https://ik.imagekit.io/ez1ffaf6o/default-images/chanel-logo-black-and-white.png?updatedAt=1748849156939",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/converse-logo-vector-1.svg?updatedAt=1748849107374",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/adidas-logo.png?updatedAt=1748849046124",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/vans-seeklogo.png?updatedAt=1748849001859",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/puma-seeklogo.png?updatedAt=1748848960997",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/louis-vuitton-seeklogo.png?updatedAt=1748848914858",
];

export const listImagesComponent = (editor) => {
  injectComponents(editor, {
    type: "list-images",
    label: "List Images",
    icon: <FaRegImages />,
    ViewComponent: ViewListImages,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: images.map((image) => ({
        id: generateId(),
        image: image,
        target: {
          actionType: "link",
          options: {
            type: null,
          },
        },
      })),
      wrapperStyle: {
        column: "6",
        aspectRatio: 1 / 1,
        gap: 30,
        rounded: 20,
        objectView: "object-contain",
      },
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
