import { Label } from "@/components/ui/label";
import { BlocksProvider, useEditor } from "@grapesjs/react";
import { Navigator } from "./SortComponent";

import { cx } from "class-variance-authority";
import { Fragment } from "react";
import { MdLockOutline } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useReducer } from "react";
import { useEffect } from "react";

function FloatingBlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
  editor,
}) {
  const filteredBlocks = Array.from(mapCategoryBlocks).reduce(
    (acc, [category, blocks]) => {
      // ✅ Hanya ambil kategori yang mengandung "floating"
      if (!category.toLowerCase().includes("floating")) return acc;

      // ✅ Filter block yang type-nya diawali "floating-"
      const filtered = blocks.filter((block) => {
        return block.get("id")?.startsWith("floating-");
      });
      if (filtered.length > 0) {
        acc.set(category, filtered);
      }

      return acc;
    },
    new Map()
  );

  const canvasComponentIds = editor
    .getWrapper()
    .find("*")
    .map((comp) => comp.get("type"));
  return (
    <div className={`    `}>
      {Array.from(filteredBlocks).length > 0 ? (
        <div className="">
          {Array.from(filteredBlocks).map(([category, blocks]) => {
            return (
              <div key={category}>
                <div
                  className={`grid grid-cols-2  gap-2 p-1 place-items-center`}
                >
                  {blocks.map((block) => {
                    const blockId = block.getId();
                    const isAlreadyInCanvas =
                      canvasComponentIds.includes(blockId);
                    const isLocked =
                      block.get("attributes")?.isLocked || isAlreadyInCanvas;

                    const unClock = block.get("attributes")?.isLocked;

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
                            if (!isLocked) dragStart(block, ev.nativeEvent);
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

                          {unClock && (
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

const FloatingButtonsSetting = () => {
  const editor = useEditor();

  const components = editor.getComponents()?.models;

  const floatingComponents = components.filter((comp) =>
    comp?.get("category")?.toLowerCase().includes("floating")
  );

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const update = () => forceUpdate();
    editor.on("component:add", update);
    editor.on("component:remove", update);
    editor.on("component:clone", update);
    editor.on("component:update", update);

    return () => {
      editor.off("component:add", update);
      editor.off("component:remove", update);
      editor.off("component:clone", update);
      editor.off("component:update", update);
    };
  }, [editor]);

  const canvasComponentTypes = editor
    .getWrapper()
    .find("*")
    .map((comp) => comp.get("type"));

  const hasFloatingComponent = canvasComponentTypes.some((type) =>
    type?.startsWith("floating-")
  );
  return (
    <div>
      <div className="sticky top-0 z-10  border-b shadow  p-4 bg-orange-200  flex justify-between items-center ">
        <p className="font-semibold">Floating Buttons</p>
      </div>

      <div className="p-3 h-[86vh] overflow-y-auto">
        <BlocksProvider>
          {(props) => <FloatingBlockManager {...props} editor={editor} />}
        </BlocksProvider>

        {hasFloatingComponent && (
          <div className="space-y-2 my-2">
            <Label>Handler</Label>
            <Navigator
              editor={editor}
              components={floatingComponents}
              isFloatingComponent
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButtonsSetting;
