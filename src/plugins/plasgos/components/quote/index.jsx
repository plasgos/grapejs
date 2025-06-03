import { FaQuoteLeft } from "react-icons/fa";
import { injectComponents } from "@/plugins/injectComponent";
import ViewQuote from "./view";
export const quoteComponent = (editor) => {
  injectComponents(editor, {
    type: "quotes",
    label: "Quotes",
    icon: <FaQuoteLeft />,
    ViewComponent: ViewQuote,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "quote-01",
          quoteText: `<p>Kamu tidak bisa membangunkan orang yang pura-pura tidur</p>`,
          quoteTextColor: "",
          quoteTagColor: "616161",
          writer: "Tere Liye",
          writerColor: "#9E9E9E",
          fontSize: "tw-text-base",
        },
      ],
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
