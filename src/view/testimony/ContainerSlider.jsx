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
}) => {
  const { contents } = section;

  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      let iframe = editor?.Canvas.getFrameEl();
      if (iframe) {
        let iframeWidth = iframe.contentWindow.innerWidth;
        if (iframeWidth < 640) setSlidesPerView(1);
        else if (iframeWidth < 768) setSlidesPerView(2);
        else if (iframeWidth < 1024) setSlidesPerView(3);
        else setSlidesPerView(4);
      }
    };

    // Jalankan saat pertama kali
    updateSlidesPerView();

    // Tambahkan event listener ke iframe
    let iframe = editor?.Canvas.getFrameEl();
    if (iframe) {
      iframe.contentWindow.addEventListener("resize", updateSlidesPerView);
    }

    return () => {
      if (iframe) {
        iframe.contentWindow.removeEventListener("resize", updateSlidesPerView);
      }
    };
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
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ContainerSlider;
