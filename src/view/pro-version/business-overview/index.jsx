import ContainerView from "@/components/ContainerView";
import CountUp from "@/components/pro-version/CountUp";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";
import { useSelector } from "react-redux";

const ViewBusinessOverview = ({ section, editor }) => {
  const {
    textShadow,
    fontFamily,
    fontWeight,
    color,
    fontSize,
    separator,
    direction,
    duration,
    distance,
    textAligment,
  } = section.wrapperStyle;

  const { isFocusContent } = useSelector((state) => state.landingPage);

  const { contents } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div
        style={{
          gap: distance,
        }}
        className={`flex flex-wrap  ${textAligment}  relative px-5`}
      >
        {contents.map((content) => {
          const { rangeValue, from, overview, symbol } = content;

          return (
            <div
              key={content.id}
              className={`flex flex-col items-center gap-y-1 ${getContentFocusStyle(
                isFocusContent,
                content.id
              )}`}
            >
              <div className="flex">
                <CountUp
                  style={{
                    fontFamily,
                    fontWeight,
                    color,
                    fontSize: responsiveFontSize,
                    textShadow,
                  }}
                  from={from}
                  to={rangeValue}
                  separator={separator}
                  direction={direction}
                  duration={duration}
                />

                <p
                  className="mx-1"
                  style={{
                    fontFamily,
                    fontWeight,
                    color,
                    fontSize: responsiveFontSize,
                    textShadow,
                  }}
                >
                  {symbol}
                </p>
              </div>

              <div
                className="break-all"
                style={{
                  lineHeight: 1.4,
                  textShadow,
                }}
                dangerouslySetInnerHTML={{
                  __html: overview,
                }}
              />
            </div>
          );
        })}
      </div>
    </ContainerView>
  );
};

export default ViewBusinessOverview;
