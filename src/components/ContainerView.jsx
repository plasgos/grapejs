import { useBackgroundStyles } from "@/hooks/useBackgroundStyle";

const ContainerView = ({
  children,
  section,
  id,
  customStyles,
  customClassName,
}) => {
  const stylesBg = useBackgroundStyles(section);
  return (
    <div
      className={`${customClassName}`}
      id={id}
      style={{
        paddingTop: stylesBg.paddingTop,
        paddingBottom: stylesBg.paddingBottom,
        backgroundColor:
          section?.background?.bgType === "bgColor"
            ? section?.background?.bgColor
            : "transparent",
        position: "relative",
        zIndex: 1,
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
