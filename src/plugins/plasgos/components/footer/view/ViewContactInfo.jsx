import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewContactInfo = ({ children, content, index, wrapperStyle }) => {
  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
      className="max-w-full"
    >
      {children}

      <div className="flex flex-col flex-wrap gap-2 ">
        {content.options.map((opt) => {
          return (
            <div key={opt.id} className="flex items-center gap-3">
              {Icons[opt.icon] ? (
                <div>
                  {createElement(Icons[opt.icon], {
                    size: 24,
                    color: wrapperStyle.subHeadingColor,
                  })}
                </div>
              ) : null}
              <p
                style={{
                  color: wrapperStyle.subHeadingColor,
                }}
              >
                {opt.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewContactInfo;
