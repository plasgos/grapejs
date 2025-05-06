import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import { useState } from "react";
import { createElement } from "react";
import * as Icons from "react-icons/fa";

const CallToAction = ({ section, canvas, editor, isDragging }) => {
  const {
    title,
    description,
    buttonText,
    iconBtn,
    target,
    stylesBtn,
    animation,
  } = section.content;

  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  const getRGBAColor = (color, opacity) => {
    // Konversi warna HEX ke RGBA jika perlu (opsional, jika `btnColor` HEX)
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color; // Jika `btnColor` sudah dalam format `rgb()` atau `rgba()`
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleClickButton = () => {
    if (
      target?.actionType === "link" &&
      target?.options?.type === "url" &&
      target?.options?.link
    ) {
      window.open(
        target.options?.link,
        target.options?.isOpenNewTab ? "_blank" : "_self",
        target.options?.isOpenNewTab ? "noopener noreferrer" : ""
      );
    } else if (
      target?.actionType === "link" &&
      target?.options?.type === "whatsapp" &&
      target?.options?.phoneNumber
    ) {
      const waLink = `https://wa.me/+62${
        target.options?.phoneNumber
      }?text=${encodeURIComponent(target?.options?.message)}`;
      window.open(
        waLink,
        target.options?.isOpenNewTab ? "_blank" : "_self",
        target.options?.isOpenNewTab ? "noopener noreferrer" : ""
      );
    } else if (
      target?.actionType === "action" &&
      target?.options?.type === "scrollTarget" &&
      target?.options?.value
    ) {
      const targetId = target?.options?.value;

      if (canvas) {
        if (targetId === "scrollToTop") {
          canvas.contentWindow.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          const iframeDocument =
            canvas.contentDocument || canvas.contentWindow.document;

          window.location.hash = targetId;

          const element = iframeDocument.getElementById(targetId);

          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            });
          }
        }
      }
    }
  };

  const sizeStylesMap = {
    sm: { padding: "4px 8px", fontSize: "12px" },
    md: { padding: "8px 16px", fontSize: "14px" },
    lg: { padding: "12px 24px", fontSize: "16px" },
    xl: { padding: "16px 32px", fontSize: "18px" },
    default: { padding: "8px 16px", fontSize: "14px" },
  };

  const buttonColorClass =
    stylesBtn.variant === "fill"
      ? {
          backgroundColor: isHovered
            ? getRGBAColor(stylesBtn.btnColor, 0.8)
            : stylesBtn.btnColor, // Opacity 80% saat hover
        }
      : stylesBtn.variant === "outline"
      ? {
          border: `1.5px solid ${
            isHovered
              ? getRGBAColor(stylesBtn.btnColor, 0.8)
              : stylesBtn.btnColor
          }`,
          backgroundColor: isHovered
            ? getRGBAColor(stylesBtn.btnColor, 0.8)
            : "transparent",
        }
      : {
          backgroundColor: isHovered
            ? getRGBAColor("#e5e7eb", 0.8)
            : "transparent",
          color: "inherit",
        };

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      section={section}
      editor={editor}
      isDragging={isDragging}
    >
      <div
        style={{
          padding: 20,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          ref={elementRef}
          className={`${getClassName()} `}
          style={{
            "--animate-duration": `${duration}s`,
            willChange: "transform, opacity",
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <p style={{ fontSize: "16px", color: "#fff" }}>{description}</p>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: "10px 20px",
            borderRadius: stylesBtn.rounded,
            border: "none",
            cursor: "pointer",
            boxShadow: stylesBtn.shadow,
            ...buttonColorClass,
            ...sizeStylesMap[stylesBtn.size],
            color: stylesBtn.textColor,
          }}
          onClick={handleClickButton}
        >
          {iconBtn?.position === "right" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div>{buttonText}</div>

              {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                <div style={{ color: iconBtn?.color }}>
                  {createElement(Icons[iconBtn.icon], { size: iconBtn?.size })}
                </div>
              ) : null}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                <div style={{ color: iconBtn?.color }}>
                  {createElement(Icons[iconBtn.icon], { size: iconBtn?.size })}
                </div>
              ) : null}

              <div>{buttonText}</div>
            </div>
          )}
        </button>
      </div>
    </ContainerView>
  );
};

export default CallToAction;
