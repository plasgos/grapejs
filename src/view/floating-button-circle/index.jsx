import { onActionClickTarget } from "@/utils/onActionClickTarget";
import "react-lazy-load-image-component/src/effects/blur.css";

import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewFLoatingButtonCircle = ({ section, editor }) => {
  const { contents } = section;
  const { position, space } = section.wrapperStyle;

  const sizeClassesMap = {
    sm: 40,
    md: 48,
    lg: 60,
    xl: 68,
    default: 48,
  };

  const iconSizeMap = {
    sm: 20,
    md: 24,
    lg: 30,
    xl: 36,
    default: 24,
  };

  return (
    <div
      style={{
        bottom: position,
        gap: space,
      }}
      className="absolute  right-5 flex flex-col justify-center items-center    "
    >
      {contents.map((content) => {
        const size = content.stylesBtn.size;

        const variant = content.stylesBtn.variant;
        const iconBtn = content.iconBtn;

        const sizeClasses = sizeClassesMap[size] || sizeClassesMap.default;

        const iconSizeClasses = iconSizeMap[size] || iconSizeMap.default;

        return (
          <div key={content.id} className="">
            <div
              key={content.id}
              className={`${
                content.isFocused &&
                "ring-2 ring-purple-600  bg-orange-100 p-0.5 "
              } `}
            >
              <button
                style={{
                  width: sizeClasses,
                  height: sizeClasses,
                  color: content.stylesBtn.textColor,
                  border:
                    variant === "outline"
                      ? `1px solid ${content.stylesBtn.btnColor}`
                      : "",
                  backgroundColor:
                    variant === "default" ? content.stylesBtn.btnColor : "",
                }}
                className={`${content.stylesBtn.shadow} rounded-full`}
                onClick={() => onActionClickTarget(content.target, editor)}
              >
                <div className="flex justify-center items-center">
                  {iconBtn && Icons[iconBtn?.icon] && (
                    <div
                      style={{
                        color: iconBtn?.color,
                      }}
                    >
                      {createElement(Icons[iconBtn?.icon], {
                        size: iconSizeClasses,
                      })}
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewFLoatingButtonCircle;
