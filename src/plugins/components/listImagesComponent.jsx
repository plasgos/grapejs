import products1 from "@/assets/products1.webp";
import products2 from "@/assets/products2.webp";
import products3 from "@/assets/products3.webp";
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
          image: products1,
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: generateId(),
          image: products2,
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: generateId(),
          image: products3,
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
