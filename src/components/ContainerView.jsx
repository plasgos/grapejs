import { useBackgroundStyles } from "@/hooks/useBackgroundStyle";
import { useSelector } from "react-redux";

const ContainerView = ({
  children,
  section,
  editor,
  id,
  customStyles,
  customClassName,
  isFullwidth,
  schemaColorBackground,
}) => {
  const { selectedColorScheme } = useSelector((state) => state.landingPage);

  const editorModel = editor.getModel();
  const globalOptions = editorModel.get("globalOptions");
  const stylesBg = useBackgroundStyles(section);

  const backgroundColor =
    selectedColorScheme && section?.background?.bgType !== "bgColor"
      ? `#${schemaColorBackground}`
      : section?.background?.bgType === "bgColor"
      ? section?.background?.bgColor
      : "transparent";

  return (
    <div
      className={`${customClassName} mx-auto`}
      id={id}
      style={{
        paddingTop: stylesBg.paddingTop,
        paddingBottom: stylesBg.paddingBottom,
        backgroundColor,
        position: "relative",
        maxWidth: isFullwidth ? "100%" : globalOptions?.maxWidthPage,
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
