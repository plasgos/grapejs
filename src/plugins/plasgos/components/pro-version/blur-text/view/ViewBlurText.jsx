import BlurText from "@/components/pro-version/BlurText";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewBlurText = ({ section, editor }) => {
  const {
    text,
    delay,
    fontFamily,
    fontWeight,
    colorBlurText,
    fontSize,
    textAlign,
    animateBy,
    direction,
  } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  return (
    <div>
      <div className={`p-10 flex ${textAlign}`}>
        <BlurText
          style={{
            fontFamily,
            fontWeight,
            color: colorBlurText,
            fontSize: responsiveFontSize,
          }}
          text={text}
          delay={delay}
          animateBy={animateBy}
          direction={direction}
        />
      </div>
    </div>
  );
};

export default ViewBlurText;
