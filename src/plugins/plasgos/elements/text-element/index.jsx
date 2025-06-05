import { injectELements } from "@/plugins/injectComponent";
import { FaTextHeight } from "react-icons/fa6";
import ViewTextElement from "./view";

export const textElement = (editor) => {
  injectELements(editor, {
    type: "text-element",
    label: "Text Element",
    category: "Text",
    icon: <FaTextHeight />,
    ViewComponent: ViewTextElement,
    defaultCustomComponent: {
      scrollTarget: undefined,
      text: `<p><span style="font-family: Anton; font-size: 40px; color: rgba(0,0,0,1)">The quick brown fox jumps over the lazy dog</span></p><p><span style="font-family: Fenix; color: rgba(0,0,0,1)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam expedita molestiae accusamus, adipisci magnam. Cupiditate, autem dolore! Libero nisi harum assumenda molestiae officia blanditiis reprehenderit hic dolore iste inventore!</span></p>`,
      textColor: "",
    },
  });
};
