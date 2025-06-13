import { useMemo } from "react";

export const useBackgroundStyles = (content) => {
  return useMemo(() => {
    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content?.background?.bgImage
        ? `url(${content?.background?.bgImage})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content?.background?.blur}px)`,
      overflow: "hidden",
    };

    const calculateOpacity = content?.background?.opacity / 100;

    const gradientStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backgroundImage: `linear-gradient(${content?.background?.direction}, ${
        content?.background?.isRevert
          ? content?.background?.toColor
          : content?.background?.fromColor
      }, ${
        content?.background?.isRevert
          ? content?.background?.fromColor
          : content?.background?.toColor
      })`,
    };

    const backgroundPatternStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content?.background?.pattern
        ? `url(${content?.background?.pattern})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
    };

    if (!content) {
      return null;
    }

    return {
      backgroundImgStyle,
      calculateOpacity,
      gradientStyle,
      backgroundPatternStyle,
    };
  }, [content]);
};
