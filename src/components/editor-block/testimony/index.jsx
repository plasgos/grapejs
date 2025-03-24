import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import { produce } from "immer";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeContents } from "@/hooks/useChangeContents";
import { generateId } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import DraggableList from "../_components/DraggableList";
import TextEditor from "../_components/TextEditor";
import avatar5 from "@/assets/avatar5.jpg";
import { FaStar } from "react-icons/fa";
import { useChangeWrapperStyles } from "@/hooks/useChangeWrapperStyles";
import { Switch } from "@/components/ui/switch";
import SelectOptions from "../_components/SelectOptions";
import ImageUploader from "../_components/ImageUploader";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";

const layoutVariants = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

const EditorTestimony = ({ selectedComponent }) => {
  const { contents, setContents, handleContentChange } =
    useChangeContents(selectedComponent);

  const { wrapperStyle, handleStylesChange } =
    useChangeWrapperStyles(selectedComponent);

  const [editItem, setEditItem] = useState("");

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();

    const newContent = {
      id: newId,
      image: avatar5,
      name: "David",
      profetion: "Freelancer",
      description:
        "Harga terjangkau dengan kualitas yang sangat baik. 100% puas!",
      stars: 4,
      isFocused: false,
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

    const handleFileUpload = (id) => {
      onChangeFileUpload(id, handleContentChange);
    };

    return (
      <>
        <ImageUploader
          label="Image"
          handleFileUpload={() => handleFileUpload(item.id)}
          image={selectedContent.image}
        />

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={selectedContent.name || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleContentChange(item.id, "name", value);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Profetion</Label>
          <Input
            placeholder="Customer"
            value={selectedContent.profetion || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleContentChange(item.id, "profetion", value);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>Stars</Label>

          <div className="flex  gap-x-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                onClick={() => handleContentChange(item.id, "stars", index + 1)}
                className={`cursor-pointer text-3xl hover:scale-125 hover:transition-all ease-in-out`}
                key={index}
                color={index < selectedContent.stars ? "#ffd250" : "#ccc"}
              />
            ))}
          </div>
        </div>

        <TextEditor
          label="Content"
          value={contents[0].description}
          onChange={(value) =>
            handleContentChange(item.id, "description", value)
          }
        />
      </>
    );
  };

  return (
    <TabsEditor withoutTransition>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <div className="flex flex-col gap-y-5 bg-white rounded-lg p-3">
            <SelectOptions
              label="Layout Variant"
              options={layoutVariants}
              value={wrapperStyle.variant}
              onChange={(value) => handleStylesChange("variant", value)}
            />

            <div className="flex justify-between items-center">
              <Label className="font-normal">With Slider</Label>
              <Switch
                checked={wrapperStyle.withSlider}
                onCheckedChange={(checked) =>
                  handleStylesChange("withSlider", checked)
                }
              />
            </div>

            {wrapperStyle.withSlider && (
              <div className="flex justify-between items-center">
                <Label className="font-normal">Auot Play</Label>
                <Switch
                  checked={wrapperStyle.autoPlaySlider}
                  onCheckedChange={(checked) =>
                    handleStylesChange("autoPlaySlider", checked)
                  }
                />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-y-5 p-3 bg-white rounded-lg">
            <TextEditor
              label="Header"
              value={wrapperStyle.header}
              onChange={(value) => handleStylesChange("header", value)}
            />
          </div>

          <DraggableList
            contents={contents}
            renderContents={(value) => renderContents(value)}
            setContents={setContents}
            editItem={editItem}
            selectedComponent={selectedComponent}
            setEditItem={setEditItem}
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
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="background"
      >
        <BackgroundEditor selectedComponent={selectedComponent} />
      </TabsContent>
    </TabsEditor>
  );
};

export default EditorTestimony;
