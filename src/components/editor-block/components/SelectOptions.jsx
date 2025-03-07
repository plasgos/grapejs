import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

const SelectOptions = ({ asChild, label, options, value, onChange }) => {
  // Cek apakah `options` memiliki `label` (menandakan grouping)
  const isGrouped = options.some((opt) => opt.options);

  return (
    <div className="space-y-2 w-full">
      <Label className={`${asChild && "font-normal"}`}>{label}</Label>

      <Select value={value} onValueChange={(value) => onChange(value)}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {isGrouped
            ? options.map((group) => (
                <SelectGroup key={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))
            : options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;
