import ContainerView from "@/components/ContainerView";
import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewDivider = ({ section }) => {
  const { variant, width, fullWidth, height, color, iconBtn } =
    section.wrapperStyle;

  return (
    <ContainerView id={section?.scrollTarget?.value || ""} section={section}>
      {iconBtn.icon ? (
        <div className="flex justify-center items-center w-full gap-x-3">
          {iconBtn?.position === "left" && (
            <>
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

              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  border: `${height}px ${variant} ${color} `,
                }}
              />
            </>
          )}

          {iconBtn?.position === "center" && (
            <>
              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  border: `${height}px ${variant} ${color} `,
                }}
              />
              <div style={{ color: iconBtn?.color }}>
                {createElement(Icons[iconBtn?.icon], {
                  size: iconBtn.size,
                })}
              </div>

              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  border: `${height}px ${variant} ${color} `,
                }}
              />
            </>
          )}

          {iconBtn?.position === "right" && (
            <>
              <div
                style={{
                  width: fullWidth ? "100%" : width,
                  border: `${height}px ${variant} ${color} `,
                }}
              />
              {iconBtn && Icons[iconBtn?.icon] && (
                <div style={{ color: iconBtn?.color }}>
                  {createElement(Icons[iconBtn?.icon], {
                    size: iconBtn.size,
                  })}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <div
            style={{
              width: fullWidth ? "100%" : width,
              border: `${height}px ${variant} ${color} `,
            }}
          />
        </div>
      )}
    </ContainerView>
  );
};

export default ViewDivider;
