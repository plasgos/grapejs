import bca from "@/assets/bca.png";
import mandiri from "@/assets/mandiri.png";
import { generateId } from "@/lib/utils";
import { TbLayoutNavbarFilled } from "react-icons/tb";
import { injectComponents } from "../injectComponent";

import plgLogo from "@/assets/plg-logo.png";

import ViewNavbar from "@/view/navbar";
import { BsInfoSquareFill } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaLink,
  FaMapMarkerAlt,
  FaRegImages,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import {
  IoCall,
  IoMailUnreadOutline,
  IoShareSocialSharp,
} from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";

export const navbarComponent = (editor) => {
  injectComponents(editor, {
    type: "navbar",
    label: "Navbar",
    icon: <TbLayoutNavbarFilled size={40} />,
    category: "Navbar",
    ViewComponent: ViewNavbar,
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
            color: "rgba(0,0,0,0,1)",
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
            color: "rgba(0,0,0,0,1)",
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
              icon: <FaFacebook size={32} />,
              placeholder: "https://facebook.com/username",
            },
            {
              id: `ig-${generateId()}`,
              label: "Instagram",
              icon: <FaInstagram size={32} />,
              value: "",
              placeholder: "https://instagram.com/username",
            },
            {
              id: `x-${generateId()}`,
              label: "Twitter (X)",
              icon: <FaSquareXTwitter size={32} />,
              value: "",
              placeholder: "https://x.com/username",
            },
          ],
          title: "Follow us",
          width: 250,
          iconHeading: {
            icon: "",
            color: "rgba(0,0,0,0,1)",
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
              icon: <FaMapMarkerAlt />,
            },
            {
              id: `phoneNumber-${generateId()}`,
              label: "Phone Number",
              icon: <IoCall />,
              value: "(021) 2248 1664",
            },
            {
              id: `email-${generateId()}`,
              label: "Email",
              icon: <MdOutlineMailOutline />,
              value: "costumer.care@plasgos.co.id",
            },
            {
              id: `whatsapp-${generateId()}`,
              label: "whatsapp",
              icon: <FaWhatsapp />,
              value: "0853-1111-1010",
            },
          ],
          title: "Contact Info",
          width: 300,
          iconHeading: {
            icon: "",
            color: "rgba(0,0,0,0,1)",
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
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "left",
          },
        },
      ],
      wrapperStyle: {
        headingColor: "rgba(0, 0, 0, 1)",
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
      logo: plgLogo,
      logoWidth: 150,
    },
  });
};
