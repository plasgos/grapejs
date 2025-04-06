import Heading from "./Heading";

const ViewContactInfo = ({ content, index }) => {
  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
      className="max-w-full"
    >
      <Heading content={content} />

      <div className="flex flex-col flex-wrap gap-2 ">
        {content.options.map((opt) => {
          return (
            <div key={opt.id} className="flex items-center gap-3">
              {opt.icon} <p>{opt.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewContactInfo;
