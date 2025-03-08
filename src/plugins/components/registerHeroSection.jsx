import heroImg from "@/assets/Devices-pana.svg";

import ViewHeroSection from "@/view/hero-section";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";

import { BsGrid1X2Fill } from "react-icons/bs";

export const registerHeroSection = (editor) => {
  editor.BlockManager.add("hero-section", {
    label: "Hero Section",
    category: "Contents",
    content: { type: "hero-section" },
    activate: true,
    media: renderToString(<BsGrid1X2Fill size={40} />),
  });

  editor.Components.addType("hero-section", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        attributes: {},
        blockLabel: "Hero Section",
        category: "Contents",
        blockIcon: <BsGrid1X2Fill size={20} />,
        isDragging: false,
        customComponent: {
          scrollTarget: undefined,
          contents: [
            {
              id: "hero-01",
              width: 800,
              image: heroImg,
              imagePosition: "left",
              buttons: [
                {
                  id: "button-01",
                  stylesBtn: {
                    title: "Get Started",
                    btnColor: "",
                    textColor: "",
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
                  isFocused: false,
                },
                {
                  id: "button-02",
                  stylesBtn: {
                    title: "Explore Demo",
                    btnColor: "rgb(228 223 223 ,1)",
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
                  isFocused: false,
                },
              ],
              rotation: 0,
              textBanner: `<p><span style="font-size:36px;"><strong>Eksplorasi Teknologi Masa Depan</strong></span></p><p><span style="color:hsl(0, 0%, 0%);font-family:Inter, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Noto Sans&quot;, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, Oxygen, &quot;Open Sans&quot;, sans-serif;font-size:16.002px;">Temukan inovasi terbaru dalam dunia teknologi dan bagaimana hal itu akan mengubah hidup kita. Saksikan video penjelasannya di sini.</span></p>`,
              textShadow: null,
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
            variant: "no-image",
            btnPosition: "justify-start",
          },
          animationText: {
            type: null,
            duration: 1,
            delay: null,
            isReplay: false,
          },
          background: {
            bgType: null,
            bgColor: "#2196f3",
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
      },
    },
    view: {
      init() {
        this.listenTo(
          this.model,
          "change:customComponent",
          this.renderReactComponent
        );

        this.renderReactComponent();
      },

      renderReactComponent() {
        if (!this.root) {
          this.root = createRoot(this.el); // Hanya buat satu instance root
        }

        this.root.render(
          <ViewHeroSection
            section={this.model.get("customComponent")}
            editor={editor}
          />
        );
      },
    },
    remove() {
      if (this.reactRoot) {
        this.reactRoot.unmount();
      }
    },
  });
};
