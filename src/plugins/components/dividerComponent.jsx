import ViewDivider from "@/view/divider";
import { RxDividerHorizontal } from "react-icons/rx";
import { injectComponents } from "../injectComponent";

export const dividerComponent = (editor) => {
  injectComponents(editor, {
    type: "divider",
    label: "Divider",
    icon: <RxDividerHorizontal />,
    ViewComponent: ViewDivider,
    defaultCustomComponent: {
      scrollTarget: undefined,
      mainStyles: {
        variant: "solid",
        fullWidth: true,
        width: 800,
        height: 5,
        color: "rgba(19, 86, 236, 0.8)",
        iconBtn: {
          icon: "",
          color: "rgba(0,0,0,0,1)",
          size: 24,
          position: "center",
        },
      },
    },
  });
};
