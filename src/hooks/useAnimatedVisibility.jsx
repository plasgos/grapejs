import { useEffect, useRef, useState } from "react";

const useAnimatedVisibility = (
  animation,
  observerOptions = { root: null, rootMargin: "0px", threshold: 0.3 }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting); // Update state saat masuk viewport
      });
    }, observerOptions);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [observerOptions]);

  const duration = animation?.duration || 1;
  const isReplay = animation?.isReplay;
  const delay = animation?.delay || "";

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !animation?.type) return;

    // Hapus kelas animasi dulu

    element.classList.remove(animation.type);

    if (isVisible) {
      // Tambahkan kembali untuk retrigger animasi
      setTimeout(() => {
        element.classList.add(animation.type);
      }, 10); // Delay kecil agar class benar-benar dihapus dulu
    }
  }, [isVisible, duration, delay, isReplay]);

  const getClassName = () => {
    return isVisible
      ? `animate__animated ${animation?.type} ${delay} custom-animation`
      : "";
  };

  return { elementRef, getClassName, duration };
};

export default useAnimatedVisibility;

// import { useEffect, useRef, useState } from "react";

// const useAnimatedVisibility = (
//   animation,
//   observerOptions = { root: null, rootMargin: "0px", threshold: 0.3 }
// ) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [hasAnimated, setHasAnimated] = useState(false); // Cegah retrigger terus-menerus
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting && !hasAnimated) {
//           setIsVisible(true);
//           setHasAnimated(true); // Pastikan animasi hanya terjadi sekali
//         }
//       });
//     }, observerOptions);

//     if (elementRef.current) observer.observe(elementRef.current);

//     return () => {
//       if (elementRef.current) observer.unobserve(elementRef.current);
//     };
//   }, [observerOptions, hasAnimated]);

//   const duration = animation?.duration || 1;
//   const isReplay = animation?.isReplay;
//   const delay = animation?.delay || "";

//   useEffect(() => {
//     const element = elementRef.current;
//     if (!element || !animation?.type) return;

//     element.classList.remove(animation.type);

//     if (isVisible) {
//       setTimeout(() => {
//         element.classList.add(animation.type);
//       }, 10);
//     }
//   }, [isVisible, duration, delay, isReplay]);

//   useEffect(() => {
//     const element = elementRef.current;
//     if (!element) return;

//     const handleAnimationEnd = () => {
//       element.classList.remove(animation?.type);
//     };

//     element.addEventListener("animationend", handleAnimationEnd);
//     return () =>
//       element.removeEventListener("animationend", handleAnimationEnd);
//   }, [animation?.type]);

//   const getClassName = () => {
//     return isVisible
//       ? `animate__animated ${animation?.type} ${delay} custom-animation`
//       : "";
//   };

//   return { elementRef, getClassName, duration };
// };

// export default useAnimatedVisibility;
