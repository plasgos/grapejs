import ContainerView from "@/components/ContainerView";
import MarqueeImages from "./MarqueImages";
const ViewMarqueeImages = ({ section, editor, index }) => {
  const { contents, speed } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
    >
      <div className={` overflow-x-hidden flex `}>
        <MarqueeImages images={contents} speed={speed} />
      </div>
    </ContainerView>
  );
};

export default ViewMarqueeImages;
