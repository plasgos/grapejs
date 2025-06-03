import ContainerView from "@/components/ContainerView";
import { cx } from "class-variance-authority";

const ViewMaps = ({ section, editor, buildContainerStyle }) => {
  const { iframe, height } = section || {};

  const cleanEmbedCode = iframe
    .replace(/width="[^"]+"/, 'width="100%"')
    .replace(/height="[^"]+"/, `height="${height || 400}"`);

  return (
    <ContainerView
      id={section?.scrollTarget?.value || ""}
      editor={editor}
      section={section}
      buildContainerStyle={buildContainerStyle}
    >
      <div
        className={cx(
          "w-full",
          buildContainerStyle ? "" : "pointer-events-none"
        )}
        dangerouslySetInnerHTML={{ __html: cleanEmbedCode }}
      />
    </ContainerView>
  );
};

export default ViewMaps;
