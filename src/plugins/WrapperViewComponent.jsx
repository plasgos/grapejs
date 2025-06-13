import ContainerView from "@/components/ContainerView";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";

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
