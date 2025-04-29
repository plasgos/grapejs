import ViewFeatureHighlights from "@/view/feature-highlights";
import { PiListChecksBold } from "react-icons/pi";
import { injectComponents } from "../injectComponent";

export const featureHighlightsComponent = (editor) => {
  injectComponents(editor, {
    type: "feature-highlights",
    label: "Feature Highlights",
    icon: <PiListChecksBold />,
    ViewComponent: ViewFeatureHighlights,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "feature-01",
          title: "Rasakan Bedanya dalam Satu Sentuhan!",
          iconBtn: {
            icon: "FaCheckCircle",
            color: "rgba(126,211,33,1)",
            size: 24,
            position: "left",
          },
        },
        {
          id: "feature-02",
          title: "Inovasi Terbaru untuk Keseharian Anda.",
          iconBtn: {
            icon: "FaCheckCircle",
            color: "rgba(126,211,33,1)",
            size: 24,
            position: "left",
          },
        },
        {
          id: "feature-03",
          title: "Solusi Cerdas untuk Hidup Lebih Nyaman.",
          iconBtn: {
            icon: "FaCheckCircle",
            color: "rgba(126,211,33,1)",
            size: 24,
            position: "left",
          },
        },
        {
          id: "feature-04",
          title: "Transformasi Mudah, Hasil Maksimal.",
          iconBtn: {
            icon: "FaCheckCircle",
            color: "rgba(126,211,33,1)",
            size: 24,
            position: "left",
          },
        },
      ],
      wrapperStyle: {
        space: 20,
        textShadow: null,
        color: "#000000",
        fontWeight: "font-semibold",
        fontFamily: "Roboto",
        fontSize: 16,
        textAligment: "justify-center",
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
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
      },
    },
  });
};
