import { useEffect } from "react";
import { useState } from "react";

const GlitchText = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
  style,
  background,
}) => {
  const [key, setKey] = useState(0);

  const isBgColor =
    background?.bgType === "bgColor"
      ? `bg-[${background?.bgColor}]`
      : "bg-[#060606]";

  useEffect(() => {
    // Trigger ulang animasi saat `children`, `speed`, atau `enableShadows` berubah
    setKey((prev) => prev + 1);
  }, [children, speed, enableShadows]);

  const inlineStyles = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 red" : "none",
    "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
    ...style,
  };

  const baseClasses =
    "text-white text-[clamp(2rem,10vw,8rem)] font-black relative  select-none cursor-pointer";

  const pseudoClasses = !enableOnHover
    ? `after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-white after:${isBgColor} after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ` +
      `before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-white before:${isBgColor} before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before`
    : `after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-white after:${isBgColor} after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 ` +
      `before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-white before:${isBgColor} before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 ` +
      `hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ` +
      `hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before`;

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

  return (
    <div
      key={key}
      style={inlineStyles}
      data-text={children}
      className={combinedClasses}
    >
      {children}
    </div>
  );
};

export default GlitchText;
