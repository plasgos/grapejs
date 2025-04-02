import avatar1 from "@/assets/avatar1.jpg";
import avatar2 from "@/assets/avatar2.jpg";
import avatar3 from "@/assets/avatar3.jpg";
import avatar4 from "@/assets/avatar4.jpg";
import avatar6 from "@/assets/avatar6.jpg";

import ViewTestimony from "@/view/testimony";
import { BsChatRightQuoteFill } from "react-icons/bs";
import { injectComponents } from "../injectComponent";

export const testimonyComponent = (editor) => {
  injectComponents(editor, {
    type: "testimony",
    label: "Testimony",
    icon: <BsChatRightQuoteFill size={40} />,
    ViewComponent: ViewTestimony,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "testimony-01",
          image: avatar1,
          name: "John",
          profetion: "Designer",
          description:
            "Waktu pengiriman berkisar antara 1-3 hari kerja, tergantung pada lokasi tujuan.",
          stars: 3,
          isFocused: false,
        },
        {
          id: "testimony-02",
          image: avatar2,
          name: "Emily",
          profetion: "Developer",
          description:
            "Produk berkualitas dan layanan pelanggan yang sangat responsif!",
          stars: 4,
          isFocused: false,
        },
        {
          id: "testimony-03",
          image: avatar3,
          name: "Michael",
          profetion: "Entrepreneur",
          description:
            "Sangat puas dengan pengalaman belanja di sini, akan kembali lagi!",
          stars: 5,
          isFocused: false,
        },
        {
          id: "testimony-04",
          image: avatar4,
          name: "Sophia",
          profetion: "Marketing ",
          description:
            "Pengiriman cepat dan barang sesuai dengan deskripsi. Sangat direkomendasikan!",
          stars: 5,
          isFocused: false,
        },
        {
          id: "testimony-05",
          image: avatar6,
          name: "Elena",
          profetion: "Freelance",
          description:
            "Saya sangat puas dengan produk ini! Kualitasnya luar biasa dan sesuai dengan ekspektasi saya. Pengiriman juga cepat dan pelayanannya ramah.",
          stars: 5,
          isFocused: false,
        },
      ],
      wrapperStyle: {
        variant: "1",

        nameColor: "#000000",
        fontWeight: "font-semibold",
        fontFamily: "Roboto",
        fontSize: 18,
        textAligment: "justify-center",
        borderColor: "rgba(223, 221, 221, 1)",
        bgColor: "rgba(255, 255, 255, 1)",
        quoteColor: "rgba(245, 245, 245, 1)",
        profectionColor: "rgba(148, 148, 150, 1)",

        starsColor: "rgba(255,210,80,1)",
        starsSize: 20,

        withSlider: true,
        autoPlaySlider: false,

        header: `<p style="text-align:center;"><span style="font-size:26px;"><strong>Testimonials</strong></span></p><p style="text-align:center;"><span style="font-size:40px;">What our clients saya about us</span></p>`,
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
