const ViewTitle = ({ content, titleSize, titleColor }) => {
  return (
    <div className="flex items-center gap-x-5 my-5">
      <p
        style={{
          fontSize: titleSize,
          color: titleColor,
        }}
        className="font-semibold  whitespace-nowrap"
      >
        {content.value}
      </p>
      <hr className="h-3 w-full" />
    </div>
  );
};

export default ViewTitle;
