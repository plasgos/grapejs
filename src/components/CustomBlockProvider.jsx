import { cx } from "class-variance-authority";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CustomBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
  searchBlock,
}) {
  const filteredBlocks = Array.from(mapCategoryBlocks).reduce(
    (acc, [category, blocks]) => {
      const filtered = blocks.filter((block) =>
        block.getLabel().toLowerCase().includes(searchBlock.toLowerCase())
      );
      if (filtered.length > 0) {
        acc.set(category, filtered);
      }
      return acc;
    },
    new Map()
  );

  return (
    <div className="gjs-custom-block-manager text-left px-5  pb-5">
      {Array.from(filteredBlocks).length > 0 ? (
        <div>
          {Array.from(filteredBlocks).map(([category, blocks]) => (
            <div key={category}>
              <Accordion
                defaultValue="Custom Widgets"
                key={category}
                type="single"
                collapsible
              >
                <AccordionItem value={`${category}`}>
                  <AccordionTrigger className="!no-underline">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2 p-2">
                      {blocks.map((block) => (
                        <div
                          key={block.getId()}
                          draggable
                          className={cx(
                            "flex flex-col items-center border  cursor-pointer py-2 px-5 transition-colors bg-white rounded-md shadow-sm"
                          )}
                          onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                          onDragEnd={() => dragStop(false)}
                        >
                          <div
                            className="h-10 w-10"
                            dangerouslySetInnerHTML={{
                              __html: block.getMedia(),
                            }}
                          />
                          <div
                            className="text-sm text-center w-full"
                            title={block.getLabel()}
                          >
                            {block.getLabel()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p>Not Found!</p>
        </div>
      )}
    </div>
  );
}
