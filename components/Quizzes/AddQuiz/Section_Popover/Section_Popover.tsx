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
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <input
            {...control.register(`sectionAssigned`)}
            type="checkbox"
            className="hidden"
            value="--"
          />
          {studentSection.map((section: any, index: number) => (
            <div key={index}>
              <input
                type="checkbox"
                {...control.register(`sectionAssigned`)}
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
