import ViewEmptySpace from "@/view/empty-space";
import { FaRegSquare } from "react-icons/fa6";
import { injectComponents } from "../injectComponent";

export const emptySpaceComponent = (editor) => {
  injectComponents(editor, {
    type: "empty-space",
    label: "Empty Space",
    icon: <FaRegSquare />,
    ViewComponent: ViewEmptySpace,
    defaultCustomComponent: {
      scrollTarget: undefined,
      wrapperStyle: {
        height: 50,
      },
      editorTabConfig: {
        disableTransition: true,
        disableStyles: true,
        disableBackground: true,
      },
    },
  });
};
