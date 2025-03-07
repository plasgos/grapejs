import { useMemo } from "react";

export const useBackgroundStyles = (content) => {
  return useMemo(() => {
    const paddingTop = content.background?.paddingTop
      ? `calc(0px + ${content.background?.paddingTop}px)`
      : content.background?.paddingY
      ? `calc(0px + ${content.background?.paddingY}px)`
      : "0px";

    const paddingBottom = content.background?.paddingBottom
      ? `calc(0px + ${content.background?.paddingBottom}px)`
      : content.background?.paddingY
      ? `calc(0px + ${content.background?.paddingY}px)`
      : "0px";

    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.background?.bgImage
        ? `url(${content.background?.bgImage})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content.background?.blur}px)`,
      zIndex: -1,
      overflow: "hidden",
    };

    const calculateOpacity = content.background?.opacity / 100;

    const gradientStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: -1,
      backgroundImage: `linear-gradient(${content.background?.direction}, ${
        content.background?.isRevert
          ? content.background?.toColor
          : content.background?.fromColor
      }, ${
        content.background?.isRevert
          ? content.background?.fromColor
          : content.background?.toColor
      })`,
    };

    const backgroundPatternStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.background?.pattern
        ? `url(${content.background?.pattern})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -1,
      overflow: "hidden",
    };

    return {
      paddingTop,
      paddingBottom,
      backgroundImgStyle,
      calculateOpacity,
      gradientStyle,
      backgroundPatternStyle,
    };
  }, [content]);
};
