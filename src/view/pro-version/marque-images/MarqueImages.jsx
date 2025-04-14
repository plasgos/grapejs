import { useRef } from "react";
import {
  useMotionValue,
  useTransform,
  useAnimationFrame,
  motion,
} from "framer-motion";

const wrap = (min, max, v) => {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
};

export const MarqueImages = ({
  images = [],
  speed = 10, // pixels per second
  className = "",
  imageClassName = "",
  style = {},
}) => {
  const baseX = useMotionValue(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const x = useTransform(baseX, (v) => `${wrap(-100, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    const moveBy = (speed * delta) / 1000;
    baseX.set(baseX.get() - moveBy);
  });

  const renderImages = () =>
    images.map((img, index) => (
      <img
        key={index}
        src={img.image}
        alt={img?.alt || ""}
        className={`h-full w-auto ${imageClassName}`}
      />
    ));

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full ${className}`}
      style={style}
    >
      <motion.div className="flex gap-8" style={{ x }} ref={trackRef}>
        {renderImages()}
        {renderImages()}
      </motion.div>
    </div>
  );
};
