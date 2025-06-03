import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TbAlignCenter, TbAlignRight, TbAlignLeft } from "react-icons/tb";

const options = [
  { value: "text-left", icon: <TbAlignLeft /> },
  { value: "text-center", icon: <TbAlignCenter /> },
  { value: "text-right", icon: <TbAlignRight /> },
];

const optionsFlex = [
  { value: "justify-start", icon: <TbAlignLeft /> },
  { value: "justify-center", icon: <TbAlignCenter /> },
  { value: "justify-end", icon: <TbAlignRight /> },
];

const SelectTextAligment = ({
  asChild,
  label = "Alignment",
  value,
  onChange,
  isFlex = false,
}) => {
  const listToRender = isFlex ? optionsFlex : options;

  return (
    <div className="flex justify-between items-center">
      <Label className={`${asChild && "font-normal"}`}>{label}</Label>
      <div className="flex items-center gap-x-2">
        {listToRender.map((item) => (
          <Button
            key={item.value}
            onClick={() => {
              onChange(item.value);
            }}
            variant={item.value === value ? "" : "outline"}
            size="sm"
          >
            {item.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectTextAligment;
