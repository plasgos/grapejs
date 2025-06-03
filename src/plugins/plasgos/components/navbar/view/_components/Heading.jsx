import { createElement } from "react";
import * as Icons from "react-icons/fa";

const Heading = ({ content }) => {
  const { iconHeading } = content;
  return (
    <>
      {iconHeading?.position === "right" ? (
        <div className="flex items-center  gap-x-3 px-3">
          <p className="   break-all ">{content.titleHeading}</p>

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
        <div className="flex  items-center gap-x-2 px-3 ">
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

          <p className="  break-all ">{content.titleHeading}</p>
        </div>
      )}
    </>
  );
};

export default Heading;
