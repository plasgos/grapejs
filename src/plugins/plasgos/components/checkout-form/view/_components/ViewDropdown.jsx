import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { useState } from "react";
import { Button } from "@/components/ui/button";
const ViewDropdown = ({ content, index }) => {
  const [open, setOpen] = useState(false);

  const { control } = useFormContext();

  return (
    <div>
      <FormField
        control={control}
        name={`customFields[${index}].value`}
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className="font-normal mt-2">
              {content.labelField ? content.labelField : ""}
            </FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={` justify-between max-w-full`}
                    style={{
                      width: content.width,
                    }}
                  >
                    {field.value
                      ? content.options.find(
                          (option) => option.value === field.value
                        )?.label
                      : `${
                          content?.placeholder
                            ? content?.placeholder
                            : "Select Options"
                        }`}
                    <ChevronDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  style={{
                    width: content.width,
                  }}
                  className={`max-w-full  p-0`}
                >
                  <Command>
                    <CommandInput
                      placeholder={`${
                        content?.searchPlaceholder
                          ? content?.searchPlaceholder
                          : "Search options..."
                      }`}
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>Not found.</CommandEmpty>
                      <CommandGroup>
                        {content.options.map((option) => (
                          <CommandItem
                            key={option.id}
                            value={option.value}
                            onSelect={(currentValue) => {
                              field.onChange(currentValue);
                              setOpen(false);
                            }}
                          >
                            {option.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ViewDropdown;
