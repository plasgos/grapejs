import { BiSolidVideos } from "react-icons/bi";
import { injectComponents } from "@/plugins/injectComponent";
import ViewVideoText from "./view";

export const videoTextComponent = (editor) => {
  injectComponents(editor, {
    type: "video-text-banner",
    label: "Video Text Banner",
    category: "Video",
    icon: <BiSolidVideos />,
    ViewComponent: ViewVideoText,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "video-01",
          url: "https://www.youtube.com/watch?v=wDchsz8nmbo",
          width: 800,
          ratio: 16 / 9,
          isAutoPlay: false,
          isLoop: true,
          isMuted: false,
          isControls: false,
          rotation: 0,
          textBanner: `<p><span style="font-size:36px;"><strong>Eksplorasi Teknologi Masa Depan</strong></span></p><p><span style="color:hsl(0, 0%, 0%);font-family:Inter, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Noto Sans&quot;, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, Oxygen, &quot;Open Sans&quot;, sans-serif;font-size:16.002px;">Temukan inovasi terbaru dalam dunia teknologi dan bagaimana hal itu akan mengubah hidup kita. Saksikan video penjelasannya di sini.</span></p>`,
          textBannerColor: "",
          textShadow: null,
        },
      ],
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
      },
      animationText: {
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
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
        rounded: 0,
        isFullWidth: false,
      },
    },
  });
};
