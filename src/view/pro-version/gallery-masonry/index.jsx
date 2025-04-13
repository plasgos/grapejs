import ContainerView from "@/components/ContainerView";
import GalleryMasonry from "@/components/pro-version/GalleryMasonry";

const ViewGalleryMasonry = ({ section, editor }) => {
  const { contents } = section;

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
    >
      <GalleryMasonry data={contents} editor={editor} />
    </ContainerView>
  );
};

export default ViewGalleryMasonry;
