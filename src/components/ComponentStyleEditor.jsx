import EditorContentShowcase from "./editor-block/editor-showcase-content";
import EditorCTA from "./editor-block/EditorCTA";

const ComponentStyleEditor = ({ selectedComponent }) => {
  return (
    <div className="">
      {selectedComponent.get("type") === "call-to-action" && (
        <EditorCTA selectedComponent={selectedComponent} />
      )}

      {selectedComponent.get("type") === "content-showcase" && (
        <EditorContentShowcase selectedComponent={selectedComponent} />
      )}
    </div>
  );
};

export default ComponentStyleEditor;
