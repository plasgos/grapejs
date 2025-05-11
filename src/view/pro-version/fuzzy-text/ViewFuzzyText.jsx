import ContainerView from "@/components/ContainerView";
import FuzzyText from "@/components/pro-version/FuzzyText";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewFuzzyText = ({ section, editor, index }) => {
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

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
    >
      <div className={`p-10 flex ${textAlign}`}>
        <FuzzyText
          baseIntensity={baseIntensity}
          hoverIntensity={hoverIntensity}
          enableHover={enableHover}
          fontSize={responsiveFontSize}
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
