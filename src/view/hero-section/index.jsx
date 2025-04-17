import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import CustomButton from "../_components/CustomButton";

const ViewHeroSection = ({ section, editor }) => {
  const { contents, animation, animationText, buttons } = section;
  const { withButton, variant, btnPosition, rotation, shadow } =
    section.wrapperStyle;

  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  const {
    elementRef: elementRefContent,
    getClassName: getClassNameContent,
    duration: durationContent,
  } = useAnimatedVisibility(animationText);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      {variant === "basic" && (
        <div className="relative ">
          {contents.map((content) => {
            return (
              <div
                key={content.id}
                className="flex !flex-wrap md:!flex-nowrap  gap-x-5 items-center"
              >
                {content.imagePosition === "left" ? (
                  <>
                    <div
                      ref={elementRef}
                      className={`${shadow} ${getClassName()}`}
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        "--animation-duration": `${duration}s`,
                      }}
                      key={content.id}
                    >
                      <LazyLoadImage
                        src={content?.image}
                        alt={content?.alt ? content.alt : ""}
                        style={{
                          width: content.width,
                        }}
                        className={`object-contain  ${
                          content?.target?.options?.type ? "cursor-pointer" : ""
                        }`}
                        onClick={() =>
                          onActionClickTarget(content?.target, editor)
                        }
                        effect="blur"
                        wrapperProps={{
                          style: { transitionDelay: "1s" },
                        }}
                      />
                    </div>

                    <div className=" p-3 w-full ">
                      <div
                        ref={elementRefContent}
                        className={`${getClassNameContent()}  mb-3 min-w-full break-all `}
                        style={{
                          "--animation-duration": `${durationContent}s`,
                        }}
                      >
                        <div
                          style={{
                            textShadow: content?.textShadow,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: content.textBanner,
                          }}
                        />
                      </div>

                      {withButton && (
                        <div
                          className={` flex !flex-wrap  gap-3 ${btnPosition} `}
                        >
                          {buttons.map((btn) => {
                            return (
                              <CustomButton
                                key={btn.id}
                                btn={btn}
                                editor={editor}
                                onActionClickTarget={onActionClickTarget}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 w-full">
                      <div
                        ref={elementRefContent}
                        className={`${getClassNameContent()} mb-3 `}
                        style={{
                          "--animation-duration": `${durationContent}s`,
                        }}
                      >
                        <div
                          style={{
                            textShadow: content?.textShadow,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: content.textBanner,
                          }}
                        />
                      </div>

                      {withButton && (
                        <div
                          className={` flex !flex-wrap  gap-3 ${btnPosition} `}
                        >
                          {buttons.map((btn) => {
                            return (
                              <CustomButton
                                key={btn.id}
                                btn={btn}
                                editor={editor}
                                onActionClickTarget={onActionClickTarget}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div
                      ref={elementRef}
                      className={`${shadow} ${getClassName()}`}
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        "--animation-duration": `${duration}s`,
                      }}
                      key={content.id}
                    >
                      <LazyLoadImage
                        src={content?.image}
                        alt={content?.alt ? content.alt : ""}
                        style={{
                          width: content.width,
                        }}
                        className={`object-contain  ${
                          content?.target?.options?.type ? "cursor-pointer" : ""
                        }`}
                        onClick={() =>
                          onActionClickTarget(content?.target, editor)
                        }
                        effect="blur"
                        wrapperProps={{
                          style: { transitionDelay: "1s" },
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {variant === "no-image" && (
        <div className="w-full flex justify-center items-center relative">
          {contents.map((content) => (
            <div key={content.id} className="">
              <div className="p-3 w-full">
                <div
                  ref={elementRefContent}
                  className={`${getClassNameContent()} mb-3 `}
                  style={{
                    "--animation-duration": `${durationContent}s`,
                  }}
                >
                  <div
                    style={{
                      textShadow: content?.textShadow,
                    }}
                    dangerouslySetInnerHTML={{ __html: content.textBanner }}
                  />
                </div>

                {withButton && (
                  <div className={` flex !flex-wrap  gap-3 justify-center `}>
                    {buttons.map((btn) => {
                      return (
                        <CustomButton
                          key={btn.id}
                          btn={btn}
                          editor={editor}
                          onActionClickTarget={onActionClickTarget}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </ContainerView>
  );
};

export default ViewHeroSection;
