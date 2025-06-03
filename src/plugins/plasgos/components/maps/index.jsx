import { injectComponents } from "@/plugins/injectComponent";
import { SiGooglemaps } from "react-icons/si";
import ViewMaps from "./view";

export const mapsComponent = (editor) => {
  injectComponents(editor, {
    type: "custom-maps",
    label: "Maps",
    category: "Footer",
    icon: <SiGooglemaps />,
    ViewComponent: ViewMaps,
    defaultCustomComponent: {
      scrollTarget: undefined,
      iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24102697232!2d106.74694526819911!3d-6.229740081403368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1748836597428!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
      height: "400",
    },
  });
};
