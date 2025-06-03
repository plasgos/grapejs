import { useBackgroundStyles } from "@/hooks/useBackgroundStyle";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";

const ContainerView = ({
  children,
  id,
  editor,
  section,
  customStyles,
  customClassName,
  buildContainerStyle,
}) => {
  const [globalOptions] = useGlobalOptions(editor);

  const maxWidthPage = !editor
    ? buildContainerStyle.maxWidthPage
    : globalOptions?.maxWidthPage;

  const { padding, marginTop, marginBottom, rounded, isFullWidth } =
    section.background || {};
  const stylesBg = useBackgroundStyles(section);

  const backgroundColor =
    section?.background?.bgType === "bgColor"
      ? section?.background?.bgColor
      : "";

  return (
    <div
      className={`${customClassName} mx-auto overflow-hidden`}
      id={id}
      style={{
        borderRadius: rounded,
        padding,
        marginTop,
        marginBottom,
        backgroundColor,
        position: "relative",
        maxWidth: isFullWidth ? "100%" : maxWidthPage,
        ...customStyles,
      }}
    >
      {section?.background?.bgType === "image" ? (
        <div style={stylesBg.backgroundImgStyle}></div>
      ) : section?.background?.bgType === "gradients" ? (
        <div style={stylesBg.gradientStyle}></div>
      ) : section?.background?.bgType === "pattern" ? (
        <div style={stylesBg.backgroundPatternStyle}></div>
      ) : null}

      {section?.background?.bgType === "image" &&
      section.background?.opacity ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor:
              section.background?.opacity < 0 ? "black" : "white",
            opacity: Math.abs(stylesBg.calculateOpacity),
          }}
        ></div>
      ) : null}

      {children}
    </div>
  );
};

export default ContainerView;
