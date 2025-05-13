import ViewTestimony from "@/view/testimony";
import { BsChatRightQuoteFill } from "react-icons/bs";
import { injectComponents } from "../injectComponent";

export const testimonyComponent = (editor) => {
  injectComponents(editor, {
    type: "testimony",
    label: "Testimony",
    icon: <BsChatRightQuoteFill />,
    ViewComponent: ViewTestimony,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "testimony-01",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/avatar3.jpg?updatedAt=1747122493693",
          name: "John",
          profetion: "Designer",
          description:
            "Waktu pengiriman berkisar antara 1-3 hari kerja, tergantung pada lokasi tujuan.",
          stars: 3,
        },
        {
          id: "testimony-02",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/avatar2.jpg?updatedAt=1747122493339",
          name: "Emily",
          profetion: "Developer",
          description:
            "Produk berkualitas dan layanan pelanggan yang sangat responsif!",
          stars: 4,
        },
        {
          id: "testimony-03",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/avatar1.jpg?updatedAt=1747122493302",
          name: "Michael",
          profetion: "Entrepreneur",
          description:
            "Sangat puas dengan pengalaman belanja di sini, akan kembali lagi!",
          stars: 5,
        },
        {
          id: "testimony-04",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/avatar4.jpg?updatedAt=1747122493268",
          name: "Sophia",
          profetion: "Marketing ",
          description:
            "Pengiriman cepat dan barang sesuai dengan deskripsi. Sangat direkomendasikan!",
          stars: 5,
        },
        {
          id: "testimony-05",
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/avatar6.jpg?updatedAt=1747122493203",
          name: "Elena",
          profetion: "Freelance",
          description:
            "Saya sangat puas dengan produk ini! Kualitasnya luar biasa dan sesuai dengan ekspektasi saya. Pengiriman juga cepat dan pelayanannya ramah.",
          stars: 5,
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
        bgColor: "transparent",
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
