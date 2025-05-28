import { setIsEditComponent } from "@/redux/modules/landing-page/landingPageSlice";
import store from "@/redux/store";

import ToolbarPortal from "@/components/ToolbarOptions";
import { createRoot } from "react-dom/client";

export const onCustomToolbar = (editor, editComponent, setEditComponent) => {
  const checkToolbarReady = () => {
    const toolbarEl = document.querySelector(".gjs-toolbar");
    if (!toolbarEl) {
      // Retry in next animation frame
      requestAnimationFrame(checkToolbarReady);
      return;
    }

    if (!editor._toolbarRoot) {
      editor._toolbarRoot = createRoot(toolbarEl);
    }

    const renderToolbar = (component) => {
      if (!component || component === editor.getWrapper()) {
        editor._toolbarRoot.render(null);
        return;
      }

      editor._toolbarRoot.render(
        <ToolbarPortal
          editor={editor}
          editComponent={editComponent}
          setEditComponent={setEditComponent}
        />
      );
    };

    editor.on("component:selected", renderToolbar);
    editor.on("component:remove", () => renderToolbar(editor.getSelected()));
    editor.on("component:deselected", () =>
      renderToolbar(editor.getSelected())
    );
  };

  editor.Commands.add("custom-edit", {
    run(editor) {
      const selected = editor.getSelected();
      const selectedComponent = selected.view.el;

      if (selectedComponent) {
        selectedComponent.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      store.dispatch(setIsEditComponent(true));
    },
  });

  editor.Commands.add("custom-copy", {
    run(editor) {
      const selected = editor.getSelected();
      if (selected) {
        const clonedComponent = selected.clone();
        const parent = selected.parent();
        if (parent) {
          const components = parent.get("components");
          const currentIndex = components.indexOf(selected);
          parent.append(clonedComponent, { at: currentIndex + 1 });
        }
        editor.select(clonedComponent);
        const clonedElement = clonedComponent.view.el;
        if (clonedElement) {
          clonedElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    },
  });

  // Start polling for toolbar
  checkToolbarReady();
};
