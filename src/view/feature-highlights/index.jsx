import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";

import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewFeatureHighlights = ({ section, editor }) => {
  const { contents, animation } = section;
  const { textShadow, color, fontWeight, fontFamily, fontSize, textAligment } =
    section.wrapperStyle;

  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className={`flex ${textAligment}`}>
        <div
          ref={elementRef}
          style={{
            "--animation-duration": `${duration}s`,
          }}
          className={`flex flex-col p-5   ${getClassName()}`}
        >
          {contents.map((content) => {
            const iconBtn = content.iconBtn;

            return (
              <div
                key={content.id}
                className={`flex items-center gap-x-2 my-2  ${
                  content.isFocused && "ring-2 ring-purple-600  bg-orange-100 "
                }`}
              >
                {iconBtn.position === "left" ? (
                  <>
                    {iconBtn && Icons[iconBtn?.icon] && (
                      <div
                        style={{
                          color: iconBtn?.color,
                        }}
                      >
                        {createElement(Icons[iconBtn?.icon], {
                          size: iconBtn?.size,
                        })}
                      </div>
                    )}

                    <p
                      style={{
                        color: color,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        textShadow,
                      }}
                      className={`w-full break-all  ${fontFamily}   ${fontWeight} `}
                    >
                      {content.title}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        color: color,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        textShadow,
                      }}
                      className={`w-full break-all  ${fontFamily}   ${fontWeight} `}
                    >
                      {content.title}
                    </p>

                    {iconBtn && Icons[iconBtn?.icon] && (
                      <div
                        style={{
                          color: iconBtn?.color,
                        }}
                      >
                        {createElement(Icons[iconBtn?.icon], {
                          size: iconBtn?.size,
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ContainerView>
  );
};

export default ViewFeatureHighlights;
