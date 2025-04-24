import products1 from "@/assets/products1.webp";
import ViewImage from "@/view/image";
import { FaImage } from "react-icons/fa6";
import { injectComponents } from "../injectComponent";

export const imageComponent = (editor) => {
  injectComponents(editor, {
    type: "image-content",
    label: "Image",
    icon: <FaImage />,
    ViewComponent: ViewImage,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "img-01",
          image: products1,
          alt: "",
          isDownloadImage: false,
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
      ],
      wrapperStyle: {
        width: 500,
        rotation: 0,
        borderColor: "",
        shadow: "shadow-none",
        variant: "centerPage",
      },
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
      },
      background: {
        bgType: null,
        bgColor: "#2196f3",
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
        disableTransition: false,
        disableStyles: false,
        disableBackground: false,
      },
    },
  });
};
