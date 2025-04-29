import slider1 from "@/assets/slider1.jpg";
import slider2 from "@/assets/slider2.jpg";
import slider3 from "@/assets/slider3.jpg";
import slider4 from "@/assets/slider4.jpg";

import ViewSliderImages from "@/view/slider-images";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { injectComponents } from "../injectComponent";

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
          image: slider1,
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
          image: slider2,
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
          image: slider3,
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
          image: slider4,
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
    },
  });
};
