import ContainerView from "@/components/ContainerView";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

import { FaStar } from "react-icons/fa6";

const ViewTestimony = ({ section }) => {
  const { contents } = section;
  const {
    nameColor,
    fontWeight,
    fontFamily,
    fontSize,
    borderColor,
    profectionColor,
    variant,

    starsColor,
    starsSize,
  } = section.wrapperStyle;

  return (
    <ContainerView id={section?.scrollTarget?.value || ""} section={section}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-5 p-5">
        {contents.map((content) => {
          return (
            <div
              style={{
                border: `1px solid ${borderColor}`,
              }}
              key={content.id}
              className={`p-3 rounded-lg bg-white shadow    ${
                content.isFocused && "ring-2 ring-purple-600  bg-orange-100 "
              } `}
            >
              <div className="flex flex-col items-center gap-y-5">
                <div className="w-16 h-16 rounded-full  overflow-hidden shadow-md">
                  <LazyLoadImage
                    src={content?.image}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className={`object-cover  ${
                      content?.target?.options?.type ? "cursor-pointer" : ""
                    }`}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
                <div className="flex  gap-x-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < content.stars ? starsColor : "#ccc"}
                      size={starsSize}
                    />
                  ))}
                </div>

                <div className="">
                  <div
                    className="text-muted-foreground text-center text-xs"
                    style={{
                      textShadow: content?.textShadow,
                    }}
                    dangerouslySetInnerHTML={{ __html: content.description }}
                  />
                </div>

                <div className="text-center">
                  <p
                    style={{
                      color: nameColor,
                      fontFamily: fontFamily,
                      fontSize: fontSize,
                    }}
                    className={`w-full break-all ${fontFamily} ${fontWeight}`}
                  >
                    {content.name}
                  </p>
                  <p
                    style={{
                      color: profectionColor,
                    }}
                    className="text-muted-foreground text-xs"
                  >
                    {content.profetion}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ContainerView>
  );
};

export default ViewTestimony;
