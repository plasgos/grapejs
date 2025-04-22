import RichTextEditor from "@/components/rich-text-editor";
import { useState } from "react";

const TestPage = () => {
  const [post, setPost] = useState("");

  const onChange = (content) => {
    setPost(content);
    console.log(content);
  };

  return (
    <div className="">
      <RichTextEditor content={post} onChange={onChange} />
    </div>
  );
};

export default TestPage;
