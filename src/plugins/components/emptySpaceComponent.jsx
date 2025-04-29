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
      mainStyle: {
        height: 50,
      },
    },
  });
};
