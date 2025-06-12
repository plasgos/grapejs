import ContainerView from "@/components/ContainerView";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { useEffect } from "react";

const WrapperViewComponent = ({
  ViewComponent,
  section,
  editor,
  childrenModels,
  buildContainerStyle,
  buildChildComponents,
  viewId,
  isFloatingComponent,
}) => {
  const [globalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

  const { isFocusContent, maxWidthPage } = currentGlobalOptions;

  // useEffect(() => {
  //   if (editor) {
  //     const canvas = editor.Canvas.getBody(); // DOM body dari iframe canvas
  //     console.log("🚀 ~ useEffect ~ canvas:", canvas);

  //     window.addEventListener("mousedown", (e) => {
  //       console.log("RUINNN");
  //       const selected = editor.getSelected();
  //       console.log("🚀 ~ useEffect ~ selected:", selected);
  //       if (selected) {
  //         selected.set({
  //           draggable: false,
  //           droppable: false,
  //         });
  //       }
  //     });
  //   }
  // }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const iframe = editor.Canvas.getFrameEl();
    const iframeDoc = iframe?.contentDocument;

    const handlePointerDown = (e) => {
      const isToolbar = e.target.closest(".gjs-toolbar");
      window.__allowDragFromToolbar = !!isToolbar;
    };

    const handleDragStart = (e) => {
      if (!window.__allowDragFromToolbar) {
        e.preventDefault?.();
        e.stopPropagation?.();
        editor.stopCommand("core:component-drag");
      }
      window.__allowDragFromToolbar = false;
    };

    if (iframeDoc) {
      iframeDoc.addEventListener("pointerdown", handlePointerDown);
      iframeDoc.addEventListener("dragstart", handleDragStart);
    }

    return () => {
      iframeDoc?.removeEventListener("pointerdown", handlePointerDown);
      iframeDoc?.removeEventListener("dragstart", handleDragStart);
    };
  }, [editor]);

  return (
    <>
      {isFloatingComponent ? (
        <ViewComponent
          section={section}
          editor={editor}
          maxWidthPage={maxWidthPage}
          isFocusContent={isFocusContent}
          buildContainerStyle={buildContainerStyle}
          viewId={viewId}
        />
      ) : (
        <ContainerView
          targetId={section?.scrollTarget?.value || ""}
          editor={editor}
          section={section}
          maxWidthPage={maxWidthPage}
        >
          <ViewComponent
            section={section}
            editor={editor}
            maxWidthPage={maxWidthPage}
            isFocusContent={isFocusContent}
            buildContainerStyle={buildContainerStyle}
            viewId={viewId}
          />
        </ContainerView>
      )}
    </>
  );
};

export default WrapperViewComponent;
