import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { AiOutlineSlack } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { BsStars } from "react-icons/bs";
import Markdown from "react-markdown";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IoIosSend, IoMdClose } from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { marked } from "marked";
import { cn } from "@/lib/utils";
import Groq from "groq-sdk";

const MenuAiPrompt = ({ editor }) => {
  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [aiPrompt, setAiPrompt] = useState("");

  const [aiResponse, setAiResponse] = useState(``);

  const [isLoading, setIsLoading] = useState(false);

  const [isOpenAiResponOption, setIsOpenAiResponOption] = useState(
    !!aiPrompt || false
  );
  const [isOpenPopupAskAI, setIsOpenPopupAskAI] = useState(false);

  const getGrogChatyCompletion = async () => {
    setIsLoading(true);
    setAiPrompt("");

    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: aiPrompt }],
        model: "llama-3.3-70b-versatile",
      });
      setAiResponse(completion.choices[0].message.content);
    } catch (error) {
      console.log("🚀 ~ getGrogChatyCompletion ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsertText = () => {
    if (editor && aiResponse) {
      editor.commands.insertCustomText(marked.parse(aiResponse));
      setAiResponse("");
    }
  };

  return (
    <Popover open={isOpenPopupAskAI} onOpenChange={setIsOpenPopupAskAI}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant={isOpenPopupAskAI ? "" : "ghost"}
                className={cn(
                  isOpenPopupAskAI && "bg-indigo-500 hover:bg-indigo-500"
                )}
              >
                <AiOutlineSlack className="size-4" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ask AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent side="right" className="w-[350px]">
        <div className="">
          {isLoading && <Loader2 className="animate-spin my-2" />}
          {aiResponse && (
            <>
              <div className="text-xs w-fit border border-indigo-500 text-indigo-600 rounded-lg p-1 flex ">
                AI Response <BsStars className="ml-0.5" />
              </div>

              <div className="my-1 max-h-[300px] overflow-y-auto text-sm border p-1.5 rounded-lg bg-muted  break-words  whitespace-pre-wrap">
                <Markdown>{aiResponse}</Markdown>
              </div>

              <div className="flex justify-end">
                <DropdownMenu
                  open={isOpenAiResponOption}
                  onOpenChange={setIsOpenAiResponOption}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 mb-1   "
                    >
                      <IoEllipsisHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={handleInsertText}
                      className="cursor-pointer"
                    >
                      <MdOutlineTransitEnterexit /> Insert To Editor
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setAiResponse("")}
                      className="cursor-pointer"
                    >
                      <IoMdClose />
                      Clear/ Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>

        <div className="w-full border rounded-lg">
          <div className="flex items-end  justify-between">
            <div className="w-full">
              <Textarea
                className="shadow-none border-none focus:outline-none focus:ring-0 focus:!ring-transparent focus:shadow-none focus:!border-none resize-none"
                placeholder="Ask AI about your title, description and etc..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
            </div>

            <div className=" mx-1  ">
              <Button
                disabled={!aiPrompt}
                onClick={getGrogChatyCompletion}
                variant="ghost"
                size="icon"
                className="w-6 h-6  "
              >
                <IoIosSend />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MenuAiPrompt;
