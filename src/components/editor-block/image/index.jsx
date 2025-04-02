import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../_components/BackgroundEditor";
import SectionAddScrollTargetId from "../_components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";
import { GoQuestion } from "react-icons/go";
import ImageUploader from "../_components/ImageUploader";
import TargetOptions from "../_components/TargetOptions";
import TransitionEditor from "../_components/TransitionEditor";

const EditorImage = ({ selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  const { contents } = currentComponent;

  useSyncWithUndoRedo(setCurrentComponent);

  const handleFileUpload = (id) => {
    onChangeFileUpload(id, handleComponentChange);
  };

  return (
    <TabsEditor>
      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <div className="p-3 rounded-lg bg-white">
            <ImageUploader
              label="Image"
              handleFileUpload={() =>
                handleFileUpload(currentComponent.contents[0].id)
              }
              image={currentComponent.contents[0].image}
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
                value={currentComponent.contents[0].alt || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  handleComponentChange(
                    `contents.${contents[0].id}.alt`,
                    value
                  );
                }}
              />
            </div>

            <div className="flex items-center space-x-2 my-3">
              <Checkbox
                checked={currentComponent.contents[0].isDownloadImage}
                onCheckedChange={(checked) =>
                  handleComponentChange(
                    `contents.${contents[0].id}.isDownloadImage`,
                    checked
                  )
                }
                id="terms2"
              />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Disable Download Image
              </label>
            </div>
          </div>

          <TargetOptions
            content={currentComponent.contents[0]}
            setCurrentComponent={setCurrentComponent}
            handleComponentChange={handleComponentChange}
          />
        </div>
      </TabsContent>

      <TabsContent
        className="p-4 mt-0 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransitionEditor selectedComponent={selectedComponent} />
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

export default EditorImage;
