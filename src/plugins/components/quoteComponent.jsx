import ViewQuote from "@/view/quote";
import { FaQuoteLeft } from "react-icons/fa";
import { injectComponents } from "../injectComponent";
export const quoteComponent = (editor) => {
  injectComponents(editor, {
    type: "quotes",
    label: "Quotes",
    icon: <FaQuoteLeft size={40} />,
    ViewComponent: ViewQuote,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "quote-01",
          quoteText: "Kamu tidak bisa membangunkan orang yang pura-pura tidur",
          quoteTextColor: "#000000",
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
