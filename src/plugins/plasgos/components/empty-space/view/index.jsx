const ViewEmptySpace = ({ section }) => {
  const { height } = section.mainStyle || {};

  return (
    <div>
      <div
        style={{
          width: "100%",
          height,
        }}
      />
    </div>
  );
};

export default ViewEmptySpace;
