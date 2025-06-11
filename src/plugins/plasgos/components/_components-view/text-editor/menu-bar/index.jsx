import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { useSelector } from "react-redux";

import ViewDesktopBar from "./ViewDesktopBar";
import ViewTabletBar from "./ViewTabletBar";
import ViewMobileBar from "./ViewMobileBar";

const MenuBarTextEditor = ({
  editor,
  onChange,
  selectedComponent,
  schemeColor,
}) => {
  const { currentDeviceView } = useSelector((state) => state.landingPage);

  const Options = [
    // {
    //   label: "Heading 1",
    //   icon: <Heading1 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   preesed: editor.isActive("heading", { level: 1 }),
    // },
    // {
    //   label: "Heading 2",
    //   icon: <Heading2 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   preesed: editor.isActive("heading", { level: 2 }),
    // },
    // {
    //   label: "Heading 3",
    //   icon: <Heading3 className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    //   preesed: editor.isActive("heading", { level: 3 }),
    // },

    {
      label: "Text Left",
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      label: "Text Center",
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      label: "Text Right",
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      label: "Bullet List",
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      label: "Ordered List",
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
  ];

  const bubbleMenuOptions = [
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];

  const renderToolbar = () => {
    switch (currentDeviceView) {
      case "desktop":
        return (
          <ViewDesktopBar
            editor={editor}
            options={Options}
            bubbleMenuOptions={bubbleMenuOptions}
            onChange={onChange}
            schemeColor={schemeColor}
            selectedComponent={selectedComponent}
          />
        );
      case "tablet":
        return (
          <ViewTabletBar
            editor={editor}
            options={Options}
            bubbleMenuOptions={bubbleMenuOptions}
            onChange={onChange}
            schemeColor={schemeColor}
            selectedComponent={selectedComponent}
          />
        );
      case "mobileModern":
        return (
          <ViewMobileBar
            editor={editor}
            options={Options}
            bubbleMenuOptions={bubbleMenuOptions}
            onChange={onChange}
            schemeColor={schemeColor}
            selectedComponent={selectedComponent}
          />
        );
    }
  };

  return <>{renderToolbar()}</>;
};

export default MenuBarTextEditor;
