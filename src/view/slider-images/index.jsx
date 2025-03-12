import ContainerView from "@/components/ContainerView";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Navigation,
  EffectFade,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFlip,
} from "swiper/modules";

const ViewSliderImages = ({ section, editor }) => {
  const { contents } = section;
  const { width, aspectRatio, autoSlide, transitions, variant } =
    section.wrapperStyle;

  const delay = autoSlide * 1000;

  return (
    <ContainerView id={section?.scrollTarget?.value || ""} section={section}>
      {variant === "full-slider" && (
        <div className={`flex justify-center`}>
          <div className="w-full flex items-center justify-center">
            <Swiper
              key={`swiper-${delay}-${transitions}`}
              effect={transitions}
              navigation={true}
              grabCursor={true}
              modules={
                delay
                  ? [
                      Navigation,
                      EffectFade,
                      EffectCards,
                      EffectCoverflow,
                      EffectCreative,
                      EffectCube,
                      EffectFlip,
                      Autoplay,
                    ]
                  : [
                      Navigation,
                      EffectFade,
                      EffectCards,
                      EffectCoverflow,
                      EffectCreative,
                      EffectCube,
                      EffectFlip,
                    ]
              }
              autoplay={
                delay
                  ? {
                      delay: delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : undefined
              }
              speed={1000}
              loop={true}
              observer={true}
              observeParents={true}
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: ["-125%", 0, -800],
                  rotate: [0, 0, -90],
                },
                next: {
                  shadow: true,
                  translate: ["125%", 0, -800],
                  rotate: [0, 0, 90],
                },
              }}
              // coverflowEffect={{
              //   rotate: 50,
              //   stretch: 0,
              //   depth: 100,
              //   modifier: 1,
              //   slideShadows: true,
              // }}
              // cubeEffect={{
              //   shadow: true,
              //   slideShadows: true,
              //   shadowOffset: 20,
              //   shadowScale: 0.94,
              // }}
            >
              {contents.map((content) => (
                // <div
                //   style={{
                //     width: "100%",
                //   }}
                //   key={content.id}
                // >

                // </div>

                <SwiperSlide key={content.id}>
                  <LazyLoadImage
                    style={{
                      aspectRatio,
                    }}
                    src={content?.image}
                    alt={content?.alt ? content.alt : ""}
                    className={`object-cover w-full  ${
                      content?.target?.options?.type ? "cursor-pointer" : ""
                    }`}
                    onClick={() => onActionClickTarget(content?.target, editor)}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </ContainerView>
  );
};

export default ViewSliderImages;
