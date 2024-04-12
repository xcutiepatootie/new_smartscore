import {
  sections_CAS,
  sections_CCS,
  sections_SHS,
} from "@/components/Forms/Section_Component/sections";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";

const Section_Popover = ({ control }: any) => {
  const { data: session, status } = useSession();

  const department = session?.user.department;
  console.log(department);

  let setSection: { value: string }[] = [];
  if (status === "authenticated") {
    switch (department) {
      case "College of Computer Studies":
        setSection = sections_CCS;
        break;
      case "College of Arts and Science":
        setSection = sections_CAS;
        break;
      case "Senior High School":
        setSection = sections_SHS;
        break;
    }
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>

        <PopoverContent>
          
          <ScrollArea className="h-[500px]">
            <input
              {...control.register(`sectionAssigned`)}
              type="checkbox"
              className="hidden"
              value="--"
            />
            {status === "authenticated" && (
              <>
                {setSection.map((section: any, index: number) => (
                  <div key={index} className="space-x-2">
                    <input
                      type="checkbox"
                      name="sectionAssigned"
                      id={`sectionAssigned_${index}`}
                      {...control.register(`sectionAssigned`)}
                      value={section.value}
                    />
                    <label htmlFor={`sectionAssigned_${index}`}>
                      {section.value}
                    </label>
                  </div>
                ))} 
              </>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Section_Popover;
