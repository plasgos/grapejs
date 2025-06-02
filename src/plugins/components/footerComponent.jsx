import bca from "@/assets/bca.png";
import mandiri from "@/assets/mandiri.png";
import { generateId } from "@/lib/utils";
import { TbBoxAlignBottomFilled } from "react-icons/tb";
import { injectComponents } from "../injectComponent";

import ViewFooter from "@/view/footer";
import { BsInfoSquareFill } from "react-icons/bs";
import { FaLink, FaRegImages } from "react-icons/fa";
import { IoMailUnreadOutline, IoShareSocialSharp } from "react-icons/io5";

export const footerComponent = (editor) => {
  injectComponents(editor, {
    type: "footer",
    label: "Footer",
    icon: <TbBoxAlignBottomFilled />,
    category: "Footer",
    ViewComponent: ViewFooter,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: `images-0-${generateId()}`,
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
          title: "Payment Method",
          width: 300,
          imageWidth: 80,
          iconHeading: {
            icon: "",
            color: "",
            size: 24,
            position: "left",
          },
        },
        {
          id: `group-link-${generateId()}`,
          type: "group-link",
          label: "Group Link",
          icon: <FaLink />,
          options: [
            {
              id: `link-01-${generateId()}`,
              label: "Introduction",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
            {
              id: `link-02-${generateId()}`,
              label: "Usage",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
            {
              id: `link-03-${generateId()}`,
              label: "Globals",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
            {
              id: `link-04-${generateId()}`,
              label: "About",
              target: {
                actionType: "link",
                options: {
                  type: null,
                },
              },
            },
          ],
          title: "Getting Started",
          width: 300,
          iconHeading: {
            icon: "",
            color: "",
            size: 24,
            position: "left",
          },
        },
        {
          id: `social-media-${generateId()}`,
          type: "social-media",
          label: "Social Media",
          icon: <IoShareSocialSharp />,
          options: [
            {
              id: `fb-${generateId()}`,
              label: "Facebook",
              value: "",
              icon: "FaFacebook",
              placeholder: "https://facebook.com/username",
            },
            {
              id: `ig-${generateId()}`,
              label: "Instagram",
              icon: "FaInstagram",
              value: "",
              placeholder: "https://instagram.com/username",
            },
            {
              id: `x-${generateId()}`,
              label: "Twitter (X)",
              icon: "FaSquareXTwitter",
              value: "",
              placeholder: "https://x.com/username",
            },
          ],
          title: "Follow us",
          width: 250,
          iconHeading: {
            icon: "",
            color: "",
            size: 24,
            position: "left",
          },
        },
        {
          id: `contact-info-${generateId()}`,
          type: "contact-info",
          label: "Contact Info",
          icon: <BsInfoSquareFill />,
          options: [
            {
              id: `address-${generateId()}`,
              label: "Address",
              value: "Jl Sudirman 31 Jakarta Selatan",
              icon: "FaMapMarkerAlt",
            },
            {
              id: `phoneNumber-${generateId()}`,
              label: "Phone Number",
              icon: "FaPhoneAlt",
              value: "(021) 2248 1664",
            },
            {
              id: `email-${generateId()}`,
              label: "Email",
              icon: "FaEnvelope",
              value: "costumer.care@plasgos.co.id",
            },
            {
              id: `whatsapp-${generateId()}`,
              label: "whatsapp",
              icon: "FaWhatsapp",
              value: "0853-1111-1010",
            },
          ],
          title: "Contact Info",
          width: 300,
          iconHeading: {
            icon: "",
            color: "",
            size: 24,
            position: "left",
          },
        },
        {
          id: `newsletter-${generateId()}`,
          type: "newsletter",
          label: "Newsletter",
          icon: <IoMailUnreadOutline />,
          title: "Newsletter",
          subTitle: "Receive updates on the latest news and offers",
          placeholder: "youremail@gmail.com",
          actionText: "Subscribe",
          width: 300,
          buttonColor: "",
          textButton: "",
          iconHeading: {
            icon: "",
            color: "",
            size: 24,
            position: "left",
          },
        },
      ],
      wrapperStyle: {
        headingColor: "",
        subHeadingColor: "",
        headingFontSize: 18,
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
        text: `<p style="text-align:center;">© Copyright 2025 Plasgos</p>`,
        copyrightTextColor: "",
      },
    },
  });
};
