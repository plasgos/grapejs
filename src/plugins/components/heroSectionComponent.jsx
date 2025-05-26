import ViewHeroSection from "@/view/hero-section";
import { BsGrid1X2Fill } from "react-icons/bs";
import { injectComponents } from "../injectComponent";

export const heroSectionComponent = (editor) => {
  injectComponents(editor, {
    type: "hero-section",
    label: "Hero Section",
    icon: <BsGrid1X2Fill />,
    ViewComponent: ViewHeroSection,
    defaultCustomComponent: {
      scrollTarget: undefined,
      contents: [
        {
          id: "hero-01",
          width: 800,
          image:
            "https://ik.imagekit.io/ez1ffaf6o/default-images/Devices-pana.svg?updatedAt=1747622141355",
          imagePosition: "left",
          textBanner: `<p><span style="font-size:36px;"><strong>Eksplorasi Teknologi Masa Depan</strong></span></p><p><span style="color:hsl(0, 0%, 0%);font-family:Inter, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Noto Sans&quot;, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, Oxygen, &quot;Open Sans&quot;, sans-serif;font-size:16.002px;">Temukan inovasi terbaru dalam dunia teknologi dan bagaimana hal itu akan mengubah hidup kita. Saksikan video penjelasannya di sini.</span></p>`,
          textShadow: null,
          textBannerColor: "",
          rotation: 0,
        },
      ],
      buttons: [
        {
          id: "button-01",
          stylesBtn: {
            title: "Get Started",
            btnColor: "#000000",
            textColor: "#ffffff",
            size: "default",
            variant: "default",
            rounded: 10,
            shadow: "",
          },
          iconBtn: {
            icon: "",
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "right",
          },
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
        {
          id: "button-02",
          stylesBtn: {
            title: "Explore Demo",
            btnColor: "#000000",
            textColor: "",
            size: "default",
            variant: "outline",
            rounded: 10,
            shadow: "",
          },
          iconBtn: {
            icon: "",
            color: "rgba(0,0,0,0,1)",
            size: 24,
            position: "right",
          },
          target: {
            actionType: "link",
            options: {
              type: null,
            },
          },
        },
      ],
      animation: {
        type: null,
        duration: 1,
        delay: null,
        isReplay: false,
      },
      wrapperStyle: {
        withButton: true,
        variant: "basic",
        btnPosition: "justify-start",
        shadow: "shadow-none",
        isFullWidth: true,
        alignText: "justify-center",
        alignButtons: "justify-center",
        widthText: 500,
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
        paddingY: 120,
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
