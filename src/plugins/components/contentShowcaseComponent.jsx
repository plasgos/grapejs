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
          description: `<p>
          <span>
          Temukan langkah-langkah praktis memulai bisnis online dari nol. Pelajari strategi pemasaran, manajemen produk, dan tips meningkatkan penjualan secara efektif.
          </span
          </p>`,
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
          description: `<p>
          <span>
         Pelajari cara meningkatkan kualitas produk Anda dengan bahan terbaik dan proses produksi yang efisien. Dapatkan kepercayaan pelanggan dan tingkatkan loyalitas merek.
          </span
          </p>`,
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
          description: `<p>
          
         Ketahui langkah-langkah menciptakan produk inovatif yang memenuhi kebutuhan pasar. Mulai dari riset hingga peluncuran, raih peluang bisnis yang lebih besar.
        
          </p>`,
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
        titleColor: "#000000",
        descriptionColor: "#000000",
        fontWeight: "font-semibold",
        imagePosition: "center",
        fontFamily: "Roboto",
        fontSize: 16,
        textAligment: "text-center",
      },
      background: {
        bgType: null,
        bgColor: "#hsjdhj",
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
