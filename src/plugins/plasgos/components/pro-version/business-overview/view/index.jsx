import CountUp from "@/components/pro-version/CountUp";

import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";
import { getContentFocusStyle } from "@/utils/getContentFocusStyle";

const ViewBusinessOverview = ({ section, editor, isFocusContent }) => {
  const {
    textShadow,
    fontFamily,
    fontWeight,
    colorRangeValue,
    fontSize,
    separator,
    direction,
    duration,
    distance,
    textAligment,
    fontSizeOverview,
    fontFamilyOverview,
    fontWeightOverview,
    colorOverview,
  } = section.wrapperStyle;

  const { contents } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  const { responsiveFontSize: responsoveFontSizeOverview } =
    useResponsiveViewFontSize(editor, fontSizeOverview);

  return (
    <div>
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
                    color: colorRangeValue,
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
                    color: colorRangeValue,
                    fontSize: responsiveFontSize,
                    textShadow,
                  }}
                >
                  {symbol}
                </p>
              </div>

              <p
                className="break-all"
                style={{
                  fontFamily: fontFamilyOverview,
                  fontWeight: fontWeightOverview,
                  color: colorOverview,
                  fontSize: responsoveFontSizeOverview,
                  textShadow,
                }}
              >
                {overview}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBusinessOverview;
