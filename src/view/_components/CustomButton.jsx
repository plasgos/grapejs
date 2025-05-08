import { createElement } from "react";
import * as Icons from "react-icons/fa";
import { useSelector } from "react-redux";

const CustomButton = ({ btn, fullWidth, editor, onActionClickTarget }) => {
  const { isFocusContent } = useSelector((state) => state.landingPage);

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

  const variantClassesOption = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90   ",
    destructive:
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline:
      "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary:
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const variant = btn.stylesBtn.variant;
  const iconBtn = btn.iconBtn;

  const sizeClasses = fontSize[btn.stylesBtn.size] || fontSize.default;

  const sizeBtnClasses = buttonSize[btn.stylesBtn.size] || fontSize.default;

  const iconSizeClasses =
    iconSizeMap[btn.stylesBtn.size] || iconSizeMap.default;

  const variantClasses =
    variantClassesOption[variant] || variantClassesOption.default;

  return (
    <button
      style={{
        borderRadius: btn.stylesBtn.rounded,
        color: btn.stylesBtn.textColor,
        border:
          variant === "outline" ? `1px solid ${btn.stylesBtn.btnColor}` : "",
        backgroundColor: variant === "default" ? btn.stylesBtn.btnColor : "",
      }}
      className={`${
        btn.stylesBtn.shadow
      } ${sizeBtnClasses}    ${variantClasses} flex justify-center items-center ${
        fullWidth && "w-full  "
      }  
      
      ${
        isFocusContent === btn.id &&
        "ring-2 !ring-offset-4 ring-purple-600  bg-orange-100 p-0.5   "
      }
      
      `}
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
