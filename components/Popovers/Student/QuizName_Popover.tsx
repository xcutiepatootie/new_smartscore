"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, CheckIcon } from "lucide-react";
import { RxCaretSort } from "react-icons/rx";

import { SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";

const testData = [
  {
    value: "test1",
    label: "Test1",
  },
  {
    value: "test2",
    label: "Test2",
  },
  {
    value: "test3",
    label: "Test3",
  },
  {
    value: "test4",
    label: "Test4",
  },
];

export default function QuizName_Popover({
  popoverValues,
  setSelectedQuiz,
}: {
  popoverValues: { value: string; label: string }[];
  setSelectedQuiz: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelectQuiz = (currentValue: SetStateAction<string>) => {
    const newValue = currentValue === value ? "" : currentValue;
    console.log(newValue);

    setValue(newValue);
    setOpen(false);
    setSelectedQuiz(newValue);
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-start overflow-hidden"
          >
            <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            <span className="inline-block w-[290px] overflow-hidden text-ellipsis whitespace-nowrap">
              {value
                ? popoverValues.find((quiz: any) => quiz.value === value)?.label
                : "Select Quiz..."}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Quiz..." className="h-9" />
            <CommandEmpty>No Quiz found.</CommandEmpty>
            <CommandGroup>
              {popoverValues.map((quiz: any) => (
                <CommandItem
                  key={quiz.value}
                  value={quiz.value}
                  onSelect={handleSelectQuiz}
                >
                  {quiz.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === quiz.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
