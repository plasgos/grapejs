import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import { LiaImagesSolid } from "react-icons/lia";
import ViewMarqueeImages from "./view";

const images = [
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/04.svg?updatedAt=1747142438638",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/02.svg?updatedAt=1747142438724",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/10.svg?updatedAt=1747142438697",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/08.svg?updatedAt=1747142438768",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/03.svg?updatedAt=1747142438698",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/09.svg?updatedAt=1747142438741",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/07.svg?updatedAt=1747142438742",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/06.svg?updatedAt=1747142438873",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/05.svg?updatedAt=1747142438705",
  "https://ik.imagekit.io/ez1ffaf6o/default-images/marque-images/01.svg?updatedAt=1747142438769",
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
      contents: images.map((image, index) => ({
        id: `img-${String(index + 1).padStart(2, "0")}-${generateId()}`,
        image,
      })),

      background: {
        bgType: "bgColor",
        bgColor: "rgba(0, 0, 0, 1)",
        bgImage: "",
        blur: 0,
        opacity: 0,
        padding: 0,
        paddingTop: 0,
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
