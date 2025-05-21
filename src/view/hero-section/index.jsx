import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import { onActionClickTarget } from "@/utils/onActionClickTarget";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import CustomButton from "../_components/CustomButton";
import { cn } from "@/lib/utils";

const ViewHeroSection = ({ section, editor }) => {
  const { contents, animation, animationText, buttons } = section;
  const {
    withButton,
    variant,
    btnPosition,
    shadow,
    isFullWidth,
    alignText,
    alignButtons,
    widthText,
  } = section.wrapperStyle;

  const globalOptions = editor.getModel()?.get("globalOptions");

  const { maxWidthPage } = globalOptions || {};
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
      isFullwidth={isFullWidth}
    >
      {variant === "basic" && (
        <div
          style={{
            maxWidth: isFullWidth ? maxWidthPage : "",
          }}
          className={`relative mx-auto`}
        >
          {contents.map((content) => {
            const useSchemeColor = !!content?.textBannerColor;

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
                        transform: `rotate(${content.rotation}deg)`,
                        "--animation-duration": `${duration}s`,
                      }}
                      key={content.id}
                    >
                      <LazyLoadImage
                        src={content?.image}
                        alt={content?.alt ? content.alt : ""}
                        style={{
                          width: content.width,
                          aspectRatio: 5 / 3,
                        }}
                        className={`object-cover  ${
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
                          className={cn("rich-text break-all", {
                            "with-scheme-color": useSchemeColor,
                          })}
                          style={{
                            textShadow: content?.textShadow,
                            ...(useSchemeColor
                              ? { "--richTextColor": content?.textBannerColor }
                              : {}),
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
                          className={cn("rich-text break-all", {
                            "with-scheme-color": useSchemeColor,
                          })}
                          style={{
                            textShadow: content?.textShadow,
                            ...(useSchemeColor
                              ? { "--richTextColor": content?.textBannerColor }
                              : {}),
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
                        transform: `rotate(${content.rotation}deg)`,
                        "--animation-duration": `${duration}s`,
                      }}
                      key={content.id}
                    >
                      <LazyLoadImage
                        src={content?.image}
                        alt={content?.alt ? content.alt : ""}
                        style={{
                          width: content.width,
                          aspectRatio: 5 / 3,
                        }}
                        className={`object-cover  ${
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
        <div className={`w-full flex ${alignText} items-center relative`}>
          {contents.map((content) => {
            const useSchemeColor = !!content?.textBannerColor;

            return (
              <div key={content.id} className="max-w-full">
                <div
                  style={{
                    width: widthText,
                    padding: 12,
                    maxWidth: "100%",
                  }}
                >
                  <div
                    ref={elementRefContent}
                    className={`${getClassNameContent()} mb-3 `}
                    style={{
                      "--animation-duration": `${durationContent}s`,
                    }}
                  >
                    <div
                      className={cn("rich-text break-all", {
                        "with-scheme-color": useSchemeColor,
                      })}
                      style={{
                        textShadow: content?.textShadow,
                        ...(useSchemeColor
                          ? { "--richTextColor": content?.textBannerColor }
                          : {}),
                      }}
                      dangerouslySetInnerHTML={{
                        __html: content.textBanner,
                      }}
                    />
                  </div>

                  {withButton && (
                    <div
                      className={` flex !flex-wrap ${alignButtons}  gap-3  `}
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
              </div>
            );
          })}
        </div>
      )}
    </ContainerView>
  );
};

export default ViewHeroSection;
