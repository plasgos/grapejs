import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const SplitText = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeOutCubic",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  style,
}) => {
  const words = text.split(" ").map((word) => word.split(""));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);
  const [trigger, setTrigger] = useState(0); // untuk retrigger animation

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setTrigger((prev) => prev + 1); // retrigger animation
        } else {
          setInView(false);
          animatedCount.current = 0; // reset animation count
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => {
      return {
        from: animationFrom,
        to: async (next) => {
          if (inView) {
            await next(animationTo);
            animatedCount.current += 1;
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete();
            }
          } else {
            await next(animationFrom); // ini yang penting: balikin dulu kalau gak inView
          }
        },
        delay: inView ? i * delay : 0,
        config: { easing },
        reset: true,
        immediate: !inView,
      };
    })
  );

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline leading-normal break-all ${className}`}
      style={{
        textAlign,
        whiteSpace: "normal",
        ...style,
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${trigger}-${wordIndex}`}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.map((letter, letterIndex) => {
            const index =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              letterIndex;

            return (
              <animated.span
                key={`${trigger}-${index}`}
                style={springs[index]}
                className="inline-block transform transition-opacity will-change-transform"
              >
                {letter}
              </animated.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;
