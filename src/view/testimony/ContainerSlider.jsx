import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";
import { useEffect } from "react";

const ContainerSlider = ({
  children,
  editor,
  autoPlaySlider,
  section,
  LayoutComponent,
  isOverImage,
  buildContainerStyle,
}) => {
  const { contents } = section;

  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      let width = 0;

      if (editor) {
        const iframe = editor?.Canvas.getFrameEl();
        width = iframe?.contentWindow?.innerWidth || 0;
      } else {
        width = window.innerWidth;
      }

      if (width < 640) setSlidesPerView(1);
      else if (width < 768) setSlidesPerView(2);
      else if (width < 1024) setSlidesPerView(3);
      else setSlidesPerView(4);
    };

    // Jalankan langsung saat mount
    updateSlidesPerView();

    if (editor) {
      const iframe = editor?.Canvas.getFrameEl();
      const iframeWindow = iframe?.contentWindow;
      if (iframeWindow) {
        iframeWindow.addEventListener("resize", updateSlidesPerView);
        return () => {
          iframeWindow.removeEventListener("resize", updateSlidesPerView);
        };
      }
    } else {
      // Mode published (tanpa editor)
      window.addEventListener("resize", updateSlidesPerView);
      return () => {
        window.removeEventListener("resize", updateSlidesPerView);
      };
    }
  }, [editor]);

  return (
    <Swiper
      key={autoPlaySlider}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={slidesPerView}
      autoplay={
        autoPlaySlider
          ? {
              delay: 2500,
              disableOnInteraction: false,
            }
          : undefined
      }
    >
      {contents.map((content) => (
        <SwiperSlide
          style={{
            paddingTop: isOverImage && 40,
          }}
          className="p-1 "
          key={content.id}
        >
          {children}
          <LayoutComponent
            content={content}
            styles={section.wrapperStyle}
            editor={editor}
            buildContainerStyle={buildContainerStyle}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ContainerSlider;
