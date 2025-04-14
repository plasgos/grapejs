import ContainerView from "@/components/ContainerView";
import { useResponsiveViewFontSize } from "@/hooks/useResponsiveViewFontSize";
import { MarqueImages } from "./MarqueImages";

const ViewMarqueImages = ({ section, editor }) => {
  const {
    contents,
    fontFamily = "Squada One",
    fontWeight,
    color,
    fontSize,
    textAlign,
    velocity,
  } = section;

  const { responsiveFontSize } = useResponsiveViewFontSize(editor, fontSize);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <div className={`p-10 overflow-x-hidden flex ${textAlign}`}>
        <MarqueImages
          images={contents}
          velocity={velocity}
          speed={5}
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

export default ViewMarqueImages;
