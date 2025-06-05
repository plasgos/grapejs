import GalleryMasonry from "@/components/pro-version/GalleryMasonry";

const ViewGalleryMasonry = ({ section, editor, buildContainerStyle }) => {
  const { contents } = section;

  return (
    <div>
      <GalleryMasonry
        data={contents}
        editor={editor}
        buildContainerStyle={buildContainerStyle}
      />
    </div>
  );
};

export default ViewGalleryMasonry;
