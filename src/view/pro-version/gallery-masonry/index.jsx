import ContainerView from "@/components/ContainerView";
import GalleryMasonry from "@/components/pro-version/GalleryMasonry";

const ViewGalleryMasonry = ({ section, editor, index }) => {
  const { contents } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      index={index}
    >
      <GalleryMasonry data={contents} editor={editor} />
    </ContainerView>
  );
};

export default ViewGalleryMasonry;
