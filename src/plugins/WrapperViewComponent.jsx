import ContainerView from "@/components/ContainerView";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { viewComponentsRender } from "@/pages/deploy/_components/RenderFromData";
import { useEffect, useRef } from "react";

const RenderFromEditor = ({ childrenModels, editor }) => {
  if (!childrenModels || childrenModels.length === 0) return null;

  return childrenModels.map((childModel) => {
    const type = childModel.get("type");
    const Component = viewComponentsRender[type];
    if (!Component) return null;

    // Ambil children model (Backbone Collection)
    const childComponents = childModel.components();

    return (
      <WrapperViewComponent
        key={childModel.cid}
        ViewComponent={Component}
        editor={editor}
        section={childModel.get("customComponent")}
        childrenModels={childComponents}
        buildContainerStyle={null}
        buildChildComponents={null}
      />
    );
  });
};

const WrapperViewComponent = ({
  id,
  ViewComponent,
  section,
  editor,
  childrenModels,
  buildContainerStyle,
  buildChildComponents,
}) => {
  const [globalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

  const { isFocusContent, maxWidthPage } = currentGlobalOptions;

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (childrenModels && childrenModels.length > 0) {
      // Kosongkan dulu
      containerRef.current.innerHTML = "";

      // Append semua child component
      childrenModels.forEach((child) => {
        const childEl = child.view?.el;

        console.log("🚀 ~ childrenModels.forEach ~ childEl:", childEl);

        if (childEl) {
          containerRef.current.appendChild(childEl);
        }
      });
    }
  }, [childrenModels]);

  return (
    <ContainerView
      id={id}
      targetId={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      maxWidthPage={maxWidthPage}
    >
      {ViewComponent && (
        <ViewComponent
          section={section}
          editor={editor}
          maxWidthPage={maxWidthPage}
          isFocusContent={isFocusContent}
          buildContainerStyle={buildContainerStyle}
        />
      )}

      {buildChildComponents && buildChildComponents.length > 0 ? (
        buildChildComponents
      ) : (
        <div ref={containerRef} className="gjs-children-wrapper" />
      )}
    </ContainerView>
  );
};

export default WrapperViewComponent;

// <RenderFromEditor childrenModels={childrenModels} editor={editor} />
