import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewImage = ({ section, editor, buildContainerStyle }) => {
  const { contents, animation } = section;
  const { width, rotation, borderColor, shadow, variant } =
    section.wrapperStyle;

  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
      {variant === "centerPage" && (
        <div
          ref={elementRef}
          style={{
            "--animate-duration": `${duration}s`,
            willChange: "transform, opacity",
          }}
          className={`flex justify-center ${getClassName()}`}
        >
          {contents.map((content) => (
            <div
              className={`${shadow}`}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
              key={content.id}
            >
              <LazyLoadImage
                src={content?.image}
                alt={content?.alt ? content.alt : ""}
                style={{
                  width,
                  border: borderColor ? `2px solid ${borderColor}` : "",
                }}
                className={`object-contain  ${
                  content?.target?.options?.type ? "cursor-pointer" : ""
                }`}
                onClick={() => onActionClickTarget(content?.target, editor)}
                effect="blur"
                wrapperProps={{
                  style: { transitionDelay: "1s" },
                }}
              />
            </div>
          ))}
        </div>
      )}

      {(variant === "contentPage" || variant === "fullPage") && (
        <div
          ref={elementRef}
          style={{
            "--animate-duration": `${duration}s`,
            willChange: "transform, opacity",
          }}
          className={`flex justify-center ${getClassName()}`}
        >
          {contents.map((content) => (
            <div
              className={`${
                variant === "contentPage" ? "px-5" : ""
              } ${shadow} `}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
              key={content.id}
            >
              <LazyLoadImage
                src={content?.image}
                alt={content?.alt ? content.alt : ""}
                style={{
                  width: "100%",
                }}
                className={`object-contain  ${
                  content?.target?.options?.type ? "cursor-pointer" : ""
                }`}
                onClick={() => onActionClickTarget(content?.target, editor)}
                effect="blur"
                wrapperProps={{
                  style: { transitionDelay: "1s" },
                }}
              />
            </div>
          ))}
        </div>
      )}
    </ContainerView>
  );
};

export default ViewImage;
