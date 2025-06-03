import ViewFeatureHighlights from "./view";
import { PiListChecksBold } from "react-icons/pi";
import { injectComponents } from "@/plugins/injectComponent";

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
        titleColor: "",
        fontWeight: 700,
        fontFamily: "Roboto",
        fontSize: 16,
        textAligment: "justify-center",
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
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
      },
    },
  });
};
