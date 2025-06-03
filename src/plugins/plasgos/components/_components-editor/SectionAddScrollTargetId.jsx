import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEditor } from "@grapesjs/react";
import { useEffect } from "react";
import useSyncWithUndoRedo from "@/hooks/useSyncWithUndoRedo";
import { useChangeComponentValue } from "@/hooks/useChangeComponentValue";

import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";

const SectionAddScrollTargetId = ({ selectedComponent }) => {
  const editor = useEditor();
  const editorModel = editor.getModel();

  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);

  useSyncWithUndoRedo(setCurrentComponent);

  const { toast } = useToast();

  const [scrollTargetValue, setScrollTargetValue] = useState("");
  const [selectedTargetId, setSelectedTargetId] = useState("");

  const [isTargetAdded, setIsTargetAdded] = useState(false);

  const handleAddScrollTarget = useCallback(() => {
    const globalOptions = editorModel.get("globalOptions");

    const newId = Math.random().toString(36).substr(2, 9);
    const payload = {
      id: newId,
      value: scrollTargetValue,
      label: scrollTargetValue,
    };

    // Update global options
    editorModel.set("globalOptions", {
      ...globalOptions,
      scrollTarget: [...globalOptions.scrollTarget, payload],
    });

    handleComponentChange("scrollTarget", payload);

    setIsTargetAdded(true);
    setSelectedTargetId(newId);
  }, [editorModel, handleComponentChange, scrollTargetValue]);

  const handleDeleteScrollTarget = useCallback(() => {
    const globalOptions = editorModel.get("globalOptions");

    // Update global options
    editorModel.set("globalOptions", {
      ...globalOptions,
      scrollTarget: globalOptions.scrollTarget.filter(
        (target) => target.id !== selectedTargetId
      ),
    });

    handleComponentChange("scrollTarget", undefined);

    setScrollTargetValue("");
    setSelectedTargetId("");
    setIsTargetAdded(false);
  }, [editorModel, handleComponentChange, selectedTargetId]);

  useEffect(() => {
    if (selectedComponent) {
      const currentComponent = selectedComponent?.get("customComponent");

      const globalOptions = editorModel.get("globalOptions");

      setScrollTargetValue(currentComponent.scrollTarget?.value);
      setSelectedTargetId(currentComponent.scrollTarget?.id);

      if (currentComponent.scrollTarget?.id) {
        setIsTargetAdded(
          globalOptions.scrollTarget.some(
            (target) => selectedTargetId === target.id
          )
        );
      } else {
        setIsTargetAdded(false);
      }
    }
  }, [
    currentComponent.scrollTarget?.id,
    editorModel,
    selectedComponent,
    selectedTargetId,
  ]);

  useEffect(() => {
    const syncOnUndoRedo = () => {
      const updatedComponent = selectedComponent?.get("customComponent");
      if (updatedComponent) {
        setCurrentComponent(updatedComponent);

        const globalOptions = editorModel.get("globalOptions");
        const scrollTargetGlobalOptions = globalOptions.scrollTarget || [];

        const checkHasScrollTarget = scrollTargetGlobalOptions.find(
          (target) => target.id === selectedTargetId
        );

        if (updatedComponent.scrollTarget && !checkHasScrollTarget) {
          editorModel.set("globalOptions", {
            ...globalOptions,
            scrollTarget: [
              ...scrollTargetGlobalOptions,
              updatedComponent.scrollTarget,
            ],
          });
        } else if (!updatedComponent.scrollTarget && checkHasScrollTarget) {
          editorModel.set("globalOptions", {
            ...globalOptions,
            scrollTarget: scrollTargetGlobalOptions.filter(
              (target) => target.id !== selectedTargetId
            ),
          });
        }
      }
    };

    editor.on("undo", syncOnUndoRedo);
    editor.on("redo", syncOnUndoRedo);

    return () => {
      editor.off("undo", syncOnUndoRedo);
      editor.off("redo", syncOnUndoRedo);
    };
  }, [
    editor,
    editorModel,
    selectedComponent,
    selectedTargetId,
    setCurrentComponent,
  ]);

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="!no-underline bg-white rounded px-3  ">
            Scroll Target
          </AccordionTrigger>
          <AccordionContent className="bg-white rounded p-2">
            <div className="space-y-2 mb-1">
              <div className="flex items-center gap-x-3">
                <Input
                  readOnly={isTargetAdded}
                  disabled={isTargetAdded}
                  placeholder="targetId"
                  className="placeholder:text-slate-300"
                  value={scrollTargetValue || ""}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/\s/g, "");
                    setScrollTargetValue(sanitizedValue);
                  }}
                />

                {!isTargetAdded && (
                  <Button
                    variant="outline"
                    disabled={!scrollTargetValue}
                    onClick={() => {
                      handleAddScrollTarget();

                      toast({
                        title: "Scroll Target Success Added",
                        className:
                          "bg-green-100 text-green-800 border border-green-300",
                        duration: 2000,
                      });
                    }}
                  >
                    <FaPlus />
                  </Button>
                )}

                {isTargetAdded && (
                  <Button
                    variant="outline"
                    disabled={!scrollTargetValue}
                    onClick={() => {
                      handleDeleteScrollTarget(selectedTargetId);
                    }}
                  >
                    <FaTrash color="red" />
                  </Button>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SectionAddScrollTargetId;
