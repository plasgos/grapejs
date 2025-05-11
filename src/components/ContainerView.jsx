import { useBackgroundStyles } from "@/hooks/useBackgroundStyle";

const ContainerView = ({
  children,
  section,
  editor,
  id,
  customStyles,
  customClassName,
  isFullwidth,
  index,
}) => {
  const globalOptions = editor.getModel()?.get("globalOptions");

  const { maxWidthPage, schemeColor } = globalOptions || {};

  const components = editor?.getComponents()?.models;

  const schemaColorLastIndex =
    schemeColor?.colours[schemeColor?.colours.length - 1];

  const isLastIndex = index === components.length - 1;

  const colours = schemeColor?.colours || [];
  const colorIndex = (() => {
    if (isLastIndex) return null; // nanti pakai schemaColorLastIndex
    if (index < colours.length - 1) return index;
    return colours.length - 2; // pakai warna sebelum terakhir
  })();

  const schemaColorBackground = isLastIndex
    ? schemaColorLastIndex?.background
    : colours[colorIndex]?.background;

  const stylesBg = useBackgroundStyles(section);

  const backgroundColor =
    schemeColor && section?.background?.bgType !== "bgColor"
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
        maxWidth: isFullwidth ? "100%" : maxWidthPage,
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
