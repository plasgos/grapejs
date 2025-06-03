import ContainerView from "@/components/ContainerView";
import BlurText from "@/components/pro-version/BlurText";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewBlurText = ({ section, editor, buildContainerStyle }) => {
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
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
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
    </ContainerView>
  );
};

export default ViewBlurText;
