import ViewQuote from "@/view/quote";
import { FaQuoteLeft } from "react-icons/fa";
import { injectComponents } from "../injectComponent";
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
