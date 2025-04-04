import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewImagesFooter = ({ content, index, editor }) => {
  const { iconBtn } = content;

  return (
    <div
      style={{
        width: content.width,
      }}
      key={index}
      className=""
    >
      {iconBtn?.position === "right" ? (
        <div className="flex  items-center gap-x-2 mb-3">
          <p className="font-semibold text-lg ">{content.title}</p>

          {iconBtn && Icons[iconBtn?.icon] && (
            <div
              style={{
                color: iconBtn?.color,
              }}
            >
              {createElement(Icons[iconBtn?.icon], {
                size: iconBtn.size,
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex  items-center gap-x-2 mb-3">
          {iconBtn && Icons[iconBtn?.icon] && (
            <div
              style={{
                color: iconBtn?.color,
              }}
            >
              {createElement(Icons[iconBtn?.icon], {
                size: iconBtn.size,
              })}
            </div>
          )}

          <p className="font-semibold text-lg ">{content.title}</p>
        </div>
      )}

      {/* <p className="font-semibold text-lg mb-3">{content.title}</p> */}

      <div className="flex flex-wrap gap-5 items-center ">
        {content.options.map((opt) => {
          return (
            <LazyLoadImage
              key={opt.id}
              src={opt?.image}
              alt={opt?.alt ? opt.alt : ""}
              style={{
                width: content.imageSize,
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
