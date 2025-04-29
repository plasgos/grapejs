import ViewFAQ from "@/view/faq";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { injectComponents } from "../injectComponent";

export const FAQComponent = (editor) => {
  injectComponents(editor, {
    type: "faq",
    label: "FAQ",
    icon: <TfiLayoutAccordionList />,
    ViewComponent: ViewFAQ,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "faq-01",
          title: "Berapa lama waktu pengiriman?",
          description:
            "Waktu pengiriman berkisar antara 1-3 hari kerja, tergantung pada lokasi tujuan.",
        },
        {
          id: "faq-02",
          title: "Apakah ada biaya pengiriman?",
          description:
            "Gratis ongkos kirim untuk semua pesanan di atas Rp 200.000 ke seluruh Indonesia.",
        },
        {
          id: "faq-03",
          title: "Bagaimana jika barang rusak saat diterima?",
          description:
            "Segera hubungi tim kami dalam 24 jam dengan melampirkan foto barang rusak untuk proses pengembalian atau penggantian.",
        },
        {
          id: "faq-04",
          title: "Apakah bisa melakukan pengembalian barang?",
          description:
            "Ya, Anda dapat mengembalikan barang dalam kondisi belum digunakan dalam waktu 7 hari setelah penerimaan.",
        },
      ],
      wrapperStyle: {
        variant: "basic",
        space: 20,
        textShadow: null,
        color: "#000000",
        fontWeight: 500,
        fontFamily: "Roboto",
        fontSize: 16,
        textAligment: "justify-center",
        borderColor: "rgba(115, 115, 115, 0.5)",
        iconColor: "rgb(46, 30, 24,1)",
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
