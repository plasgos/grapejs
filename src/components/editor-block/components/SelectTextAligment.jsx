import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TbAlignCenter, TbAlignRight, TbAlignLeft } from "react-icons/tb";

const options = [
  { value: "text-left", icon: <TbAlignLeft /> },
  { value: "text-center", icon: <TbAlignCenter /> },
  { value: "text-right", icon: <TbAlignRight /> },
];

const SelectTextAligment = ({ asChild, value, onChange }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Label className={`${asChild && "font-normal"}`}>Aligment</Label>
        <div className="flex items-center gap-x-2">
          {options.map((item) => (
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
    </div>
  );
};

export default SelectTextAligment;
