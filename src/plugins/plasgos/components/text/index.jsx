import { generateId } from "@/lib/utils";
import { injectComponents } from "@/plugins/injectComponent";
import { FaTextHeight } from "react-icons/fa6";
import ViewText from "./view";

export const textComponent = (editor) => {
  injectComponents(editor, {
    type: "custom-text",
    label: "Text",
    category: "Text",
    icon: <FaTextHeight />,
    ViewComponent: ViewText,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: `text-${generateId()}`,
          textShadow: null,
          text: `<p><span style="font-family: Anton; font-size: 40px; color: rgba(0,0,0,1)">The quick brown fox jumps over the lazy dog</span></p><p><span style="font-family: Fenix; color: rgba(0,0,0,1)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis numquam expedita molestiae accusamus, adipisci magnam. Cupiditate, autem dolore! Libero nisi harum assumenda molestiae officia blanditiis reprehenderit hic dolore iste inventore!</span></p>`,
          textColor: "",
          rotation: 0,
          alignText: "justify-center",
        },
      ],
      background: {
        bgType: null,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        padding: 120,
        marginTop: 0,
        marginBottom: 0,
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
        isFullWidth: false,
      },
    },
  });
};
