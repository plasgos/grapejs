import ContainerView from "@/components/ContainerView";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { onActionClickTarget } from "@/utils/onActionClickTarget";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ViewListImages = ({ section, editor, index }) => {
  const [globalOptions] = useGlobalOptions(editor);
  const { schemeColor, isFocusContent } = globalOptions || {};
  const { contents } = section;
  const { column, aspectRatio, rounded } = section?.wrapperStyle || {};

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
      index={index}
    >
      <div
        className={`  relative  items-stretch   
    grid 
    gap-5
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
            )}  w-full  `}
          >
            <div
              className="w-full relative "
              style={{
                aspectRatio,
                borderRadius: rounded,
                overflow: "hidden",
              }}
            >
              <LazyLoadImage
                src={content?.image}
                alt={content?.alt ? content.alt : ""}
                style={{
                  aspectRatio,
                }}
                className={`w-full h-full object-cover  ${
                  content?.target?.options?.type ? "cursor-pointer" : ""
                } `}
                onClick={() => onActionClickTarget(content?.target, editor)}
                effect="blur"
                wrapperProps={{
                  style: { transitionDelay: "1s" },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ContainerView>
  );
};

export default ViewListImages;
