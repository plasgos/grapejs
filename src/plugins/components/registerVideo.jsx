import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { MdOutlineOndemandVideo } from "react-icons/md";

import ViewVideo from "@/view/video";

export const registerVideo = (editor) => {
  editor.BlockManager.add("video-content", {
    label: "Video",
    category: "Contents",
    content: { type: "video-content" },
    activate: true,
    media: renderToString(<MdOutlineOndemandVideo size={40} />),
  });

  editor.Components.addType("video-content", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        selectable: true,
        highlightable: true,
        hoverable: true,
        attributes: {},
        blockLabel: "Video",
        category: "Contents",
        blockIcon: <MdOutlineOndemandVideo size={20} />,
        isDragging: false,
        customComponent: {
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
          <ViewVideo section={this.model.get("customComponent")} />
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
