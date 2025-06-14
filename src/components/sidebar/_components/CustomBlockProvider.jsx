import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fragment } from "react";

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
  searchBlock,
}) {
  const [openCategories, setOpenCategories] = useState([]);

  // const filteredBlocks = Array.from(mapCategoryBlocks).reduce(
  //   (acc, [category, blocks]) => {
  //     const filtered = blocks.filter(
  //       (block) =>
  //         block.getLabel().toLowerCase().includes(searchBlock.toLowerCase()) ||
  //         category.toLowerCase().includes(searchBlock.toLowerCase())
  //     );
  //     if (filtered.length > 0) {
  //       acc.set(category, filtered);
  //     }
  //     return acc;
  //   },
  //   new Map()
  // );

  const filteredBlocks = Array.from(mapCategoryBlocks).reduce(
    (acc, [category, blocks]) => {
      // ⛔️ Skip jika kategori floating
      if (
        category.toLowerCase().includes("floating") ||
        category.toLowerCase().includes("popup")
      )
        return acc;

      const filtered = blocks.filter(
        (block) =>
          !block.get("type")?.startsWith("floating-") && // Extra guard
          (block.getLabel().toLowerCase().includes(searchBlock.toLowerCase()) ||
            category.toLowerCase().includes(searchBlock.toLowerCase()))
      );

      if (filtered.length > 0) {
        acc.set(category, filtered);
      }

      return acc;
    },
    new Map()
  );

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

  return (
    <div className={` p-5 bg-[#FEEBDB]   `}>
      {Array.from(filteredBlocks).length > 0 ? (
        <div className="">
          {Array.from(filteredBlocks).map(([category, blocks]) => {
            return (
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
                        className={`grid grid-cols-2  gap-2 p-1 place-items-center`}
                      >
                        {blocks.map((block) => {
                          const isLocked = block.get("attributes")?.isLocked;

                          return (
                            <Fragment key={block.getId()}>
                              <div
                                key={block.getId()}
                                draggable={!isLocked}
                                className={cx(
                                  "relative flex flex-col justify-center items-center border p-0 transition-colors bg-white rounded-md shadow-sm h-[80px] w-full",
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
                                <div className="h-6 w-6">
                                  <div
                                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                                    dangerouslySetInnerHTML={{
                                      __html: block.getMedia(),
                                    }}
                                  />
                                </div>

                                <div className="text-sm  text-center max-w-28 font-semibold">
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
                            </Fragment>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
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
