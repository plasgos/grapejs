import ContainerView from "@/components/ContainerView";
import FuzzyText from "@/components/pro-version/FuzzyText";

const ViewFuzzyText = ({ section, editor }) => {
  const {
    text,
    fontFamily = "Squada One",
    fontWeight,
    color,
    fontSize,
    textAlign,
    baseIntensity,
    hoverIntensity,
    enableHover,
  } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className={`p-10 flex ${textAlign}`}>
        <FuzzyText
          baseIntensity={baseIntensity}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          color={color}
        >
          {text}
        </FuzzyText>
      </div>
    </ContainerView>
  );
};

export default ViewFuzzyText;
