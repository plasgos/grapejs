import { generateId } from "@/lib/utils";
import { TbLayoutNavbarFilled } from "react-icons/tb";
import { injectComponents } from "../injectComponent";

import plgLogo from "@/assets/plg-logo.png";

import ViewNavbar, { componentsNavbar } from "@/view/navbar";
import { FaLink } from "react-icons/fa";
import { TfiLayoutAccordionList } from "react-icons/tfi";

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
          id: `single-link-${generateId()}`,
          type: "single-link",
          label: "Single Link",
          icon: <FaLink />,
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
          titleHeading: "About",
          iconHeading: {
            icon: "",
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "left",
          },
        },
        {
          id: `menu-link-${generateId()}`,
          type: "menu-link",
          label: "Menu Link",
          icon: <TfiLayoutAccordionList />,
          options: componentsNavbar.map((component, index) => ({
            ...component,
            id: `menu-${index}-${generateId()}`,
            target: {
              actionType: "link",
              options: {
                type: null,
              },
            },
          })),
          titleHeading: "Component Menu",
          column: "2",
          iconHeading: {
            icon: "",
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "left",
          },
        },
        {
          id: `menu-link-02-${generateId()}`,
          type: "menu-link",
          label: "Menu Link",
          icon: <TfiLayoutAccordionList />,
          options: componentsNavbar.map((component, index) => ({
            ...component,
            id: `menu-${index}-${generateId()}`,
            description: "",
            target: {
              actionType: "link",
              options: {
                type: null,
              },
            },
          })),
          titleHeading: "Component Single Menu",
          column: "1",
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
        headingFontSize: 16,
        fontWeight: "",
        fontFamily: "",

        description: {
          color: "",
          fontWeight: "",
          fontFamily: "",
        },
        menuBgColor: "",
        bgColorSidebar: "",
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
      side: "right",
    },
  });
};
