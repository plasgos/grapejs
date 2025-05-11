import ContainerView from "@/components/ContainerView";
import ScrollVelocity from "@/components/pro-version/ScrollVelocity";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";

const ViewScrollVelocity = ({ section, editor, index }) => {
  const {
    contents,
    fontFamily = "Squada One",
    fontWeight,
    color,
    fontSize,
    textAlign,
    velocity,
  } = section;

  const texts = contents.map((content) => content.title);
  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);
  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
    >
      <div className={`p-10 overflow-x-hidden flex ${textAlign}`}>
        <ScrollVelocity
          texts={texts}
          velocity={velocity}
          className="custom-scroll-text"
          style={{
            fontFamily,
            fontWeight,
            color,
            fontSize: responsiveFontSize,
          }}
        />
      </div>
    </ContainerView>
  );
};

export default ViewScrollVelocity;
