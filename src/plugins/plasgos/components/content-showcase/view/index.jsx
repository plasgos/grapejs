import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { memo, useMemo } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ViewContentShowcase({ section, editor, isFocusContent }) {
  const { contents } = section;

  const {
    column,
    aspectRatio,
    imagePosition,
    titleColor,
    fontFamily,
    fontWeight,
    fontSize,
    textAligment,
    rounded,
    descriptionColor,
    descriptionFontWeight,
    descriptionFontFamily,
    descriptionFontSize,
    textAligmentDescription,
  } = section?.wrapperStyle || {};

  const columnClass = useMemo(() => {
    switch (column) {
      case "6":
        return "md:grid-cols-6";
      case "5":
        return "md:grid-cols-5";
      case "4":
        return "md:grid-cols-4";
      case "3":
        return "md:grid-cols-3";
      case "2":
        return "md:grid-cols-2";
      default:
        return "md:grid-cols-1";
    }
  }, [column]);

  return (
    <div
      className={`relative items-stretch
    grid 
    gap-2 
    p-5 
    place-items-start 
    w-full 
    grid-cols-1
    sm:grid-cols-2
    ${columnClass}
  `}
    >
      {contents.map((content) => {
        return (
          <div
            key={content.id}
            className={`  ${getContentFocusStyle(
              isFocusContent,
              content.id
            )} w-full text-center flex flex-col items-center p-2 `}
          >
            <div className="w-full flex flex-col ">
              {imagePosition === "top" && (
                <div
                  className="w-full relative my-3"
                  style={{
                    aspectRatio,
                    borderRadius: rounded,
                    overflow: "hidden",
                  }}
                >
                  <LazyLoadImage
                    src={content?.image}
                    alt={content?.alt || ""}
                    className={`w-full h-full object-cover ${
                      content?.target?.options?.type ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      onActionClickTarget(
                        content?.target,

                        editor
                      )
                    }
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              )}

              <p
                style={{
                  color: titleColor,
                  fontFamily,
                  fontSize,
                  fontWeight,
                }}
                className={`w-full break-all ${textAligment}  `}
              >
                {content.title}
              </p>

              {imagePosition === "center" && (
                <div
                  className="w-full relative my-3"
                  style={{
                    aspectRatio,
                    borderRadius: rounded,
                    overflow: "hidden",
                  }}
                >
                  <LazyLoadImage
                    src={content?.image}
                    alt={content?.alt || ""}
                    className={`w-full h-full object-cover ${
                      content?.target?.options?.type ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      onActionClickTarget(
                        content?.target,

                        editor
                      )
                    }
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              )}

              <p
                style={{
                  color: descriptionColor,
                  fontFamily: descriptionFontFamily,
                  fontSize: descriptionFontSize,
                  fontWeight: descriptionFontWeight,
                }}
                className={`w-full break-all ${textAligmentDescription}  `}
              >
                {content.description}
              </p>

              {imagePosition === "bottom" && (
                <div
                  className="w-full relative my-3"
                  style={{
                    aspectRatio,
                    borderRadius: rounded,
                    overflow: "hidden",
                  }}
                >
                  <LazyLoadImage
                    src={content?.image}
                    alt={content?.alt || ""}
                    className={`w-full h-full object-cover ${
                      content?.target?.options?.type ? "cursor-pointer" : ""
                    }`}
                    onClick={() => onActionClickTarget(content?.target, editor)}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ViewContentShowcase);
