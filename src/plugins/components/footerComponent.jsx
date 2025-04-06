import bca from "@/assets/bca.png";
import mandiri from "@/assets/mandiri.png";
import { generateId } from "@/lib/utils";
import { TbBoxAlignBottomFilled } from "react-icons/tb";
import { injectComponents } from "../injectComponent";

import { FaRegImages } from "react-icons/fa";
import ViewFooter from "@/view/footer";

export const footerComponent = (editor) => {
  injectComponents(editor, {
    type: "footer",
    label: "Footer",
    icon: <TbBoxAlignBottomFilled size={40} />,
    category: "Footer",
    ViewComponent: ViewFooter,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "images-01",
          type: "images",
          label: "Images",
          icon: <FaRegImages />,
          options: [
            {
              id: "img-01",
              image: bca,
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
            {
              id: "img-02",
              image: mandiri,
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
          ],
          title: "Metode Pengiriman",
          width: 300,
          imageSize: 50,
          iconHeading: {
            icon: "",
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "left",
          },
        },

        // {
        //   id: `list-logo-${generateId([])}`,
        //   name: "list-logo",
        //   title: "Daftar Logo",
        //   content: [
        //     {
        //       id: generateId([]),
        //       image: bca,
        //       target: {
        //         localPage: {
        //           value: "home",
        //         },
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       image: mandiri,
        //       target: {
        //         localPage: {
        //           value: "home",
        //         },
        //       },
        //     },
        //   ],
        //   wrapperStyle: {
        //     title: "Metode Pengiriman",
        //     maxWidth: 300,
        //     icon: "",
        //     iconSize: 20,
        //     image: "",
        //     imageSize: 50,
        //   },
        // },
        // {
        //   id: `group-link-${generateId([])}`,
        //   name: "group-link",
        //   title: "Grup Link",
        //   content: [
        //     {
        //       id: generateId([]),
        //       text: "Home",
        //       icon: "",
        //       iconSize: 20,
        //       image: "",
        //       imageSize: 50,
        //       target: {
        //         localPage: {
        //           value: "home",
        //         },
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       text: "Blog",
        //       icon: "",
        //       iconSize: 20,
        //       image: "",
        //       imageSize: 50,
        //       target: {
        //         localPage: {
        //           value: "home",
        //         },
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       text: "Daftar Produk",
        //       icon: "",
        //       iconSize: 20,
        //       image: "",
        //       imageSize: 50,
        //       target: {
        //         localPage: {
        //           value: "home",
        //         },
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       text: "Konfirmasi Pembayaran",
        //       icon: "",
        //       iconSize: 20,
        //       image: "",
        //       imageSize: 50,
        //       target: {
        //         localPage: {
        //           value: "home",
        //         },
        //       },
        //     },
        //   ],
        //   wrapperStyle: {
        //     title: "Link",
        //     icon: "",
        //     iconSize: 20,
        //     image: "",
        //     imageSize: 50,
        //   },
        // },
        // {
        //   id: `social-link-${generateId([])}`,
        //   name: "social-link",
        //   title: "Link Sosial",
        //   content: [
        //     {
        //       id: generateId([]),
        //       type: {
        //         value: "facebook",
        //         label: "Facebook",
        //         icon: {
        //           iconName: "square-facebook",
        //           prefix: "fab",
        //         },
        //         link: "https://www.facebook.com/",
        //         path: "",
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       type: {
        //         value: "twitter-X",
        //         label: "Twitter X",
        //         icon: {
        //           iconName: "square-x-twitter",
        //           prefix: "fab",
        //         },
        //         link: "https://twitter.com/",
        //         path: "",
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       type: {
        //         value: "instagram",
        //         label: "Instagram",
        //         icon: {
        //           iconName: "square-instagram",
        //           prefix: "fab",
        //         },
        //         link: "https://www.instagram.com/",
        //         path: "",
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       type: {
        //         value: "youtube",
        //         label: "Youtube",
        //         icon: {
        //           iconName: "youtube",
        //           prefix: "fab",
        //         },
        //         link: "https://www.youtube.com/channel/",
        //         path: "",
        //       },
        //     },
        //   ],
        //   wrapperStyle: {
        //     title: "Social Media",
        //     icon: "",
        //     iconSize: 20,
        //     image: "",
        //     imageSize: 50,
        //   },
        // },
        // {
        //   id: `address-${generateId([])}`,
        //   name: "address",
        //   title: "Alamat",
        //   content: [
        //     {
        //       id: generateId([]),
        //       type: {
        //         value: "phone",
        //         label: "Telepon",
        //         icon: {
        //           iconName: "phone",
        //           prefix: "fas",
        //         },
        //         text: "0892-2211-4332",
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       type: {
        //         value: "address",
        //         label: "Alamat",
        //         icon: {
        //           iconName: "location-dot",
        //           prefix: "fas",
        //         },
        //         text: "Jl Layur 31 Jakarta Timur",
        //       },
        //     },
        //     {
        //       id: generateId([]),
        //       type: {
        //         value: "email",
        //         label: "Email",
        //         icon: {
        //           iconName: "envelope",
        //           prefix: "fas",
        //         },
        //         text: "support@email.com",
        //       },
        //     },
        //   ],
        //   wrapperStyle: {
        //     title: "Alamat",
        //     icon: "",
        //     iconSize: 20,
        //     image: "",
        //     imageSize: 50,
        //   },
        // },
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
      copyright: {
        default: "@plasgos 2024",
        text: `<p style="text-align:center;">© Copyright 2025 Plasgos</p>`,
        textAlign: "tw-text-center",
        color: "#757575",
        fontSize: "tw-text-xs",
        isCustom: false,
      },
    },
  });
};
