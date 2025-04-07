import ContainerView from "@/components/ContainerView";
import { onActionClickTarget } from "@/utils/onActionClickTarget";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from "react-redux";

const ViewListImages = ({ section, editor }) => {
  const { isFocusContent } = useSelector((state) => state.landingPage);
  const { contents } = section;
  const { column, aspectRatio } = section?.wrapperStyle || {};

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
        className={`      
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
            className={`${
              isFocusContent === content.id &&
              "ring-2 ring-purple-600  bg-orange-100  transition-all duration-300 ease-in-out"
            }    `}
          >
            <LazyLoadImage
              src={content?.image}
              alt={content?.alt ? content.alt : ""}
              style={{
                aspectRatio,
              }}
              className={`w-full object-contain  ${
                content?.target?.options?.type ? "cursor-pointer" : ""
              } `}
              onClick={() => onActionClickTarget(content?.target, editor)}
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
            />
          </div>
        ))}
      </div>
    </ContainerView>
  );
};

export default ViewListImages;
