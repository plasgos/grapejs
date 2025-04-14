import ContainerView from "@/components/ContainerView";
import CountUp from "@/components/pro-version/CountUp";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewCountUp = ({ section, editor }) => {
  const {
    text,
    textShadow,
    fontFamily,
    fontWeight,
    color,
    fontSize,
    textAlign,

    from,
    to,
    separator,
    direction,
    duration,
  } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className={`p-10 flex flex-wrap items-center ${textAlign}`}>
        <CountUp
          style={{
            fontFamily,
            fontWeight,
            color,
            fontSize: responsiveFontSize,
            textShadow,
          }}
          from={from}
          to={to}
          separator={separator}
          direction={direction}
          duration={duration}
        />
        <p
          className="mx-3"
          style={{
            fontFamily,
            fontWeight,
            color,
            fontSize: responsiveFontSize,
            textShadow,
          }}
        >
          +
        </p>

        <div
          className="break-all"
          style={{
            lineHeight: 1.4,
            textShadow,
          }}
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </div>
    </ContainerView>
  );
};

export default ViewCountUp;
