import { FaImage } from "react-icons/fa6";
import { injectComponents } from "@/plugins/injectComponent";
import ViewImage from "./view";

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
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/hannah-morgan-ycVFts5Ma4s-unsplash.jpg?updatedAt=1748855301099",
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
        width: 1000,
        rotation: 0,
        shadow: "shadow-none",
        aspectRatio: 2 / 1,
        rounded: 20,
        objectView: "object-cover",
      },
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
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
