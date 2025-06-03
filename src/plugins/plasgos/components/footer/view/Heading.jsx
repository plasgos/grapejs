import { createElement } from "react";
import * as Icons from "react-icons/fa";

const Heading = ({ content, wrapperStyle }) => {
  const { iconHeading } = content;
  return (
    <>
      {iconHeading?.position === "right" ? (
        <div className="flex  items-center gap-x-2 mb-3">
          <p
            style={{
              color: wrapperStyle?.headingColor,
              fontSize: wrapperStyle?.headingFontSize,
            }}
            className="font-semibold  break-all "
          >
            {content.title}
          </p>

          {iconHeading && Icons[iconHeading?.icon] && (
            <div
              style={{
                color: iconHeading?.color,
              }}
            >
              {createElement(Icons[iconHeading?.icon], {
                size: iconHeading.size,
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex  items-center gap-x-2 mb-3">
          {iconHeading && Icons[iconHeading?.icon] && (
            <div
              style={{
                color: iconHeading?.color,
              }}
            >
              {createElement(Icons[iconHeading?.icon], {
                size: iconHeading.size,
              })}
            </div>
          )}

          <p
            style={{
              color: wrapperStyle?.headingColor,
              fontSize: wrapperStyle?.headingFontSize,
            }}
            className="font-semibold   break-all "
          >
            {content.title}
          </p>
        </div>
      )}
    </>
  );
};

export default Heading;
