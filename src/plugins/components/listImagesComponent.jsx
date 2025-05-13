import { generateId } from "@/lib/utils";
import ViewListImages from "@/view/list-images";
import { FaRegImages } from "react-icons/fa";
import { injectComponents } from "../injectComponent";
export const listImagesComponent = (editor) => {
  injectComponents(editor, {
    type: "list-images",
    label: "List Images",
    icon: <FaRegImages />,
    ViewComponent: ViewListImages,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: generateId(),
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/products1.webp?updatedAt=1747115975853",
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: generateId(),
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/products2.webp?updatedAt=1747115975781",
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: generateId(),
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/products4.jpg?updatedAt=1747115975342",
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
      ],
      wrapperStyle: {
        column: "3",
        aspectRatio: 1 / 1,
        rounded: 20,
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
