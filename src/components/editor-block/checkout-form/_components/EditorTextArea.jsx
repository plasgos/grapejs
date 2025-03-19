import BasicInputProps from "./BasicInputProps";

const EditorTextArea = ({ item, handleContentChange }) => {
  return (
    <BasicInputProps item={item} handleContentChange={handleContentChange} />
  );
};

export default EditorTextArea;
