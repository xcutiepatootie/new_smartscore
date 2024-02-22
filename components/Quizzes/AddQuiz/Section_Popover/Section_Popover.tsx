import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SectionPopoverProps {
  control: any;
  studentSection: any;
  defaultValue?: any;
}

const Section_Popover: React.FC<SectionPopoverProps> = ({
  control,
  studentSection,
  defaultValue,
}: any) => {
  console.log(defaultValue);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Select Sections</Button>
        </PopoverTrigger>
        <PopoverContent>
          {studentSection.map((section: any, index: number) => {
            const isChecked =
              defaultValue && defaultValue.includes(section.section);
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  {...control.register(`selectedSections`)}
                  value={section.section}
                  defaultChecked={isChecked}
                />
                <label>{section.section}</label>
              </div>
            );
          })}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Section_Popover;
