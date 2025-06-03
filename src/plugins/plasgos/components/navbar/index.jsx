import { generateId } from "@/lib/utils";
import { TbLayoutNavbarFilled } from "react-icons/tb";
import { injectComponents } from "@/plugins/injectComponent";

import { FaLink } from "react-icons/fa";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import ViewNavbar, { componentsNavbar } from "./view";

export const navbarComponent = (editor) => {
  injectComponents(editor, {
    type: "navbar",
    label: "Navbar",
    icon: <TbLayoutNavbarFilled />,
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
            color: "",
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
            color: "",
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
            color: "",
            size: 24,
            position: "left",
          },
        },
      ],
      wrapperStyle: {
        headingColor: "",
        headingFontSize: 16,
        fontWeight: "",
        fontFamily: "",

        description: {
          descriptionColor: "",
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
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
        rounded: 0,
        isFullWidth: true,
      },
      logo: "https://ik.imagekit.io/ez1ffaf6o/default-images/plg-logo.png?updatedAt=1747224274623",
      logoWidth: 150,
      side: "right",
    },
  });
};
