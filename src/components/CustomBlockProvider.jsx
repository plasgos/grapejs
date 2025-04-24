import { cx } from "class-variance-authority";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useEffect } from "react";
import { MdLockOutline } from "react-icons/md";
import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
  searchBlock,
}) {
  const { sidebarWidth, isCollapsedSideBar } = useSelector(
    (state) => state.landingPage
  );

  const [openCategories, setOpenCategories] = useState([]);

  const filteredBlocks = Array.from(mapCategoryBlocks).reduce(
    (acc, [category, blocks]) => {
      const filtered = blocks.filter(
        (block) =>
          block.getLabel().toLowerCase().includes(searchBlock.toLowerCase()) ||
          category.toLowerCase().includes(searchBlock.toLowerCase())
      );
      if (filtered.length > 0) {
        acc.set(category, filtered);
      }
      return acc;
    },
    new Map()
  );

  // Inisialisasi semua kategori terbuka pada render pertama
  useEffect(() => {
    const allCategories = Array.from(mapCategoryBlocks.keys());
    setOpenCategories(allCategories); // Semua kategori dibuka saat pertama kali render
  }, [mapCategoryBlocks]);

  useEffect(() => {
    if (searchBlock) {
      const categoriesToOpen = Array.from(filteredBlocks.keys());
      setOpenCategories(categoriesToOpen);
    } else {
      const allCategories = Array.from(mapCategoryBlocks.keys());
      setOpenCategories(allCategories);
    }
  }, [searchBlock]);

  const responsiveGrid =
    sidebarWidth <= 20
      ? "grid-cols-1"
      : sidebarWidth >= 50
      ? "grid-cols-3"
      : "grid-cols-2";

  return (
    <div
      className={`gjs-custom-block-manager text-left ${
        isCollapsedSideBar ? "px-2" : "px-5"
      } bg-[#FEEBDB]  `}
    >
      {Array.from(filteredBlocks).length > 0 ? (
        <div className="">
          {Array.from(filteredBlocks).map(([category, blocks]) => (
            <div key={category}>
              <Accordion
                key={category}
                type="multiple"
                value={openCategories}
                onValueChange={setOpenCategories}
              >
                <AccordionItem value={`${category}`}>
                  <AccordionTrigger className="!no-underline">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      className={`grid ${responsiveGrid}  gap-2 p-1 place-items-center`}
                    >
                      {blocks.map((block) => {
                        const isLocked = block.get("attributes")?.isLocked;

                        return (
                          <>
                            {isCollapsedSideBar ? (
                              <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      key={block.getId()}
                                      draggable={!isLocked}
                                      className={cx(
                                        "relative flex flex-col justify-center items-center border p-3 transition-colors bg-white rounded-md shadow-sm ",
                                        {
                                          "cursor-not-allowed opacity-50":
                                            isLocked,
                                          "cursor-grab": !isLocked,
                                        }
                                      )}
                                      onDragStart={(ev) => {
                                        if (!isLocked)
                                          dragStart(block, ev.nativeEvent);
                                      }}
                                      onDragEnd={() => {
                                        if (!isLocked) dragStop(false);
                                      }}
                                    >
                                      <div className="h-8 w-8">
                                        <div
                                          className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                                          dangerouslySetInnerHTML={{
                                            __html: block.getMedia(),
                                          }}
                                        />
                                      </div>

                                      {isLocked && (
                                        <div className="absolute top-3 right-3">
                                          <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  size="icon"
                                                  variant="ghost"
                                                >
                                                  <MdLockOutline className="" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>Unlock Pro</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      )}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div
                                      className="text-sm text-center w-full"
                                      title={block.getLabel()}
                                    >
                                      {block.getLabel()}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              <div
                                key={block.getId()}
                                draggable={!isLocked}
                                className={cx(
                                  "relative flex flex-col justify-center items-center border py-2 px-5 transition-colors bg-white rounded-md shadow-sm h-[100px] w-full",
                                  {
                                    "cursor-not-allowed opacity-50": isLocked,
                                    "cursor-grab": !isLocked,
                                  }
                                )}
                                onDragStart={(ev) => {
                                  if (!isLocked)
                                    dragStart(block, ev.nativeEvent);
                                }}
                                onDragEnd={() => {
                                  if (!isLocked) dragStop(false);
                                }}
                              >
                                <div className="h-10 w-10">
                                  <div
                                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                                    dangerouslySetInnerHTML={{
                                      __html: block.getMedia(),
                                    }}
                                  />
                                </div>

                                <div
                                  className="text-sm text-center w-full"
                                  title={block.getLabel()}
                                >
                                  {block.getLabel()}
                                </div>

                                {isLocked && (
                                  <div className="absolute top-3 right-3">
                                    <TooltipProvider delayDuration={100}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button size="icon" variant="ghost">
                                            <MdLockOutline className="" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Unlock Pro</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            height: "calc(100vh - 200px)",
          }}
          className="flex flex-col  justify-center items-center text-center !pb-0 "
        >
          <p>Not Found!</p>
        </div>
      )}
    </div>
  );
}
