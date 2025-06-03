import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ViewImagesFooter = ({ children, content, index, editor }) => {
  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
      className="max-w-full"
    >
      {children}

      <div className="flex flex-wrap gap-5 items-center ">
        {content.options.map((opt) => {
          return (
            <LazyLoadImage
              key={opt.id}
              src={opt?.image}
              alt={opt?.alt ? opt.alt : ""}
              style={{
                width: content.imageWidth,
              }}
              className={`object-contain  ${
                opt?.target?.options?.type ? "cursor-pointer" : ""
              }`}
              onClick={() => onActionClickTarget(opt?.target, editor)}
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ViewImagesFooter;
