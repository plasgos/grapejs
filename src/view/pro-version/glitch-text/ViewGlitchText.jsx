import ContainerView from "@/components/ContainerView";
import GlitchText from "@/components/pro-version/GlitchText";

const ViewGlitchText = ({ section, editor }) => {
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
  } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className={`p-10 flex ${textAlign}`}>
        <GlitchText
          style={{
            fontFamily,
            fontWeight,
            color,
            fontSize,
          }}
          speed={speed}
          enableShadows={enableShadows}
          enableOnHover={enableOnHover}
          className="custom-class"
        >
          {text}
        </GlitchText>
      </div>
    </ContainerView>
  );
};

export default ViewGlitchText;
