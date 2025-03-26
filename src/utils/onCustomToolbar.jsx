import { renderToStaticMarkup } from "react-dom/server";
import { FaTrashAlt } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

import store from "@/redux/store";
import { setIsEditComponent } from "@/redux/modules/landing-page/landingPageSlice";

export const onCustomToolbar = (editor) => {
  editor.on("component:selected", (component) => {
    const wrapper = editor.getWrapper();

    if (component.get("type") === "modal-popup") {
      const customToolbar = [
        {
          id: "custom-edit",
          attributes: { title: "Edit" },
          label: renderToStaticMarkup(<LuPencilLine size={18} />),
          command: "custom-edit",
        },
        {
          id: "custom-remove",
          attributes: { title: "Remove" },
          label: renderToStaticMarkup(<FaTrashAlt />),
          command: "core:component-delete",
        },
      ];
      component.set("toolbar", customToolbar);
      return;
    }

    if (component === wrapper) {
      component.set("toolbar", []);
      return;
    }
    component.set("toolbar", []);

    const customToolbar = [
      {
        id: "custom-edit",
        attributes: { title: "Edit" },
        label: renderToStaticMarkup(<LuPencilLine size={18} />),
        command: "custom-edit",
      },
      {
        id: "custom-copy",
        attributes: { title: "Copy" },
        label: renderToStaticMarkup(<IoCopyOutline size={18} />),
        command: "custom-copy",
      },
      {
        id: "custom-remove",
        attributes: { title: "Remove" },
        label: renderToStaticMarkup(<FaTrashAlt size={18} />),
        command: "core:component-delete",
      },
    ];
    component.set("toolbar", customToolbar);
  });

  editor.Commands.add("custom-edit", {
    run() {
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
};
