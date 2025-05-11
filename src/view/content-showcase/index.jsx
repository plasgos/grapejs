import ContainerView from "@/components/ContainerView";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { memo } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";

function ContentShowcase({ section, editor, index }) {
  const { isFocusContent } = useSelector((state) => state.landingPage);

  const [globalOptions] = useGlobalOptions(editor);
  const { schemeColor } = globalOptions || {};

  const { contents } = section;

  const textColor = schemeColor?.colours[index];

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

  const computedTitleColor =
    titleColor.toLowerCase() !== `#${textColor?.primary?.toLowerCase()}`
      ? titleColor
      : `#${textColor?.primary}`;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
    >
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
                        onActionClickTarget(content?.target, editor)
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
                    color: computedTitleColor,
                    fontFamily: fontFamily,
                    fontSize: fontSize,
                  }}
                  className={`w-full break-all ${textAligment} ${fontFamily}   ${fontWeight} `}
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
                        onActionClickTarget(content?.target, editor)
                      }
                      effect="blur"
                      wrapperProps={{
                        style: { transitionDelay: "1s" },
                      }}
                    />
                  </div>
                )}

                <div
                  className="rich-text break-all"
                  style={{ "--descriptionColor": `#${textColor?.secondary}` }}
                  dangerouslySetInnerHTML={{
                    __html: content.description,
                  }}
                />

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
                      onClick={() =>
                        onActionClickTarget(content?.target, editor)
                      }
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
    </ContainerView>
  );
}

export default memo(ContentShowcase);
