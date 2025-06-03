import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { injectComponents } from "@/plugins/injectComponent";
import ViewSliderImages from "./view";

export const sliderImagesComponent = (editor) => {
  injectComponents(editor, {
    type: "slider-images",
    label: "Slider Images",
    icon: <TfiLayoutSliderAlt />,
    ViewComponent: ViewSliderImages,

    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "slider-01",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/slider5.jpg?updatedAt=1747124028834",
          alt: "",
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: "slider-02",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/slider2.jpg?updatedAt=1747124028654",
          alt: "",
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: "slider-03",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/slider4.jpg?updatedAt=1747123866454",
          alt: "",
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: "slider-04",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/slider1.jpg?updatedAt=1747123866368",
          alt: "",
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
      ],
      wrapperStyle: {
        aspectRatio: 5 / 2,
        autoSlide: null,
        transitions: "scroll",
        width: 800,
        variant: "full-slider",
        pagination: false,
        navigation: true,
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
