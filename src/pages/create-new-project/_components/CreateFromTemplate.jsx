import { Button } from "@/components/ui/button";
import { optionViewMode } from "@/pages/files";
import { useState } from "react";
import mathcaTemplate from "@/templates-website/matcha.json";
import { useNavigate } from "react-router-dom";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdOutlineFilterCenterFocus } from "react-icons/md";
import PreviewTemplate from "./PreviewTemplate";

const tempateOptions = [
  {
    id: "template-01",
    name: "Matcha",
    category: "Marketing",
    isFavorite: false,
    thumbnail:
      "https://ik.imagekit.io/ez1ffaf6o/templates-thumbnail/thumbnail-matcha-template.png?updatedAt=1748338326112",
    frameProject: mathcaTemplate,
  },
];

const CreateFromTemplate = () => {
  const [selectedViewMode, setSelectedViewMode] = useState("grid");

  const [templatesData, setTemplatesData] = useState(tempateOptions);

  const [previewTemplate, setPreviewTemplate] = useState(undefined);

  const navigate = useNavigate();

  const handleFavorite = (id) => {
    setTemplatesData((prev) =>
      prev.map((data) => {
        if (data.id === id) {
          const currenFavoriteValue = data.isFavorite;

          return {
            ...data,
            isFavorite: currenFavoriteValue ? false : true,
          };
        } else {
          return data;
        }
      })
    );
  };

  return (
    <div className="relative bg-white p-10 h-screen w-full ">
      <div className="mb-5">
        <h1>Pilih Template Sesuai Kebutuhan Anda</h1>
        <p className="text-muted-foreground">
          Temukan template yang paling cocok untuk bisnis atau proyek Anda.
          Cepat, mudah, dan tanpa coding!
        </p>
      </div>

      <div className="flex justify-between w-full mb-5">
        <div className="w-10"></div>

        <div className="flex gap-x-2 items-center">
          {optionViewMode.map((viewMode, index) => {
            const selected = selectedViewMode === viewMode.value;

            return (
              <Button
                key={index}
                onClick={() => setSelectedViewMode(viewMode.value)}
                size="icon"
                variant={selected ? "" : "outline"}
              >
                {viewMode.icon}
              </Button>
            );
          })}
        </div>
      </div>

      {selectedViewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {templatesData.map((template) => {
            return (
              <div
                key={template.id}
                className="rounded-lg  shadow-md overflow-hidden flex flex-col  bg-white"
              >
                <div className="w-full h-full max-h-[200px] overflow-hidden relative group ">
                  <img
                    src={template.thumbnail}
                    alt=""
                    className="object-cover w-full h-full group-hover:scale-110 transform transition-all ease-in-out"
                  />

                  <div className=" absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity duration-300 flex flex-col gap-y-5 justify-center items-center ">
                    <Button
                      className="w-[140px]"
                      onClick={() => setPreviewTemplate(template)}
                      variant="outline"
                      size=""
                    >
                      Preview <MdOutlineFilterCenterFocus />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 ">
                  <div>
                    <p className="font-semibold">{template.name}</p>
                  </div>

                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleFavorite(template.id)}
                          size="icon"
                          variant="ghost"
                        >
                          {template.isFavorite ? (
                            <IoMdStar className="scale-150 text-yellow-500" />
                          ) : (
                            <IoIosStarOutline className="scale-125" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {template.isFavorite ? (
                          <p>Remove from favorite</p>
                        ) : (
                          <p>Add to favorite</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <PreviewTemplate
        isOpen={!!previewTemplate}
        onClose={(value) => {
          setPreviewTemplate(typeof value === "boolean" ? undefined : value);
        }}
        data={previewTemplate}
      />
    </div>
  );
};

export default CreateFromTemplate;
