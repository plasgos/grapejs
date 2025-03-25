const ViewDividerField = ({ content }) => {
  console.log("🚀 ~ ViewDividerField ~ content:", content);
  const { fullWidth, width, height, variant, color } = content;

  return (
    <div className="flex justify-center my-5">
      <div
        style={{
          width: fullWidth ? "100%" : width,
          border: `${height}px ${variant} ${color} `,
        }}
      />
    </div>
  );
};

export default ViewDividerField;
