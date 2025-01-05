"use client";

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
} from "@/components/prismui/popover";

export default function PopoverBasic() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <PopoverRoot>
        <PopoverTrigger>Add Note</PopoverTrigger>
        <PopoverContent className="h-[200px] w-[364px]">
          <PopoverForm
            onSubmit={(note) => console.log("Note submitted:", note)}
          >
            <PopoverLabel>Add Note</PopoverLabel>
            <PopoverTextarea />
            <PopoverFooter>
              <PopoverCloseButton />
              <PopoverSubmitButton>Submit Note</PopoverSubmitButton>
            </PopoverFooter>
          </PopoverForm>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}

export const demoSource = `"use client";

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
} from "@/components/prismui/popover";

export default function PopoverBasic() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <PopoverRoot>
        <PopoverTrigger>Add Note</PopoverTrigger>
        <PopoverContent className="h-[200px] w-[364px]">
          <PopoverForm onSubmit={(note) => console.log("Note submitted:", note)}>
            <PopoverLabel>Add Note</PopoverLabel>
            <PopoverTextarea />
            <PopoverFooter>
              <PopoverCloseButton />
              <PopoverSubmitButton>Submit Note</PopoverSubmitButton>
            </PopoverFooter>
          </PopoverForm>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}`;
