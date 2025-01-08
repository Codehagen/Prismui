"use client"

import {
  Check,
  ChevronRight,
  Clipboard,
  File,
  Folder,
  Monitor,
  Smartphone,
  SquareArrowOutUpRight,
  Tablet,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

import { OpenInV0Form } from "@/components/open-in-v0-form"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { FileTree } from "@/lib/registry/registry"
import { getTemplateForDisplay } from "@/lib/templates"

type TemplateViewerContext = {
  template: NonNullable<Awaited<ReturnType<typeof getTemplateForDisplay>>>
  view: "code" | "preview"
  setView: (view: "code" | "preview") => void
  activeFile: string | null
  setActiveFile: (file: string) => void
  resizablePanelRef: React.RefObject<ImperativePanelHandle | null>
}

const TemplateViewerContext = React.createContext<TemplateViewerContext | null>(
  null
)

function useTemplateViewer() {
  const context = React.useContext(TemplateViewerContext)
  if (!context) {
    throw new Error(
      "useTemplateViewer must be used within a TemplateViewerProvider."
    )
  }
  return context
}

function TemplateViewerProvider({
  template,
  children,
}: Pick<TemplateViewerContext, "template"> & {
  children: React.ReactNode
}) {
  const [view, setView] =
    React.useState<TemplateViewerContext["view"]>("preview")

  const [activeFile, setActiveFile] = React.useState<
    TemplateViewerContext["activeFile"]
  >(template.meta.highlightedFiles[0].target ?? null)
  const resizablePanelRef = React.useRef<ImperativePanelHandle>(null)

  return (
    <TemplateViewerContext.Provider
      value={{
        template,
        view,
        setView,
        resizablePanelRef,
        activeFile,
        setActiveFile,
      }}
    >
      <div
        className="group/template-view-wrapper scroll-mt-12 flex min-w-0 flex-col items-stretch gap-4"
        data-view={view}
        id={template.name}
        style={
          {
            "--height": template.meta.iframeHeight,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </TemplateViewerContext.Provider>
  )
}

function TemplateViewerToolbar() {
  const { setView, view, template, resizablePanelRef } = useTemplateViewer()

  return (
    <div className="flex w-full items-center gap-2 md:pr-[14px]">
      <Tabs
        className="hidden lg:flex"
        defaultValue="preview"
        onValueChange={(value) => setView(value as "preview" | "code")}
      >
        <TabsList className="h-7 items-center rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)]">
          <TabsTrigger
            className="h-[1.45rem] rounded-sm px-2 text-xs"
            value="preview"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            className="h-[1.45rem] rounded-sm px-2 text-xs"
            value="code"
          >
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator className="mx-2 hidden h-4 lg:flex" orientation="vertical" />
      <a
        className="text-sm font-medium underline-offset-2 hover:underline"
        href={`#${template.name}`}
      >
        {template.name}
      </a>
      <Separator className="mx-2 hidden h-4 lg:flex" orientation="vertical" />
      <div className="text-muted-foreground line-clamp-1 text-sm">
        {template.title || "Untitled"}
      </div>
      <ToggleGroup
        className="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex ml-auto"
        defaultValue="100"
        disabled={view === "code"}
        onValueChange={(value) => {
          if (resizablePanelRef?.current) {
            resizablePanelRef.current.resize(parseInt(value))
          }
        }}
        type="single"
      >
        <ToggleGroupItem
          className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
          title="Desktop"
          value="100"
        >
          <Monitor className="size-3" />
        </ToggleGroupItem>
        <Separator className="h-4" orientation="vertical" />
        <ToggleGroupItem
          className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
          title="Tablet"
          value="60"
        >
          <Tablet className="size-3" />
        </ToggleGroupItem>
        <Separator className="h-4" orientation="vertical" />
        <ToggleGroupItem
          className="h-[22px] w-[22px] min-w-0 rounded-sm p-0"
          title="Mobile"
          value="30"
        >
          <Smartphone className="size-3" />
        </ToggleGroupItem>
        <Separator className="h-4" orientation="vertical" />
        <Button
          asChild
          className="h-[22px] w-[22px] rounded-sm p-0"
          size="icon"
          title="Open in New Tab"
          variant="ghost"
        >
          <Link
            href={template.meta.path}
            target="_blank"
            title="Open in New Tab"
          >
            <span className="sr-only">Open in New Tab</span>
            <SquareArrowOutUpRight className="size-3" />
          </Link>
        </Button>
      </ToggleGroup>
      <Separator className="mx-2 hidden h-4 xl:flex" orientation="vertical" />
      <OpenInV0Form name={template.name} />
    </div>
  )
}

function TemplateViewerView() {
  const { template, resizablePanelRef } = useTemplateViewer()

  return (
    <div className="after:bg-muted/40 relative h-[--height] after:absolute after:inset-y-0 after:left-0 after:right-4 after:z-0 after:rounded-xl group-data-[view=code]/template-view-wrapper:hidden">
      <div className="relative z-10 grid w-full gap-4 h-full">
        <ResizablePanelGroup className="relative z-10" direction="horizontal">
          <ResizablePanel
            className="bg-background relative aspect-[4/2.5] rounded-xl border md:aspect-auto"
            defaultSize={100}
            minSize={30}
            ref={resizablePanelRef}
          >
            <iframe
              className="bg-background relative z-20 w-full"
              height={template.meta.iframeHeight}
              src={template.meta.path}
            />
          </ResizablePanel>
          <ResizableHandle className="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:transition-all after:hover:h-10 md:block" />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function TemplateViewerCode() {
  const { activeFile, template } = useTemplateViewer()

  const file = React.useMemo(() => {
    const found = template.meta.highlightedFiles.find(
      (file) => file.target === activeFile
    )

    if (!found) {
      return template.meta.highlightedFiles[0]
    }

    return found
  }, [template.meta.highlightedFiles, activeFile])

  if (!file) {
    return null
  }

  return (
    <div className="mr-[14px] flex h-[--height] overflow-hidden rounded-xl bg-zinc-950 text-white group-data-[view=preview]/template-view-wrapper:hidden">
      <div className="w-[280px]">
        <TemplateViewerFileTree />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-4 text-sm font-medium">
          <File className="size-4" />
          {file.target}
          <div className="ml-auto flex items-center gap-2">
            <TemplateCopyCodeButton />
          </div>
        </div>
        <div
          className="relative flex-1 overflow-hidden after:absolute after:inset-y-0 after:left-0 after:w-10 after:bg-zinc-950 [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:h-[--height] [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-20 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: file.highlightedContent }}
          data-rehype-pretty-code-fragment
          key={file.path}
        />
      </div>
    </div>
  )
}

export function TemplateViewerFileTree() {
  const { template } = useTemplateViewer()
  return (
    <SidebarProvider className="flex !min-h-full flex-col">
      <Sidebar
        className="w-full flex-1 border-r border-zinc-700 bg-zinc-900 text-white"
        collapsible="none"
      >
        <SidebarGroupLabel className="h-12 rounded-none border-b border-zinc-700 px-4 text-sm text-white">
          Files
        </SidebarGroupLabel>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {template.meta.tree.map((file, index) => (
                <Tree index={1} item={file} key={index} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  )
}

function Tree({ item, index }: { item: FileTree; index: number }) {
  const { activeFile, setActiveFile } = useTemplateViewer()

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          className="whitespace-nowrap rounded-none pl-[--index] hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white"
          data-index={index}
          isActive={item.path === activeFile}
          onClick={() => item.path && setActiveFile(item.path)}
          style={
            {
              "--index": `${index * (index === 2 ? 1.2 : 1.3)}rem`,
            } as React.CSSProperties
          }
        >
          <ChevronRight className="invisible" />
          <File className="h-4 w-4" />
          {item.name}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            className="whitespace-nowrap rounded-none pl-[--index] hover:bg-zinc-700 hover:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white data-[state=open]:hover:bg-zinc-700 data-[state=open]:hover:text-white"
            style={
              {
                "--index": `${index * (index === 1 ? 1 : 1.2)}rem`,
              } as React.CSSProperties
            }
          >
            <ChevronRight className="h-4 w-4 transition-transform" />
            <Folder className="h-4 w-4" />
            {item.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="m-0 w-full border-none p-0">
            {item.children.map((subItem, key) => (
              <Tree index={index + 1} item={subItem} key={key} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

function TemplateCopyCodeButton() {
  const { activeFile, template: item } = useTemplateViewer()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const file = React.useMemo(() => {
    return item.files.find((file) => file.target === activeFile)
  }, [activeFile, item.files])

  const content = file?.content

  if (!content) {
    return null
  }

  return (
    <Button
      className="h-7 w-7 shrink-0 rounded-lg p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3"
      onClick={() => {
        copyToClipboard(content)
      }}
      variant="ghost"
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  )
}

function TemplateViewer({
  template,
  ...props
}: Pick<TemplateViewerContext, "template">) {
  return (
    <TemplateViewerProvider template={template} {...props}>
      <TemplateViewerToolbar />
      <TemplateViewerView />
      <TemplateViewerCode />
    </TemplateViewerProvider>
  )
}

export { TemplateViewer }
