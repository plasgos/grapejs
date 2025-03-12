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
import { produce } from "immer";
import { useEffect } from "react";

const SectionAddScrollTargetId = ({ selectedComponent }) => {
  const editor = useEditor();
  const editorModel = editor.getModel();

  const currentComponent = selectedComponent?.get("customComponent");

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

    const currentComponent = selectedComponent?.get("customComponent");

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.scrollTarget = payload;
    });

    selectedComponent.set("customComponent", updatedComponent);

    console.log(editorModel.get("globalOptions"));

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

    const currentComponent = selectedComponent?.get("customComponent");

    const updatedComponent = produce(currentComponent, (draft) => {
      draft.scrollTarget = undefined;
    });

    selectedComponent.set("customComponent", updatedComponent);

    console.log(editorModel.get("globalOptions"));

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
            <div className="space-y-2 ">
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
                    onClick={handleAddScrollTarget}
                  >
                    <FaPlus />
                  </Button>
                )}

                {isTargetAdded && (
                  <Button
                    variant="outline"
                    disabled={!scrollTargetValue}
                    onClick={() => handleDeleteScrollTarget(selectedTargetId)}
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
