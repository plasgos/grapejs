import BasicInputProps from "./BasicInputProps";

const EditorInputField = ({ item, handleContentChange }) => {
  return (
    <BasicInputProps item={item} handleContentChange={handleContentChange} />
  );
};

export default EditorInputField;
