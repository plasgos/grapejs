import { onActionClickTarget } from "@/utils/onActionClickTarget";

const ViewGroupLink = ({ children, content, index, editor, wrapperStyle }) => {
  return (
    <div
      style={{
        maxWidth: content.width,
      }}
      key={index}
      className="max-w-full"
    >
      {children}

      <div className="flex flex-col flex-wrap gap-2 ">
        {content.options.map((opt) => {
          return (
            <p
              style={{
                color: wrapperStyle.subHeadingColor,
              }}
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
