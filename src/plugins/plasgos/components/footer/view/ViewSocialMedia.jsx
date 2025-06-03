import { createElement } from "react";
import * as Icons from "react-icons/fa6";

const ViewSocialMedia = ({ children, content, index, wrapperStyle }) => {
  const onClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener noreferrer");
    }
  };

  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
      className="max-w-full"
    >
      {children}
      <div className="flex  flex-wrap gap-5  ">
        {content.options.map((opt) => {
          return (
            <div
              key={opt.id}
              className={`${opt.value ? "cursor-pointer" : ""}`}
              onClick={() => onClick(opt.value)}
            >
              {Icons[opt.icon] ? (
                <div>
                  {createElement(Icons[opt.icon], {
                    size: 28,
                    color: wrapperStyle.subHeadingColor,
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewSocialMedia;
