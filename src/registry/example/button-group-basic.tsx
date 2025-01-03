"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/prismui/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ButtonGroupBasic() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <ButtonGroup>
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export const demoSource = `"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/prismui/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ButtonGroupBasic() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <ButtonGroup>
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </ButtonGroup>
    </div>
  );
}`;
