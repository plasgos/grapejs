import { cx } from "class-variance-authority";

const ViewMaps = ({ section, buildContainerStyle }) => {
  const { iframe, height } = section || {};

  const cleanEmbedCode = iframe
    .replace(/width="[^"]+"/, 'width="100%"')
    .replace(/height="[^"]+"/, `height="${height || 400}"`);

  return (
    <div>
      <div
        className={cx(
          "w-full",
          buildContainerStyle ? "" : "pointer-events-none"
        )}
        dangerouslySetInnerHTML={{ __html: cleanEmbedCode }}
      />
    </div>
  );
};

export default ViewMaps;
