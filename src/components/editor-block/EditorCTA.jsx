import { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";

import { produce } from "immer";

import RichTextEditor from "../rich-text-editor";
import BackgroundEditor from "./_components/BackgroundEditor";
import SectionAddScrollTargetId from "./_components/SectionAddScrollTargetId";
import TransitionEditor from "./_components/TransitionEditor";

const EditorCTA = ({ selectedComponent }) => {
  const [content, setContent] = useState({
    title: "Join Us Today!",
    description: "Sign up now and get access to exclusive content.",
    buttonText: "Sign Up",
  });

  useEffect(() => {
    if (selectedComponent) {
      const currentComponent = selectedComponent.get("customComponent");

      setContent({
        title: currentComponent?.content.title || content.title,
        description:
          currentComponent?.content.description || content.description,
        buttonText: currentComponent?.content.buttonText || content.buttonText,
      });
    }
  }, [selectedComponent]);

  const handleContentChange = (key, value) => {
    const currentComponent = selectedComponent?.get("customComponent");
    const updatedContent = { ...content, [key]: value };
    setContent(updatedContent);

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.content[key] = value;
    });
    selectedComponent?.set("customComponent", updatedComponent);
  };

  return (
    <>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <RichTextEditor
            label="Title"
            value={content.title}
            onChange={(value) => handleContentChange("title", value)}
          />

          <RichTextEditor
            label="Description"
            value={content.description}
            onChange={(value) => handleContentChange("description", value)}
          />
        </div>
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransitionEditor selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="background">
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </>
  );
};

export default EditorCTA;
