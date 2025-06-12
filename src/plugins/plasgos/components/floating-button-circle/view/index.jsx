import { onActionClickTarget } from "@/utils/onActionClickTarget";
import "react-lazy-load-image-component/src/effects/blur.css";

import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewFLoatingButtonCircle = ({ section, editor }) => {
  const { buttons } = section;
  const { position, space, side = "right" } = section.mainStyle;

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

  const sidePosition =
    side === "right"
      ? {
          right: 20,
        }
      : {
          left: 20,
        };

  return (
    <div
      style={{
        bottom: position,
        gap: space,
        ...sidePosition,
      }}
      className="fixed   flex flex-col justify-center items-center z-10    "
    >
      {buttons.map((button) => {
        const size = button.stylesBtn.size;

        const variant = button.stylesBtn.variant;
        const iconBtn = button.iconBtn;

        const sizeClasses = sizeClassesMap[size] || sizeClassesMap.default;

        const iconSizeClasses = iconSizeMap[size] || iconSizeMap.default;

        return (
          <div key={button.id} className="">
            <div
              key={button.id}
              className={`${
                button.isFocused &&
                "ring-2 ring-purple-600  bg-orange-100 p-0.5 "
              } `}
            >
              <button
                style={{
                  width: sizeClasses,
                  height: sizeClasses,
                  color: button.stylesBtn.textColor,
                  border:
                    variant === "outline"
                      ? `1px solid ${button.stylesBtn.btnColor}`
                      : "",
                  backgroundColor:
                    variant === "default" ? button.stylesBtn.btnColor : "",
                }}
                className={`${button.stylesBtn.shadow} rounded-full`}
                onClick={() => onActionClickTarget(button.target, editor)}
              >
                <div className="flex justify-center items-center">
                  {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                    <div style={{ color: iconBtn?.color }}>
                      {createElement(Icons[iconBtn.icon], {
                        size: iconSizeClasses,
                      })}
                    </div>
                  ) : null}
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
