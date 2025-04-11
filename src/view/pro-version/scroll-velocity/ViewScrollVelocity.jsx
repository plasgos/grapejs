import ContainerView from "@/components/ContainerView";
import ScrollVelocity from "@/components/pro-version/ScrollVelocity";

const ViewScrollVelocity = ({ section, editor }) => {
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

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
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
            fontSize,
          }}
        />
      </div>
    </ContainerView>
  );
};

export default ViewScrollVelocity;
