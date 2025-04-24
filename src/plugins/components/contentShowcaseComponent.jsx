import products1 from "@/assets/products1.webp";
import products2 from "@/assets/products2.webp";
import products3 from "@/assets/products3.webp";
import { generateId } from "@/lib/utils";
import ContentShowcase from "@/view/content-showcase";
import { HiMiniViewColumns } from "react-icons/hi2";
import { injectComponents } from "../injectComponent";

export const contentShowcaseComponent = (editor) => {
  injectComponents(editor, {
    type: "content-showcase",
    label: "Content Showcase",
    icon: <HiMiniViewColumns />,
    ViewComponent: ContentShowcase,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      contents: [
        {
          id: generateId(),
          title: "Panduan Lengkap Memulai Bisnis Online",
          description:
            "Temukan langkah-langkah praktis memulai bisnis online dari nol. Pelajari strategi pemasaran, manajemen produk, dan tips meningkatkan penjualan secara efektif.",
          image: products1,
          target: {
            actionType: "link",
            options: {
              isOpenNewTab: true,
              link: "https://www.youtube.com/",
              type: "url",
            },
          },
        },
        {
          id: generateId(),
          title: "Tips Meningkatkan Kualitas Produk Anda",
          description:
            "Pelajari cara meningkatkan kualitas produk Anda dengan bahan terbaik dan proses produksi yang efisien. Dapatkan kepercayaan pelanggan dan tingkatkan loyalitas merek.",
          image: products2,
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: generateId(),
          title: "Langkah Menciptakan Produk Inovatif",
          description:
            "Ketahui langkah-langkah menciptakan produk inovatif yang memenuhi kebutuhan pasar. Mulai dari riset hingga peluncuran, raih peluang bisnis yang lebih besar.",
          image: products3,
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
      ],
      wrapperStyle: {
        column: "3",
        aspectRatio: 2 / 1,
        titleColor: "#000000",
        fontWeight: "font-semibold",
        descriptionColor: "#000000",
        fontSizeTitle: "tw-text-sm",
        imagePosition: "center",
        fontFamily: "Roboto",
        fontSize: 16,
        textAligment: "text-center",
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
      editorTabConfig: {
        disableTransition: true,
        disableStyles: false,
        disableBackground: false,
      },
    },
  });
};
