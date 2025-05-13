import { TabsContent } from "@/components/ui/tabs";
import { produce } from "immer";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { generateId } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import DraggableList from "../_components/DraggableList";
import ImageUploader from "../_components/ImageUploader";
import SelectOptions from "../_components/SelectOptions";

const layoutVariants = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

const EditorTestimony = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { contents, wrapperStyle } = currentComponent;

  const [editItem, setEditItem] = useState("");

  const handleAddContent = () => {
    setEditItem("");

    const newId = generateId();

    const newContent = {
      id: newId,
      image:
        "https://ik.imagekit.io/ez1ffaf6o/default-images/avatar5.jpg?updatedAt=1747122493266",
      name: "David",
      profetion: "Freelancer",
      description:
        "Harga terjangkau dengan kualitas yang sangat baik. 100% puas!",
      stars: 4,
    };

    selectedComponent?.set(
      "customComponent",
      produce(selectedComponent?.get("customComponent"), (draft) => {
        draft.contents.push(newContent);
      })
    );

    setCurrentComponent((prevComponent) =>
      produce(prevComponent, (draft) => {
        draft.contents = [...draft.contents, newContent];
      })
    );
    setEditItem(newId);
  };

  const renderContents = (item) => {
    return (
      <>
        <ImageUploader
          label="Image"
          handleFileUpload={(url) =>
            handleComponentChange(`contents.${item.id}.image`, url)
          }
          image={item.image}
        />

        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={item.name || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleComponentChange(`contents.${item.id}.name`, value);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Profetion</Label>
          <Input
            placeholder="Customer"
            value={item.profetion || ""}
            onChange={(e) => {
              const value = e.target.value;
              handleComponentChange(`contents.${item.id}.profetion`, value);
            }}
          />
        </div>
        <div className="space-y-2">
          <Label>Stars</Label>

          <div className="flex  gap-x-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                onClick={() =>
                  handleComponentChange(`contents.${item.id}.stars`, index + 1)
                }
                className={`cursor-pointer text-3xl hover:scale-125 hover:transition-all ease-in-out`}
                key={index}
                color={index < item.stars ? "#ffd250" : "#ccc"}
              />
            ))}
          </div>
        </div>

        <RichTextEditor
          label="Content"
          value={contents[0].description}
          onChange={(value) =>
            handleComponentChange(`contents.${item.id}.description`, value)
          }
        />
      </>
    );
  };

  return (
    <>
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
              onChange={(value) =>
                handleComponentChange("wrapperStyle.variant", value)
              }
            />

            <div className="flex justify-between items-center">
              <Label className="font-normal">With Slider</Label>
              <Switch
                checked={wrapperStyle.withSlider}
                onCheckedChange={(checked) =>
                  handleComponentChange("wrapperStyle.withSlider", checked)
                }
              />
            </div>

            {wrapperStyle.withSlider && (
              <div className="flex justify-between items-center">
                <Label className="font-normal">Auot Play</Label>
                <Switch
                  checked={wrapperStyle.autoPlaySlider}
                  onCheckedChange={(checked) =>
                    handleComponentChange(
                      "wrapperStyle.autoPlaySlider",
                      checked
                    )
                  }
                />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-y-5 p-3 bg-white rounded-lg">
            <RichTextEditor
              label="Header"
              value={wrapperStyle.header}
              onChange={(value) =>
                handleComponentChange("wrapperStyle.header", value)
              }
            />
          </div>

          <DraggableList
            contents={contents}
            renderContents={(value) => renderContents(value)}
            setCurrentComponent={setCurrentComponent}
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
    </>
  );
};

export default EditorTestimony;
