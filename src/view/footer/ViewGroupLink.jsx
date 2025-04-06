import { onActionClickTarget } from "@/utils/onActionClickTarget";
import Heading from "./Heading";

const ViewGroupLink = ({ content, index, editor }) => {
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
            <p
              className={` ${
                opt?.target?.options?.type ? "cursor-pointer" : ""
              }`}
              onClick={() => onActionClickTarget(opt?.target, editor)}
              key={opt.id}
            >
              {opt.label}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ViewGroupLink;
