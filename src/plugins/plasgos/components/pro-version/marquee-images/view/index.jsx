import ContainerView from "@/components/ContainerView";
import MarqueeImages from "./MarqueImages";
const ViewMarqueeImages = ({ section, editor, buildContainerStyle }) => {
  const { contents, speed } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
      <div className={` overflow-x-hidden flex `}>
        <MarqueeImages images={contents} speed={speed} />
      </div>
    </ContainerView>
  );
};

export default ViewMarqueeImages;
