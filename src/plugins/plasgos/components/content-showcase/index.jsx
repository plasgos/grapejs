import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import { HiMiniViewColumns } from "react-icons/hi2";
import ViewContentShowcase from "./view/index";

export const contentShowcaseComponent = (editor) => {
  injectComponents(editor, {
    type: "content-showcase",
    label: "Content Showcase",
    icon: <HiMiniViewColumns />,
    ViewComponent: ViewContentShowcase,
    defaultCustomComponent: {
      isLocked: false,
      scrollTarget: undefined,
      contents: [
        {
          id: generateId(),
          title: "Panduan Lengkap Memulai Bisnis Online",
          description: `Temukan langkah-langkah praktis memulai bisnis online dari nol. Pelajari strategi pemasaran, manajemen produk, dan tips meningkatkan penjualan secara efekti`,
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/products1.webp?updatedAt=1747115975853",
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
          description: `Pelajari cara meningkatkan kualitas produk Anda dengan bahan terbaik dan proses produksi yang efisien. Dapatkan kepercayaan pelanggan dan tingkatkan loyalitas merek.`,
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/products2.webp?updatedAt=1747115975781",
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
          description: `Ketahui langkah-langkah menciptakan produk inovatif yang memenuhi kebutuhan pasar. Mulai dari riset hingga peluncuran, raih peluang bisnis yang lebih besar.`,
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/products4.jpg?updatedAt=1747115975342",
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
        aspectRatio: 4 / 5,
        rounded: 20,
        titleColor: "",
        fontWeight: 900,
        imagePosition: "center",
        fontFamily: "Roboto",
        fontSize: 16,
        textAligment: "text-center",

        descriptionColor: "",
        descriptionFontWeight: "",
        descriptionFontFamily: "",
        descriptionFontSize: 14,
        textAligmentDescription: "text-center",
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
