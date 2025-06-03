import ContainerView from "@/components/ContainerView";
import FuzzyText from "@/components/pro-version/FuzzyText";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewFuzzyText = ({ section, editor, buildContainerStyle }) => {
  const {
    text,
    fontFamily = "Squada One",
    fontWeight,
    colorFuzzyText,
    fontSize,
    textAlign,
    baseIntensity,
    hoverIntensity,
    enableHover,
  } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
      <div className={`relative p-10 flex ${textAlign}`}>
        <FuzzyText
          baseIntensity={baseIntensity}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
          fontSize={responsiveFontSize}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          color={colorFuzzyText}
        >
          {text}
        </FuzzyText>
      </div>
    </ContainerView>
  );
};

export default ViewFuzzyText;
