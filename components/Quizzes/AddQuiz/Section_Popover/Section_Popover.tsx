import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Section_Popover = ({ control, studentSection }: any) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Select Sections</Button>
        </PopoverTrigger>
        <PopoverContent>
          {studentSection.map((section: any, index: number) => (
            <div key={index}>
              <input
                type="checkbox"
                {...control.register(`selectedSections`)}
                value={section.section}
              />
              <label>{section.section}</label>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Section_Popover;
