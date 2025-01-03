"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/prismui/button-group";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Grid,
  List,
  RotateCcw,
  Save,
  Trash,
} from "lucide-react";

export default function ButtonGroupDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-3xl space-y-8 p-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Default Size</h4>
          <ButtonGroup>
            <Button>Copy</Button>
            <Button>Save</Button>
            <Button>Delete</Button>
          </ButtonGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Small Size with Icons</h4>
          <ButtonGroup size="sm">
            <Button variant="outline">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </ButtonGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Large Size with Separation</h4>
          <ButtonGroup size="lg" separated>
            <Button variant="secondary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button variant="secondary">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Icon Only</h4>
          <ButtonGroup size="icon">
            <Button variant="outline">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  );
}

export const demoSource = `"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/prismui/button-group";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Grid,
  List,
  RotateCcw,
  Save,
  Trash,
} from "lucide-react";

export default function ButtonGroupDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <Card className="w-full max-w-3xl space-y-8 p-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Default Size</h4>
          <ButtonGroup>
            <Button>Copy</Button>
            <Button>Save</Button>
            <Button>Delete</Button>
          </ButtonGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Small Size with Icons</h4>
          <ButtonGroup size="sm">
            <Button variant="outline">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </ButtonGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Large Size with Separation</h4>
          <ButtonGroup size="lg" separated>
            <Button variant="secondary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button variant="secondary">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Icon Only</h4>
          <ButtonGroup size="icon">
            <Button variant="outline">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  );
}`;
