import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  10, 11, 12, 13, 14, 15, 16, 18, 20, 24, 32, 36, 40, 48, 64, 96, 128,
];

const SelectFontSize = ({ asChild, label, value, onChange }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {label && (
        <Label className={`${asChild && "font-normal"}`}>{label}</Label>
      )}

      <Select value={value} onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-[180px] bg-muted">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem className={opt} key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectFontSize;
