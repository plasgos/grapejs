import Heading from "./Heading";

const ViewText = ({ content, index }) => {
  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
    >
      <Heading content={content} />

      <div className="flex flex-col flex-wrap gap-2 ">
        <div
          className="break-all"
          style={{
            lineHeight: 1.4,
          }}
          dangerouslySetInnerHTML={{
            __html: content?.text,
          }}
        />
      </div>
    </div>
  );
};

export default ViewText;
