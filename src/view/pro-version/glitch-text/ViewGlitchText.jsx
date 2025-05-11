import ContainerView from "@/components/ContainerView";
import GlitchText from "@/components/pro-version/GlitchText";
import { useBackgroundStyles } from "@/hooks/useBackgroundStyle";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewGlitchText = ({ section, editor, index }) => {
  const {
    text,
    fontFamily = "Squada One",
    fontWeight,
    color,
    fontSize,
    textAlign,
    enableShadows,
    enableOnHover,
    speed,
    background,
  } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  const stylesBg = useBackgroundStyles(section);
  console.log("🚀 ~ ViewGlitchText ~ stylesBg:", stylesBg);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
    >
      <div className={`p-10 flex ${textAlign}`}>
        <GlitchText
          style={{
            fontFamily,
            fontWeight,
            color,
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
    </ContainerView>
  );
};

export default ViewGlitchText;
