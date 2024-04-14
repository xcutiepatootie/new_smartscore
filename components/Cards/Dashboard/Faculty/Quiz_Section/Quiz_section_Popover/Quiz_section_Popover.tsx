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

const Quiz_section_Popover = ({ quizzes, setSelectedQuiz }: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log(value);

  const handleSelectQuiz = (currentValue: SetStateAction<string>) => {
    const newValue = currentValue === value ? "" : currentValue;
    console.log(newValue);

    setValue(newValue);
    setOpen(false);
    setSelectedQuiz(newValue);
  };

  // Map over quizzes to transform them into the desired format
  const transformedQuizzes = quizzes.map((quiz: any) => {
    // For each quiz, create an object with id as value and quizName as label
    const quizObject = {
      value: quiz.quizName.toLowerCase(),
      label: quiz.quizName,
      quizId: quiz.id,
    };

    // For each sectionAssigned, create an object with the section as value and label
    const sectionObjects = quiz.sectionAssigned.map((section: any) => ({
      value: section,
      label: section,
    }));

    // Concatenate quizObject and sectionObjects into a single array
    return [quizObject];
  });

  // Flatten the array of arrays into a single array
  const flattenedQuizzes = transformedQuizzes.flat();
  console.log(flattenedQuizzes);

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
            <RxCaretSort className="h-4 w-4 shrink-0 opacity-50" />
            <span className="max-w-[250px] text-ellipsis">
              {" "}
              {/* Example max width */}
              {value
                ? flattenedQuizzes.find((quiz: any) => quiz.value === value)
                    ?.label
                : "Select Quiz..."}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Quiz..." className="h-9" />
            <CommandEmpty>No Quiz found.</CommandEmpty>
            <CommandGroup>
              {flattenedQuizzes.map((quiz: any) => (
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
};

export default Quiz_section_Popover;
