import MarqueeImages from "./MarqueImages";
const ViewMarqueeImages = ({ section, editor }) => {
  const { contents, speed } = section;

  return (
    <div>
      <div className={` overflow-x-hidden flex `}>
        <MarqueeImages images={contents} speed={speed} />
      </div>
    </div>
  );
};

export default ViewMarqueeImages;
