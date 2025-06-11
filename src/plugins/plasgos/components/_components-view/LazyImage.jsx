import { useState } from "react";

export const LazyImage = ({ className = "", ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      {...props}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`transition-all duration-300 ease-in-out ${
        loaded ? "blur-0" : "blur-md"
      } ${className}`}
    />
  );
};
