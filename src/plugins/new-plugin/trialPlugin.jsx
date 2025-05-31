import { Button } from "@/components/ui/button";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { RiLayoutColumnFill } from "react-icons/ri";

const WrapperComponent = ({ data }) => {
  console.log("🚀 ~ WrapperComponent ~ data:", data);
  const style = data?.wrapperStyle || {
    padding: "40px",
    backgroundColor: "#f4f4f4",
    textAlign: "center",
  };

  return (
    <div style={style}>
      {/* Bagian ini hanya untuk styling, bukan children */}
    </div>
  );
};

const TextComponent = ({ data }) => {
  const content = data?.text || "Default text";
  const tag = data?.tag || "p";

  const Tag = tag;

  return <Tag>{content}</Tag>;
};

const ButtonComponent = ({ data }) => {
  return (
    <div>
      <Button>{data.label}</Button>
    </div>
  );
};

export const heroData = {
  type: "hero-section",
  contents: [
    {
      header: "Welcome to Our Site",
      sub: "Build anything easily",
      button: "Get Started",
    },
  ],
};

const trialPlugin = (editor) => {
  editor.on("load", () => {
    editor.BlockManager.add("custom-hero", {
      label: "Custom Hero",
      category: "Sections",
      content: {
        type: "custom-wrapper",
        customComponent: {
          wrapperStyle: {
            backgroundColor: "red",
            padding: "50px",
            textAlign: "center",
          },
        },
        components: [
          {
            type: "custom-button",
            customComponent: {
              label: "Get Started",
              variant: "primary",
            },
          },
        ],
      },
      media: renderToString(<RiLayoutColumnFill />),
    });

    editor.Components.addType("custom-wrapper", {
      model: {
        defaults: {
          tagName: "section",
          draggable: true,
          droppable: true,
          selectable: true,
          highlightable: true,
          customComponent: {
            wrapperStyle: {
              backgroundColor: "red",
              padding: "50px",
              textAlign: "center",
            },
          },
        },
      },

      view: {
        init() {
          // Buat wrapper visual (di atas), tidak mengganggu children
          const visualWrapper = document.createElement("div");
          visualWrapper.className = "visual-wrapper";
          this.el.prepend(visualWrapper); // Prepend agar tetap bisa render children

          this.reactEl = visualWrapper;
          this.renderReactComponent();

          this.listenTo(
            this.model,
            "change:customComponent",
            this.renderReactComponent
          );
        },

        renderReactComponent() {
          if (!this.root && this.reactEl) {
            this.root = createRoot(this.reactEl);
          }

          this.root.render(
            <WrapperComponent data={this.model.get("customComponent")} />
          );
        },

        remove() {
          if (this.root) {
            this.root.unmount();
          }
        },
      },
    });

    editor.Components.addType("custom-button", {
      model: {
        defaults: {
          tagName: "div",
          draggable: true,
          droppable: false,
          selectable: true,
          highlightable: true,
          hoverable: true,
          removable: false,
          copyable: false,
          toolbar: [],
          noMove: true,
          noResize: true,
          attributes: {},
          customComponent: {
            label: "Click me",
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

          const editorModel = editor.getModel();
          this.listenTo(
            editorModel,
            "change:globalOptions",
            this.handleGlobalOptionsChange
          );

          this.renderReactComponent();
        },

        handleGlobalOptionsChange() {
          this.renderReactComponent();
        },

        renderReactComponent() {
          if (!this.root) {
            this.root = createRoot(this.el);
          }

          this.root.render(
            <ButtonComponent data={this.model.get("customComponent")} />
          );
        },
      },
      remove() {
        if (this.root) {
          this.root.unmount();
        }
      },
    });
  });
};

export default trialPlugin;
