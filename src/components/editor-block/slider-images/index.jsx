import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../components/BackgroundEditor";
import SectionAddScrollTargetId from "../components/SectionAddScrollTargetId";

import slider5 from "@/assets/slider5.jpg";

import { Button } from "@/components/ui/button";
import { useChangeContents } from "@/hooks/useChangeContents";
import { generateId } from "@/lib/utils";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "../components/DraggableList";
import ImageUploader from "../components/ImageUploader";
import TargetOptions from "../components/TargetOptions";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GoQuestion } from "react-icons/go";
import { Label } from "@/components/ui/label";
import StylesTab from "./StylesTab";

const EditorSliderImages = ({ selectedComponent }) => {
  const { contents, setContents, handleContentChange } =
    useChangeContents(selectedComponent);

  const [editItem, setEditItem] = useState("");

  const handleFileUpload = (id) => {
    onChangeFileUpload(id, handleContentChange);
  };

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();
    const newContent = {
      id: newId,
      image: slider5,
      alt: "",
      target: {
        actionType: "link",
        options: {
          type: null,
        },
      },
    };

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents.push(newContent);
      })
    );

    setContents((content) => [...content, newContent]);

    setEditItem(newId);
  };

  const renderContents = (item) => {
    const selectedContent = contents.find((content) => content.id === item.id);

    return (
      <>
        <ImageUploader
          label="Image"
          handleFileUpload={() => handleFileUpload(item.id)}
          image={selectedContent.image}
        />

        <div className="space-y-2 mt-3">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-x-3">
                Alt Text <GoQuestion />
              </TooltipTrigger>
              <TooltipContent>
                <Label>Alt text for optimize SEO</Label>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Input
            placeholder="product best seller"
            className="placeholder:text-neutral-300"
            value={contents[0].alt || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleContentChange(contents[0].id, "alt", value);
            }}
          />
        </div>

        <TargetOptions
          content={item}
          handleContentChange={handleContentChange}
        />
      </>
    );
  };

  return (
    <TabsEditor withoutTransition>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <DraggableList
            contents={contents}
            renderContents={(value) => renderContents(value)}
            setContents={setContents}
            editItem={editItem}
            selectedComponent={selectedComponent}
            setEditItem={setEditItem}
            withoutFocusItem
          >
            <Button
              onClick={handleAddContent}
              variant="outline"
              className="my-3 w-full"
            >
              Add Content <Plus />
            </Button>
          </DraggableList>
        </div>
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorSliderImages;
