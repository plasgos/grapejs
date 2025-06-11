import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MenuAiPrompt from "./MenuAiPrompt";
import MenuColorPicker from "./MenuColorPicker";
import MenuFontFamily from "./MenuFontFamily";
import MenuFontSize from "./MenuFontSize";

const ViewMobileBar = ({
  editor,
  selectedComponent,
  bubbleMenuOptions,
  options,
  onChange,
  schemeColor,
}) => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-2 items-center">
        {bubbleMenuOptions.map((option, index) => (
          <Toggle
            key={index}
            pressed={option.preesed}
            onPressedChange={option.onClick}
            size="sm"
            variant=""
          >
            {option.icon}
          </Toggle>
        ))}

        <MenuColorPicker
          editor={editor}
          onChange={onChange}
          selectedComponent={selectedComponent}
          schemeColor={schemeColor}
        />
      </div>

      <div className="flex items-center gap-x-3">
        {options.map((option, index) => (
          <TooltipProvider key={index} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={option.preesed}
                  onPressedChange={option.onClick}
                  data-state={option.preesed ? "on" : "off"}
                  className="bg-transparent shadow-none ring-0 text-gray-500 data-[state=on]:text-accent data-[state=on]:bg-indigo-500 data-[state=on]:shadow-none data-[state=on]:ring-0 "
                >
                  {option.icon}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{option.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        <MenuAiPrompt editor={editor} />
      </div>

      <div className="flex items-center gap-x-3">
        <MenuFontSize editor={editor} />
        <MenuFontFamily editor={editor} />
      </div>
    </div>
  );
};

export default ViewMobileBar;
