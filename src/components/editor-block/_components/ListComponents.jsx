import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
import { produce } from "immer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BlocksProvider } from "@grapesjs/react";
import { useState } from "react";
import { Search } from "lucide-react";
import DraggableList from "./DraggableList";
import { generateId } from "@/lib/utils";
import { useRef } from "react";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";

const ListComponents = ({ editor, selectedComponent }) => {
  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log("🚀 ~ ListComponents ~ value:", value);
  const [editItem, setEditItem] = useState(false);
  const [search, setSearch] = useState("");

  const contentListRef = useRef(null);

  const handleAddContent = (newContent) => {
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

    setValue(newContent);

    setTimeout(() => {
      if (contentListRef.current) {
        contentListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100);
  };

  const renderContents = () => {};

  return (
    <>
      <Label>Contents</Label>

      <div ref={contentListRef}>
        <DraggableList
          contents={currentComponent.contents}
          renderContents={(value) => renderContents(value)}
          setCurrentComponent={setCurrentComponent}
          editItem={editItem}
          selectedComponent={selectedComponent}
          setEditItem={setEditItem}
        >
          <div className="mt-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[310px] justify-between text-slate-400"
                >
                  {"Select Content..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[310px] p-0">
                <Command>
                  <div className="flex items-center  relative">
                    <Input
                      placeholder="Search Contents..."
                      onChange={(e) => setSearch(e.target.value)}
                      className="max-w-sm bg-white dark:bg-transparent pl-8 ring-0 focus:!ring-0 shadow-none focus:shadow-none focus:outline-none border-b rounded-none  bg-transparent "
                    />
                    <Search
                      size={18}
                      className="absolute left-2 text-gray-400 "
                    />
                  </div>

                  <CommandList>
                    <CommandGroup>
                      <BlocksProvider>
                        {({ mapCategoryBlocks, dragStart, dragStop }) => {
                          const filteredBlocks = Array.from(mapCategoryBlocks)
                            .filter(([key]) => !key.includes("Floating"))
                            .reduce((acc, [category, blocks]) => {
                              const filtered = blocks.filter(
                                (block) =>
                                  block
                                    .getLabel()
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                  category
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                              );
                              if (filtered.length > 0) {
                                acc.set(category, filtered);
                              }
                              return acc;
                            }, new Map());

                          return (
                            <>
                              {Array.from(filteredBlocks).length > 0 ? (
                                <div>
                                  {Array.from(filteredBlocks).map(
                                    ([category, blocks]) => (
                                      <CommandGroup
                                        heading={category}
                                        key={category}
                                      >
                                        {blocks.map((block) => {
                                          return (
                                            <CommandItem
                                              className="cursor-pointer"
                                              key={block.getId()}
                                              value={block.getId()}
                                              onSelect={() => {
                                                const blockId = block.getId();
                                                const selectedBlock =
                                                  editor.BlockManager.get(
                                                    blockId
                                                  );
                                                const selectedComponentType =
                                                  editor.Components.getType(
                                                    blockId
                                                  );

                                                // Cari instance komponen di dalam canvas
                                                const selectedComponentInstances =
                                                  editor
                                                    .getWrapper()
                                                    .find(
                                                      `[data-gjs-type="${blockId}"]`
                                                    );

                                                if (
                                                  selectedComponentInstances.length >
                                                  0
                                                ) {
                                                  const selectedComponent =
                                                    selectedComponentInstances[0]; // Ambil instance pertama

                                                  console.log(
                                                    "Selected Block:",
                                                    selectedBlock
                                                  );
                                                  console.log(
                                                    "Selected Component:",
                                                    selectedComponent
                                                  );
                                                  console.log(
                                                    "Custom Component Data:",
                                                    selectedComponent.get(
                                                      "customComponent"
                                                    )
                                                  );
                                                } else {
                                                  console.log(
                                                    "Component not found in canvas."
                                                  );
                                                }
                                              }}
                                              // onSelect={() => {
                                              //   const blockData =
                                              //     editor.BlockManager.get(
                                              //       block.getId()
                                              //     );

                                              //   if (blockData) {
                                              //     const contentType =
                                              //       blockData.get(
                                              //         "content"
                                              //       )?.type;
                                              //     const componentType =
                                              //       editor.Components.getType(
                                              //         contentType
                                              //       );

                                              //     if (componentType) {
                                              //       const componentModel =
                                              //         componentType.model
                                              //           .prototype.defaults;

                                              //       const newId = generateId();
                                              //       const newCustomComponent = {
                                              //         ...componentModel.customComponent,
                                              //         id: newId,
                                              //         componentType:
                                              //           componentType.id,
                                              //         iconBlock:
                                              //           block.getMedia(),
                                              //         blockLabel:
                                              //           componentModel.blockLabel,
                                              //       };

                                              //       handleAddContent(
                                              //         newCustomComponent
                                              //       );

                                              //       setOpen(false);
                                              //     }
                                              //   }
                                              // }}
                                            >
                                              <div
                                                className=""
                                                dangerouslySetInnerHTML={{
                                                  __html: block.getMedia(),
                                                }}
                                              />

                                              {block.getLabel()}
                                            </CommandItem>
                                          );
                                        })}
                                      </CommandGroup>
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="text-center p-2">
                                  <p>Not Found!</p>
                                </div>
                              )}
                            </>
                          );
                        }}
                      </BlocksProvider>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </DraggableList>
      </div>
    </>
  );
};

export default ListComponents;
