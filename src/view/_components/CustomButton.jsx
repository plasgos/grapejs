import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { darkenRgbaColor } from "@/utils/darkenRgbaColor";
import { cx } from "class-variance-authority";
import { createElement, useState } from "react";
import * as Icons from "react-icons/fa";

const CustomButton = ({ btn, fullWidth, editor, onActionClickTarget }) => {
  const [globalOptions] = useGlobalOptions(editor);
  const { isFocusContent, schemeColor } = globalOptions || {};

  // const components = editor?.getComponents()?.models;

  const components = editor.getWrapper()?.get("components")?.models;

  const currentComponent = components?.find(
    (component) =>
      component.get("type") === "hero-section" ||
      component.get("type") === "button-content"
  );

  const selectedComponent = currentComponent?.get("customComponent");

  const bgColorComponent = selectedComponent?.background?.bgColor || "#ffffff";

  const [isHover, setIsHover] = useState(false);

  const fontSize = {
    default: "text-base", // Ukuran default (16px)
    sm: "text-xs", // Ukuran kecil (12px)
    lg: "text-lg", // Ukuran besar (18px)
    xl: "text-xl", // Ukuran ekstra besar (20px)
  };

  const iconSizeMap = {
    sm: 18,
    md: 20,
    lg: 26,
    xl: 32,
    default: 20,
  };

  const buttonSize = {
    default: "h-9  px-4 py-2  ",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    xl: "h-12 rounded-md px-10",
    icon: "h-9 w-9",
  };

  const hoverColorConversion = darkenRgbaColor(btn.stylesBtn.btnColor, 0.1);

  const variant = btn.stylesBtn.variant;
  const iconBtn = btn.iconBtn;

  const sizeClasses = fontSize[btn.stylesBtn.size] || fontSize.default;

  const sizeBtnClasses = buttonSize[btn.stylesBtn.size] || fontSize.default;

  const iconSizeClasses =
    iconSizeMap[btn.stylesBtn.size] || iconSizeMap.default;

  const ghostVariant =
    variant === "ghost" && "hover:bg-accent hover:text-accent-foreground";

  let btnColorWithHover = "";

  if (variant === "default") {
    btnColorWithHover = isHover ? hoverColorConversion : btn.stylesBtn.btnColor;
  } else if (variant === "outline") {
    btnColorWithHover = isHover ? hoverColorConversion : "transparent";
  }

  let btnTextColorWithHover = "";

  if (variant === "outline") {
    btnTextColorWithHover = isHover
      ? bgColorComponent
      : schemeColor
      ? btn.stylesBtn.btnColor
      : btn.stylesBtn.textColor;
  } else if (variant === "default") {
    btnTextColorWithHover = btn.stylesBtn.textColor;
  }

  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        borderRadius: btn.stylesBtn.rounded,
        color: btnTextColorWithHover,
        border:
          variant === "outline" ? `1px solid ${btn.stylesBtn.btnColor}` : "",
        backgroundColor: btnColorWithHover,
      }}
      className={cx(
        "flex justify-center items-center shadow-sm",
        isFocusContent === btn.id &&
          "ring-2 !ring-offset-4 ring-purple-600  bg-orange-100 p-0.5",
        btn.stylesBtn.shadow,
        sizeBtnClasses,
        ghostVariant,
        fullWidth && "w-full  "
      )}
      onClick={() => onActionClickTarget(btn.target, editor)}
    >
      {iconBtn?.position === "right" ? (
        <div className="flex justify-center items-center gap-x-2">
          <p className={`${sizeClasses}`}>{btn.stylesBtn.title}</p>

          {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
            <div style={{ color: iconBtn?.color }}>
              {createElement(Icons[iconBtn.icon], {
                size: iconSizeClasses,
              })}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-x-2">
          {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
            <div style={{ color: iconBtn?.color }}>
              {createElement(Icons[iconBtn.icon], {
                size: iconSizeClasses,
              })}
            </div>
          ) : null}

          <p className={`${sizeClasses}`}>{btn.stylesBtn.title}</p>
        </div>
      )}
    </button>
  );
};

export default CustomButton;
