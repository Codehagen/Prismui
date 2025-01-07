import { z } from "zod";
import { registryEntrySchema } from "@/registry/schema";
import { getRegistryItem } from "@/registry";

export type Template = z.infer<typeof registryEntrySchema>;

export async function getTemplate(name: string) {
  const template = await getRegistryItem(name);

  if (!template) {
    return null;
  }

  // Create a new object without the component property
  const { component, ...templateWithoutComponent } = template;

  return templateWithoutComponent;
}

export async function getTemplateComponent(name: string) {
  const template = await getRegistryItem(name);

  if (!template) {
    return null;
  }

  return template.component;
}
