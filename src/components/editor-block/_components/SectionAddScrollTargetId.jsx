import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
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

const SectionAddScrollTargetId = ({ selectedComponent }) => {
  const editor = useEditor();
  const editorModel = editor.getModel();

  const { currentComponent, setCurrentComponent, handleComponentChange } =
    useChangeComponentValue(selectedComponent);
  console.log(
    "🚀 ~ SectionAddScrollTargetId ~ currentComponent:",
    currentComponent.scrollTarget
  );

  useSyncWithUndoRedo(setCurrentComponent);

  const { toast } = useToast();

  console.log("GLOBAL OPTIONS", editorModel.get("globalOptions"));

  const [scrollTargetValue, setScrollTargetValue] = useState("");
  const [selectedTargetId, setSelectedTargetId] = useState("");
  const [isTargetAdded, setIsTargetAdded] = useState(false);

  const handleAddScrollTarget = () => {
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
  };

  const handleDeleteScrollTarget = () => {
    const globalOptions = editorModel.get("globalOptions");

    // Update global options
    editorModel.set("globalOptions", {
      ...globalOptions,
      scrollTarget: globalOptions.scrollTarget.filter(
        (target) => target.value !== scrollTargetValue
      ),
    });

    handleComponentChange("scrollTarget", undefined);

    setScrollTargetValue("");
    setSelectedTargetId("");
    setIsTargetAdded(false);
  };

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
