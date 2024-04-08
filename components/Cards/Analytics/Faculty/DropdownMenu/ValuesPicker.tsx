import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { SetStateAction, useState } from "react";
import { xy_values } from "./Attribute_Values/attributes";

const ValuesPicker = ({
  setSelectedValue,
  defaultValue,
}: {
  defaultValue: string;
  setSelectedValue: (value: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);

  const handleSelectValue = (currentValue: SetStateAction<string>) => {
    const newValue = currentValue === value ? "" : currentValue;

    setValue(newValue);
    setOpen(false);
    setSelectedValue(newValue as string);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
        >
          {value
            ? xy_values.find((dMethod) => dMethod.value === value)?.label
            : "Select Attribute..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {xy_values.map((dMethod) => (
              <CommandItem
                key={dMethod.value}
                value={dMethod.value}
                onSelect={handleSelectValue}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === dMethod.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {dMethod.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ValuesPicker;
