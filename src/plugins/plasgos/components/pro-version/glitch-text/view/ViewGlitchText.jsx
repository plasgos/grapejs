import GlitchText from "@/components/pro-version/GlitchText";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewGlitchText = ({ section, editor }) => {
  const {
    text,
    fontFamily = "Squada One",
    fontWeight,
    colorGlitchText,
    fontSize,
    textAlign,
    enableShadows,
    enableOnHover,
    speed,
    background,
  } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  return (
    <div>
      <div className={`p-10 flex ${textAlign}`}>
        <GlitchText
          style={{
            fontFamily,
            fontWeight,
            color: colorGlitchText,
            fontSize: responsiveFontSize,
          }}
          speed={speed}
          enableShadows={enableShadows}
          enableOnHover={enableOnHover}
          className="custom-class"
          background={background}
        >
          {text}
        </GlitchText>
      </div>
    </div>
  );
};

export default ViewGlitchText;
