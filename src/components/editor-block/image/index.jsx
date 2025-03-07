import TabsEditor from "@/components/TabsEditor";
import { TabsContent } from "@/components/ui/tabs";
import BackgroundEditor from "../components/BackgroundEditor";
import SectionAddScrollTargetId from "../components/SectionAddScrollTargetId";
import StylesTab from "./StylesTab";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangeContents } from "@/hooks/useChangeContents";
import { onChangeFileUpload } from "@/utils/onChangeFileUpload";
import ImageUploader from "../components/ImageUploader";
import TargetOptions from "../components/TargetOptions";
import { GoQuestion } from "react-icons/go";
import { Checkbox } from "@/components/ui/checkbox";
import TransiitonEditor from "../components/TransiitonEditor";

const EditorImage = ({ selectedComponent }) => {
  const { contents, handleContentChange } =
    useChangeContents(selectedComponent);

  const handleFileUpload = (id) => {
    onChangeFileUpload(id, handleContentChange);
  };

  return (
    <TabsEditor>
      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="content"
      >
        <div className="flex flex-col gap-y-5 py-1">
          <SectionAddScrollTargetId selectedComponent={selectedComponent} />

          <div className="p-3 rounded-lg bg-white">
            <ImageUploader
              label="Image"
              handleFileUpload={() => handleFileUpload(contents[0].id)}
              image={contents[0].image}
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

            <div className="flex items-center space-x-2 my-3">
              <Checkbox
                checked={contents[0].isDownloadImage}
                onCheckedChange={(checked) =>
                  handleContentChange(
                    contents[0].id,
                    "isDownloadImage",
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
            content={contents[0]}
            handleContentChange={handleContentChange}
          />
        </div>
      </TabsContent>

      <TabsContent
        className="px-4 pb-5 animate__animated animate__fadeInLeft"
        value="styles"
      >
        <StylesTab selectedComponent={selectedComponent} />
      </TabsContent>

      <TabsContent className="px-4 pb-5" value="transition">
        <TransiitonEditor selectedComponent={selectedComponent} />
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

export default EditorImage;
