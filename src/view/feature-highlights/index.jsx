import ContainerView from "@/components/ContainerView";
import useAnimatedVisibility from "@/hooks/useAnimatedVisibility";
import { useGlobalOptions } from "@/hooks/useGlobalOptions";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";

import { createElement } from "react";
import * as Icons from "react-icons/fa";

const ViewFeatureHighlights = ({ section, editor, buildContainerStyle }) => {
  const [globalOptions] = useGlobalOptions(editor);
  const currentGlobalOptions = editor ? globalOptions : buildContainerStyle;

  const { isFocusContent } = currentGlobalOptions;

  const { contents, animation } = section;
  const {
    textShadow,
    titleColor,
    fontWeight,
    fontFamily,
    fontSize,
    textAligment,
  } = section.wrapperStyle;

  const { elementRef, getClassName, duration } =
    useAnimatedVisibility(animation);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
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
                className={`flex items-center gap-x-2 my-2    ${getContentFocusStyle(
                  isFocusContent,
                  content.id
                )}`}
              >
                {iconBtn.position === "left" ? (
                  <>
                    {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                      <div style={{ color: iconBtn?.color }}>
                        {createElement(Icons[iconBtn.icon], {
                          size: iconBtn?.size,
                        })}
                      </div>
                    ) : null}

                    <p
                      style={{
                        color: titleColor,
                        fontFamily,
                        fontSize,
                        textShadow,
                        fontWeight,
                      }}
                      className={`w-full break-all   `}
                    >
                      {content.title}
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        color: titleColor,
                        fontFamily,
                        fontSize,
                        textShadow,
                        fontWeight,
                      }}
                      className={`w-full break-all   `}
                    >
                      {content.title}
                    </p>

                    {iconBtn?.icon?.startsWith("Fa") && Icons[iconBtn.icon] ? (
                      <div style={{ color: iconBtn?.color }}>
                        {createElement(Icons[iconBtn.icon], {
                          size: iconBtn?.size,
                        })}
                      </div>
                    ) : null}
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
