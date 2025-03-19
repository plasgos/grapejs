const ViewTitle = ({ content }) => {
  return (
    <div className="flex items-center gap-x-5 my-5">
      <p className="font-semibold text-xl whitespace-nowrap">{content.value}</p>
      <hr className="h-3 w-full" />
    </div>
  );
};

export default ViewTitle;
