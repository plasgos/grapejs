import ContainerView from "@/components/ContainerView";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { onActionClickTarget } from "@/utils/onActionClickTarget";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";

const ContentShowcase = ({ section, editor }) => {
  const { isFocusContent } = useSelector((state) => state.landingPage);
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
  } = section?.wrapperStyle || {};

  const columnClass =
    column === "6"
      ? "md:grid-cols-6"
      : column === "5"
      ? "md:grid-cols-5"
      : column === "4"
      ? "md:grid-cols-4"
      : column === "3"
      ? "md:grid-cols-3"
      : column === "2"
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div
        className={`relative 
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
        {contents.map((content) => (
          <div
            key={content.id}
            className={`  ${getContentFocusStyle(
              isFocusContent,
              content.id
            )} text-center flex flex-col items-center p-2 `}
          >
            <div className="w-full flex flex-col">
              {imagePosition === "top" && (
                <LazyLoadImage
                  src={content?.image}
                  alt={content?.alt ? content.alt : ""}
                  style={{
                    aspectRatio,
                  }}
                  className={`w-full object-contain my-3 ${
                    content?.target?.options?.type ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onActionClickTarget(content?.target, editor)}
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                />
              )}

              <p
                style={{
                  color: titleColor,
                  fontFamily: fontFamily,
                  fontSize: fontSize,
                }}
                className={`w-full break-all ${textAligment} ${fontFamily}   ${fontWeight} `}
              >
                {content.title}
              </p>

              {imagePosition === "center" && (
                <LazyLoadImage
                  src={content?.image}
                  alt={content?.alt ? content.alt : ""}
                  style={{
                    aspectRatio,
                  }}
                  className={`w-full object-contain my-3 ${
                    content?.target?.options?.type ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onActionClickTarget(content?.target, editor)}
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                />
              )}

              <div
                className="break-all"
                style={{
                  lineHeight: 1.4,
                  color: section?.wrapperStyle?.colorDescription,
                }}
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />

              {imagePosition === "bottom" && (
                <LazyLoadImage
                  src={content?.image}
                  alt={content?.alt ? content.alt : ""}
                  style={{
                    aspectRatio,
                  }}
                  className={`w-full object-contain my-3 ${
                    content?.target?.options?.type ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onActionClickTarget(content?.target, editor)}
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </ContainerView>
  );
};

export default ContentShowcase;
