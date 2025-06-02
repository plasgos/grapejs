import { MdOutlineOndemandVideo } from "react-icons/md";

import ViewVideo from "@/view/video";
import { injectComponents } from "../injectComponent";

export const videoComponent = (editor) => {
  injectComponents(editor, {
    type: "video-content",
    label: "Video",
    category: "Video",
    icon: <MdOutlineOndemandVideo />,
    ViewComponent: ViewVideo,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "video-01",
          url: "https://www.youtube.com/watch?v=wDchsz8nmbo",
          width: 500,
          ratio: 16 / 9,
          isAutoPlay: false,
          isLoop: true,
          isMuted: false,
          isControls: false,
          rotation: 0,
        },
      ],
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
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
    },
  });
};
