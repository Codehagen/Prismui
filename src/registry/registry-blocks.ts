import { type Registry } from "./schema";

    export const blocks = [
{
  "name": "action-button-template",
  "type": "registry:block",
  "title": "Action Button Template",
  "description": "A template for action-button-template",
  "files": [
    {
      "path": "action-button-template/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import ActionButton from \"./component/action-button\";
import { useState } from \"react\";

export default function ActionButtonPage() {
  const [isPending, setIsPending] = useState(false);

  const handleClick = () => {
    setIsPending(true);
    setTimeout(() => setIsPending(false), 2000); // Simulate loading
  };

  return (
    <div className=\"min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6\">
      <div className=\"text-center space-y-2\">
        <h1 className=\"text-3xl font-bold tracking-tight\">Action Button</h1>
        <p className=\"text-muted-foreground\">
          A button component with loading state and animations.
        </p>
      </div>

      <div className=\"flex flex-col items-center gap-4\">
        <ActionButton
          isPending={isPending}
          onClick={handleClick}
          variant=\"default\"
          size=\"lg\"
        >
          Click me
        </ActionButton>

        <ActionButton
          isPending={isPending}
          onClick={handleClick}
          variant=\"outline\"
          size=\"default\"
        >
          Submit Form
        </ActionButton>

        <ActionButton
          isPending={isPending}
          onClick={handleClick}
          variant=\"secondary\"
          size=\"sm\"
        >
          Save Changes
        </ActionButton>
      </div>
    </div>
  );
}",
      "target": "app/page.tsx"
    },
    {
      "path": "action-button-template/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Action Button Template\",
  description: \"A template showcasing the action button component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "action-button-template/app/component/action-button.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { LoaderCircle } from \"lucide-react\";
import { cn } from \"@/lib/utils\";
import { VariantProps } from \"class-variance-authority\";
import { Button } from \"@/components/ui/button\";
import { buttonVariants } from \"@/components/ui/button\";

interface props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isPending: boolean;
  onClick?: () => void;
}

export default function ActionButton({
  children,
  isPending,
  variant,
  size,
  className,
  onClick,
}: props) {
  return (
    <Button
      onClick={
        onClick
          ? (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      type=\"submit\"
      disabled={isPending}
      variant={variant}
      size={size}
      className={cn(
        className,
        \"inline-grid place-items-center [grid-template-areas:'stack']\"
      )}
    >
      <span
        className={cn(
          isPending && \"invisible\",
          \"flex items-center gap-2 [grid-area:stack]\"
        )}
      >
        {children}
      </span>
      <LoaderCircle
        aria-label=\"Submitting\"
        className={cn(
          isPending ? \"visible\" : \"invisible\",
          \"size-5 animate-spin transition-opacity [grid-area:stack]\"
        )}
      />
    </Button>
  );
}
",
      "target": "app/component/action-button.tsx"
    },
    {
      "path": "action-button-template/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "display-cards-template",
  "type": "registry:block",
  "title": "Display Cards Template",
  "description": "A template for display-cards-template",
  "files": [
    {
      "path": "display-cards-template/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { Sparkles } from \"lucide-react\";
import DisplayCards from \"./component/display-cards\";

export default function DisplayCardsPage() {
  return (
    <div className=\"min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6\">
      <div className=\"text-center space-y-2\">
        <h1 className=\"text-3xl font-bold tracking-tight\">Display Cards</h1>
        <p className=\"text-muted-foreground\">
          A collection of animated display cards with hover effects.
        </p>
      </div>

      <div className=\"w-full flex justify-center items-center pt-20\">
        <DisplayCards
          cards={[
            {
              icon: <Sparkles className=\"size-4 text-blue-300\" />,
              title: \"Featured\",
              description: \"Discover amazing content\",
              date: \"Just now\",
              iconClassName: \"text-blue-500\",
              titleClassName: \"text-blue-500\",
              className:
                \"[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0\",
            },
            {
              icon: <Sparkles className=\"size-4 text-blue-300\" />,
              title: \"Popular\",
              description: \"Trending this week\",
              date: \"2 days ago\",
              iconClassName: \"text-blue-500\",
              titleClassName: \"text-blue-500\",
              className:
                \"[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0\",
            },
            {
              icon: <Sparkles className=\"size-4 text-blue-300\" />,
              title: \"New\",
              description: \"Latest updates and features\",
              date: \"Today\",
              iconClassName: \"text-blue-500\",
              titleClassName: \"text-blue-500\",
              className:
                \"[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10\",
            },
          ]}
        />
      </div>
    </div>
  );
}
",
      "target": "app/page.tsx"
    },
    {
      "path": "display-cards-template/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Display Cards Template\",
  description: \"A template showcasing the display cards component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "display-cards-template/app/component/display-cards.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { cn } from \"@/lib/utils\";
import { Sparkles } from \"lucide-react\";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className=\"size-4 text-blue-300\" />,
  title = \"Featured\",
  description = \"Discover amazing content\",
  date = \"Just now\",
  iconClassName = \"text-blue-500\",
  titleClassName = \"text-blue-500\",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        \"relative flex h-44 w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-6 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2\",
        className
      )}
    >
      <div>
        <span className=\"relative inline-block rounded-full bg-blue-800 p-1.5\">
          {icon}
        </span>
        <p className={cn(\"text-lg font-medium\", titleClassName)}>{title}</p>
      </div>
      <p className=\"whitespace-nowrap text-lg\">{description}</p>
      <p className=\"text-muted-foreground\">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      icon: <Sparkles className=\"size-4 text-blue-300\" />,
      title: \"Featured\",
      description: \"Discover amazing content\",
      date: \"Just now\",
      iconClassName: \"text-blue-500\",
      titleClassName: \"text-blue-500\",
      className:
        \"[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0\",
    },
    {
      icon: <Sparkles className=\"size-4 text-blue-300\" />,
      title: \"Popular\",
      description: \"Trending this week\",
      date: \"2 days ago\",
      iconClassName: \"text-blue-500\",
      titleClassName: \"text-blue-500\",
      className:
        \"[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0\",
    },
    {
      icon: <Sparkles className=\"size-4 text-blue-300\" />,
      title: \"New\",
      description: \"Latest updates and features\",
      date: \"Today\",
      iconClassName: \"text-blue-500\",
      titleClassName: \"text-blue-500\",
      className:
        \"[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10\",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className=\"grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 -ml-12\">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
",
      "target": "app/component/display-cards.tsx"
    },
    {
      "path": "display-cards-template/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "expandable-card-template",
  "type": "registry:block",
  "title": "Expandable Card Template",
  "description": "A template for expandable-card-template",
  "files": [
    {
      "path": "expandable-card-template/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { ProjectStatusCard } from \"./component/expandable-card\";

export default function ExpandableCardPage() {
  return (
    <div className=\"min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6\">
      <div className=\"text-center space-y-2\">
        <h1 className=\"text-3xl font-bold tracking-tight\">
          Project Status Card
        </h1>
        <p className=\"text-muted-foreground\">
          An expandable card component for displaying project information.
        </p>
      </div>

      <div className=\"w-full max-w-md\">
        <ProjectStatusCard
          title=\"Project 1\"
          progress={50}
          dueDate=\"2025-01-01\"
          contributors={[
            { name: \"John Doe\", image: \"/placeholder.svg\" },
            { name: \"Jane Smith\", image: \"/placeholder.svg\" },
          ]}
          tasks={[
            { title: \"Setup project structure\", completed: true },
            { title: \"Implement core features\", completed: false },
            { title: \"Write documentation\", completed: false },
          ]}
          githubStars={100}
          openIssues={5}
        />
      </div>
    </div>
  );
}
",
      "target": "app/page.tsx"
    },
    {
      "path": "expandable-card-template/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Expandable Card Template\",
  description: \"A template showcasing the expandable card component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "expandable-card-template/app/component/expandable-card.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import React, { useRef, useEffect } from \"react\";
import { motion, AnimatePresence } from \"framer-motion\";
import {
  Clock,
  GitBranch,
  Github,
  MessageSquare,
  StepForwardIcon as Progress,
  Star,
  Users,
  CheckCircle2,
} from \"lucide-react\";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from \"@/components/ui/card\";
import { Badge } from \"@/components/ui/badge\";
import { Button } from \"@/components/ui/button\";
import { Avatar, AvatarFallback, AvatarImage } from \"@/components/ui/avatar\";
import { Progress as ProgressBar } from \"@/components/ui/progress\";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from \"@/components/ui/tooltip\";
import { useExpandable } from \"../hooks/use-expandable\";
interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  contributors: Array<{ name: string; image?: string }>;
  tasks: Array<{ title: string; completed: boolean }>;
  githubStars: number;
  openIssues: number;
}

export function ProjectStatusCard({
  title,
  progress,
  dueDate,
  contributors,
  tasks,
  githubStars,
  openIssues,
}: ProjectStatusCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  return (
    <Card
      className=\"w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg\"
      onClick={toggleExpand}
    >
      <CardHeader className=\"space-y-1\">
        <div className=\"flex justify-between items-start w-full\">
          <div className=\"space-y-2\">
            <Badge
              variant=\"secondary\"
              className={
                progress === 100
                  ? \"bg-green-100 text-green-600\"
                  : \"bg-blue-100 text-blue-600\"
              }
            >
              {progress === 100 ? \"Completed\" : \"In Progress\"}
            </Badge>
            <h3 className=\"text-2xl font-semibold\">{title}</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size=\"icon\" variant=\"outline\" className=\"h-8 w-8\">
                  <Github className=\"h-4 w-4\" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent>
        <div className=\"space-y-4\">
          <div className=\"space-y-2\">
            <div className=\"flex justify-between text-sm text-gray-600\">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} className=\"h-2\" />
          </div>

          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: \"spring\", stiffness: 300, damping: 30 }}
            className=\"overflow-hidden\"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=\"space-y-4 pt-2\"
                  >
                    <div className=\"flex items-center justify-between text-sm text-gray-600\">
                      <div className=\"flex items-center\">
                        <Clock className=\"h-4 w-4 mr-2\" />
                        <span>Due {dueDate}</span>
                      </div>
                      <div className=\"flex items-center gap-4\">
                        <div className=\"flex items-center\">
                          <Star className=\"h-4 w-4 mr-1 text-yellow-400\" />
                          <span>{githubStars}</span>
                        </div>
                        <div className=\"flex items-center\">
                          <GitBranch className=\"h-4 w-4 mr-1\" />
                          <span>{openIssues} issues</span>
                        </div>
                      </div>
                    </div>

                    <div className=\"space-y-2\">
                      <h4 className=\"font-medium text-sm flex items-center\">
                        <Users className=\"h-4 w-4 mr-2\" />
                        Contributors
                      </h4>
                      <div className=\"flex -space-x-2\">
                        {contributors.map((contributor, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className=\"border-2 border-white\">
                                  <AvatarImage
                                    src={
                                      contributor.image ||
                                      `/placeholder.svg?height=32&width=32&text=${contributor.name[0]}`
                                    }
                                    alt={contributor.name}
                                  />
                                  <AvatarFallback>
                                    {contributor.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{contributor.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>

                    <div className=\"space-y-2\">
                      <h4 className=\"font-medium text-sm\">Recent Tasks</h4>
                      {tasks.map((task, index) => (
                        <div
                          key={index}
                          className=\"flex items-center justify-between text-sm\"
                        >
                          <span className=\"text-gray-600\">{task.title}</span>
                          {task.completed && (
                            <CheckCircle2 className=\"h-4 w-4 text-green-500\" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className=\"space-y-2\">
                      <Button className=\"w-full\">
                        <MessageSquare className=\"h-4 w-4 mr-2\" />
                        View Discussion
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CardContent>

      <CardFooter>
        <div className=\"flex items-center justify-between w-full text-sm text-gray-600\">
          <span>Last updated: 2 hours ago</span>
          <span>{openIssues} open issues</span>
        </div>
      </CardFooter>
    </Card>
  );
}
",
      "target": "app/component/expandable-card.tsx"
    },
    {
      "path": "expandable-card-template/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    },
    {
      "path": "expandable-card-template/app/hooks/use-expandable.ts",
      "type": "registry:hook",
      "content": "import { useState, useCallback } from \"react\";
import { useSpring } from \"framer-motion\";

export function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);

  const springConfig = { stiffness: 300, damping: 30 };
  const animatedHeight = useSpring(0, springConfig);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return { isExpanded, toggleExpand, animatedHeight };
}
",
      "target": "app/hooks/use-expandable.ts"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "floating-action-panel-template",
  "type": "registry:block",
  "title": "Floating Action Panel Template",
  "description": "A template for floating-action-panel-template",
  "files": [
    {
      "path": "floating-action-panel-template/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import {
  FloatingActionPanelRoot,
  FloatingActionPanelTrigger,
  FloatingActionPanelContent,
  FloatingActionPanelButton,
} from \"./component/floating-action-panel\";
import { Plus, Upload, Palette, Share2, BookMarked } from \"lucide-react\";

export default function FloatingActionPanelPage() {
  return (
    <div className=\"min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6\">
      <div className=\"text-center space-y-2\">
        <h1 className=\"text-3xl font-bold tracking-tight\">
          Floating Action Panel
        </h1>
        <p className=\"text-muted-foreground\">
          A floating panel component for contextual actions and menus.
        </p>
      </div>

      <div className=\"w-full max-w-md flex justify-center\">
        <FloatingActionPanelRoot>
          {() => (
            <>
              <FloatingActionPanelTrigger title=\"Actions\" mode=\"actions\">
                <Plus className=\"mr-2 h-4 w-4\" />
                <span>Actions</span>
              </FloatingActionPanelTrigger>

              <FloatingActionPanelContent className=\"w-[200px] p-2\">
                <FloatingActionPanelButton>
                  <Upload className=\"h-4 w-4\" />
                  <span>Upload</span>
                </FloatingActionPanelButton>
                <FloatingActionPanelButton>
                  <Palette className=\"h-4 w-4\" />
                  <span>Theme</span>
                </FloatingActionPanelButton>
                <FloatingActionPanelButton>
                  <Share2 className=\"h-4 w-4\" />
                  <span>Share</span>
                </FloatingActionPanelButton>
                <FloatingActionPanelButton>
                  <BookMarked className=\"h-4 w-4\" />
                  <span>Bookmark</span>
                </FloatingActionPanelButton>
              </FloatingActionPanelContent>
            </>
          )}
        </FloatingActionPanelRoot>
      </div>
    </div>
  );
}
",
      "target": "app/page.tsx"
    },
    {
      "path": "floating-action-panel-template/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Floating Action Panel Template\",
  description: \"A template showcasing the floating action panel component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "floating-action-panel-template/app/component/floating-action-panel.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import * as React from \"react\";
import { AnimatePresence, MotionConfig, motion } from \"framer-motion\";
import {
  ArrowLeft,
  Plus,
  Upload,
  Palette,
  Share2,
  BookMarked,
  StickyNote,
} from \"lucide-react\";
import { cn } from \"@/lib/utils\";

const TRANSITION = {
  type: \"spring\",
  bounce: 0.1,
  duration: 0.4,
};

interface FloatingActionPanelContextType {
  isOpen: boolean;
  openPanel: (rect: DOMRect, mode: \"actions\" | \"note\") => void;
  closePanel: () => void;
  uniqueId: string;
  triggerRect: DOMRect | null;
  title: string;
  setTitle: (title: string) => void;
  note: string;
  setNote: (note: string) => void;
  mode: \"actions\" | \"note\";
}

const FloatingActionPanelContext = React.createContext<
  FloatingActionPanelContextType | undefined
>(undefined);

const useFloatingActionPanel = () => {
  const context = React.useContext(FloatingActionPanelContext);
  if (!context) {
    throw new Error(
      \"useFloatingActionPanel must be used within a FloatingActionPanelProvider\"
    );
  }
  return context;
};

function useFloatingActionPanelLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [title, setTitle] = React.useState(\"\");
  const [note, setNote] = React.useState(\"\");
  const [mode, setMode] = React.useState<\"actions\" | \"note\">(\"actions\");

  const openPanel = (rect: DOMRect, newMode: \"actions\" | \"note\") => {
    setTriggerRect(rect);
    setMode(newMode);
    setIsOpen(true);
  };
  const closePanel = () => {
    setIsOpen(false);
    setNote(\"\");
  };

  return {
    isOpen,
    openPanel,
    closePanel,
    uniqueId,
    triggerRect,
    title,
    setTitle,
    note,
    setNote,
    mode,
  };
}

interface FloatingActionPanelRootProps {
  children: (context: FloatingActionPanelContextType) => React.ReactNode;
  className?: string;
}

const FloatingActionPanelRoot = React.forwardRef<
  HTMLDivElement,
  FloatingActionPanelRootProps
>(({ children, className }, ref) => {
  const floatingPanelLogic = useFloatingActionPanelLogic();

  return (
    <FloatingActionPanelContext.Provider value={floatingPanelLogic}>
      <MotionConfig transition={TRANSITION}>
        <div ref={ref} className={cn(\"relative\", className)}>
          {children(floatingPanelLogic)}
        </div>
      </MotionConfig>
    </FloatingActionPanelContext.Provider>
  );
});
FloatingActionPanelRoot.displayName = \"FloatingActionPanelRoot\";

interface FloatingActionPanelTriggerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  mode: \"actions\" | \"note\";
}

const FloatingActionPanelTrigger = React.forwardRef<
  HTMLButtonElement,
  FloatingActionPanelTriggerProps
>(({ children, className, title, mode }, ref) => {
  const { openPanel, uniqueId, setTitle } = useFloatingActionPanel();
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (triggerRef.current) {
      openPanel(triggerRef.current.getBoundingClientRect(), mode);
      setTitle(title);
    }
  };

  return (
    <motion.button
      ref={triggerRef}
      layoutId={`floating-panel-trigger-${uniqueId}-${mode}`}
      className={cn(
        \"flex h-9 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800\",
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
});
FloatingActionPanelTrigger.displayName = \"FloatingActionPanelTrigger\";

interface FloatingActionPanelContentProps {
  children?: React.ReactNode;
  className?: string;
}

const FloatingActionPanelContent = React.forwardRef<
  HTMLDivElement,
  FloatingActionPanelContentProps
>(({ children, className }, ref) => {
  const { isOpen, closePanel, uniqueId, triggerRect, title, mode } =
    useFloatingActionPanel();
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closePanel();
      }
    };
    document.addEventListener(\"mousedown\", handleClickOutside);
    return () => document.removeEventListener(\"mousedown\", handleClickOutside);
  }, [closePanel]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === \"Escape\") closePanel();
    };
    document.addEventListener(\"keydown\", handleKeyDown);
    return () => document.removeEventListener(\"keydown\", handleKeyDown);
  }, [closePanel]);

  const getPosition = () => {
    if (!triggerRect) return { left: \"50%\", top: \"50%\" };

    // Get scroll position
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Calculate position
    const left = triggerRect.left + scrollX;
    const top = triggerRect.bottom + scrollY + 8; // 8px gap

    return {
      position: \"absolute\" as const,
      left: 0,
      top: 0,
      transform: `translate3d(${left}px, ${top}px, 0)`,
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className=\"relative\">
          <motion.div
            initial={{ backdropFilter: \"blur(0px)\" }}
            animate={{ backdropFilter: \"blur(4px)\" }}
            exit={{ backdropFilter: \"blur(0px)\" }}
            className=\"fixed inset-0 z-40 bg-black/5\"
          />
          <motion.div
            ref={contentRef}
            layoutId={`floating-panel-${uniqueId}-${mode}`}
            className={cn(
              \"absolute z-50 min-w-[200px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg outline-none dark:border-zinc-800 dark:bg-zinc-950\",
              className
            )}
            style={getPosition()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className=\"px-4 py-3 font-medium\">{title}</div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
FloatingActionPanelContent.displayName = \"FloatingActionPanelContent\";

interface FloatingActionPanelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const FloatingActionPanelButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionPanelButtonProps
>(({ children, onClick, className }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        \"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800\",
        className
      )}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
});
FloatingActionPanelButton.displayName = \"FloatingActionPanelButton\";

interface FloatingActionPanelFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

const FloatingActionPanelForm = React.forwardRef<
  HTMLFormElement,
  FloatingActionPanelFormProps
>(({ children, onSubmit, className }, ref) => {
  const { note, closePanel } = useFloatingActionPanel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closePanel();
  };

  return (
    <form
      ref={ref}
      className={cn(\"flex h-full flex-col\", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
});
FloatingActionPanelForm.displayName = \"FloatingActionPanelForm\";

interface FloatingActionPanelTextareaProps {
  className?: string;
  id?: string;
}

const FloatingActionPanelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingActionPanelTextareaProps
>(({ className, id }, ref) => {
  const { note, setNote } = useFloatingActionPanel();

  return (
    <textarea
      ref={ref}
      id={id}
      className={cn(
        \"h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none\",
        className
      )}
      autoFocus
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
});
FloatingActionPanelTextarea.displayName = \"FloatingActionPanelTextarea\";

export {
  FloatingActionPanelRoot,
  FloatingActionPanelTrigger,
  FloatingActionPanelContent,
  FloatingActionPanelButton,
  FloatingActionPanelForm,
  FloatingActionPanelTextarea,
  FloatingActionPanelContext,
};
",
      "target": "app/component/floating-action-panel.tsx"
    },
    {
      "path": "floating-action-panel-template/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "hero-badge-template",
  "type": "registry:block",
  "title": "Hero Badge Template",
  "description": "A template for hero-badge-template",
  "files": [
    {
      "path": "hero-badge-template/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { Github, ArrowRight } from \"lucide-react\";
import HeroBadge from \"./component/hero-badge\";

export default function HeroBadgePage() {
  return (
    <div className=\"min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6\">
      <div className=\"text-center space-y-2\">
        <h1 className=\"text-3xl font-bold tracking-tight\">Hero Badge</h1>
        <p className=\"text-muted-foreground\">
          A beautiful animated badge component for hero sections.
        </p>
      </div>

      <div className=\"flex flex-col items-center gap-4\">
        <HeroBadge
          href=\"#\"
          text=\"Star on GitHub\"
          icon={<Github className=\"h-4 w-4\" />}
          variant=\"default\"
          size=\"md\"
        />

        <HeroBadge
          href=\"#\"
          text=\"Get Started\"
          endIcon={<ArrowRight className=\"h-4 w-4\" />}
          variant=\"outline\"
          size=\"lg\"
        />

        <HeroBadge text=\"New Release\" variant=\"ghost\" size=\"sm\" />
      </div>
    </div>
  );
}
",
      "target": "app/page.tsx"
    },
    {
      "path": "hero-badge-template/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Hero Badge Template\",
  description: \"A template showcasing the hero badge component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "hero-badge-template/app/component/hero-badge.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { motion, useAnimation, type Variants } from \"framer-motion\";
import Link from \"next/link\";
import { cn } from \"@/lib/utils\";

const ease = [0.16, 1, 0.3, 1];

interface HeroBadgeProps {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: \"default\" | \"outline\" | \"ghost\";
  size?: \"sm\" | \"md\" | \"lg\";
  className?: string;
  onClick?: () => void;
}

const badgeVariants: Record<string, string> = {
  default: \"bg-background hover:bg-muted\",
  outline: \"border-2 hover:bg-muted\",
  ghost: \"hover:bg-muted/50\",
};

const sizeVariants: Record<string, string> = {
  sm: \"px-3 py-1 text-xs gap-1.5\",
  md: \"px-4 py-1.5 text-sm gap-2\",
  lg: \"px-5 py-2 text-base gap-2.5\",
};

const iconAnimationVariants: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: -10 },
};

export default function HeroBadge({
  href,
  text,
  icon,
  endIcon,
  variant = \"default\",
  size = \"md\",
  className,
  onClick,
}: HeroBadgeProps) {
  const controls = useAnimation();

  const BadgeWrapper = href ? Link : motion.button;
  const wrapperProps = href ? { href } : { onClick };

  const baseClassName = cn(
    \"inline-flex items-center rounded-full border transition-colors\",
    badgeVariants[variant],
    sizeVariants[size],
    className
  );

  return (
    <BadgeWrapper
      {...wrapperProps}
      className={cn(\"group\", href && \"cursor-pointer\")}
    >
      <motion.div
        className={baseClassName}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        onHoverStart={() => controls.start(\"hover\")}
        onHoverEnd={() => controls.start(\"initial\")}
      >
        {icon && (
          <motion.div
            className=\"text-foreground/60 transition-colors group-hover:text-primary\"
            variants={iconAnimationVariants}
            initial=\"initial\"
            animate={controls}
            transition={{ type: \"spring\", stiffness: 300, damping: 10 }}
          >
            {icon}
          </motion.div>
        )}
        <span>{text}</span>
        {endIcon && (
          <motion.div className=\"text-foreground/60\">{endIcon}</motion.div>
        )}
      </motion.div>
    </BadgeWrapper>
  );
}
",
      "target": "app/component/hero-badge.tsx"
    },
    {
      "path": "hero-badge-template/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "hero-template",
  "type": "registry:block",
  "title": "Hero Template",
  "description": "A template for hero-template",
  "files": [
    {
      "path": "hero-template/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { ArrowRight, ChevronRight, Component } from \"lucide-react\";
import Hero from \"./component/hero\";
import { ProjectStatusCard } from \"./component/expandable-card\";

export default function HeroPage() {
  return (
    <div className=\"min-h-screen w-full\">
      <Hero
        pill={{
          text: \"✨ New Components\",
          href: \"/docs\",
          endIcon: <ChevronRight className=\"h-4 w-4\" />,
        }}
        content={{
          title: \"Beautiful UI\",
          titleHighlight: \"Components\",
          description:
            \"A collection of beautiful and accessible UI components built with Tailwind CSS and Radix UI.\",
          primaryAction: {
            href: \"/docs\",
            text: \"Get Started\",
            icon: <ArrowRight className=\"h-4 w-4\" />,
          },
          secondaryAction: {
            href: \"/docs/components\",
            text: \"Components\",
            icon: <Component className=\"h-4 w-4\" />,
          },
        }}
        preview={
          <ProjectStatusCard
            title=\"Project Status\"
            progress={75}
            dueDate=\"2024-12-31\"
            contributors={[
              { name: \"John Doe\", image: \"/placeholder.svg\" },
              { name: \"Jane Smith\", image: \"/placeholder.svg\" },
              { name: \"Alex Johnson\", image: \"/placeholder.svg\" },
            ]}
            tasks={[
              { title: \"Design System\", completed: true },
              { title: \"Component Library\", completed: true },
              { title: \"Documentation\", completed: false },
            ]}
            githubStars={1234}
            openIssues={5}
          />
        }
      />
    </div>
  );
}
",
      "target": "app/page.tsx"
    },
    {
      "path": "hero-template/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Hero Template\",
  description: \"A template showcasing the hero component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "hero-template/app/component/expandable-card.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import React, { useRef, useEffect } from \"react\";
import { useState, useCallback } from \"react\";
import { useSpring } from \"framer-motion\";
import { motion, AnimatePresence } from \"framer-motion\";
import {
  Clock,
  GitBranch,
  Github,
  MessageSquare,
  StepForwardIcon as Progress,
  Star,
  Users,
  CheckCircle2,
} from \"lucide-react\";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from \"@/components/ui/card\";
import { Badge } from \"@/components/ui/badge\";
import { Button } from \"@/components/ui/button\";
import { Avatar, AvatarFallback, AvatarImage } from \"@/components/ui/avatar\";
import { Progress as ProgressBar } from \"@/components/ui/progress\";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from \"@/components/ui/tooltip\";
interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  contributors: Array<{ name: string; image?: string }>;
  tasks: Array<{ title: string; completed: boolean }>;
  githubStars: number;
  openIssues: number;
}

export function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);

  const springConfig = { stiffness: 300, damping: 30 };
  const animatedHeight = useSpring(0, springConfig);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return { isExpanded, toggleExpand, animatedHeight };
}

export function ProjectStatusCard({
  title,
  progress,
  dueDate,
  contributors,
  tasks,
  githubStars,
  openIssues,
}: ProjectStatusCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  return (
    <Card
      className=\"w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg\"
      onClick={toggleExpand}
    >
      <CardHeader className=\"space-y-1\">
        <div className=\"flex justify-between items-start w-full\">
          <div className=\"space-y-2\">
            <Badge
              variant=\"secondary\"
              className={
                progress === 100
                  ? \"bg-green-100 text-green-600\"
                  : \"bg-blue-100 text-blue-600\"
              }
            >
              {progress === 100 ? \"Completed\" : \"In Progress\"}
            </Badge>
            <h3 className=\"text-2xl font-semibold\">{title}</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size=\"icon\" variant=\"outline\" className=\"h-8 w-8\">
                  <Github className=\"h-4 w-4\" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent>
        <div className=\"space-y-4\">
          <div className=\"space-y-2\">
            <div className=\"flex justify-between text-sm text-gray-600\">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} className=\"h-2\" />
          </div>

          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: \"spring\", stiffness: 300, damping: 30 }}
            className=\"overflow-hidden\"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=\"space-y-4 pt-2\"
                  >
                    <div className=\"flex items-center justify-between text-sm text-gray-600\">
                      <div className=\"flex items-center\">
                        <Clock className=\"h-4 w-4 mr-2\" />
                        <span>Due {dueDate}</span>
                      </div>
                      <div className=\"flex items-center gap-4\">
                        <div className=\"flex items-center\">
                          <Star className=\"h-4 w-4 mr-1 text-yellow-400\" />
                          <span>{githubStars}</span>
                        </div>
                        <div className=\"flex items-center\">
                          <GitBranch className=\"h-4 w-4 mr-1\" />
                          <span>{openIssues} issues</span>
                        </div>
                      </div>
                    </div>

                    <div className=\"space-y-2\">
                      <h4 className=\"font-medium text-sm flex items-center\">
                        <Users className=\"h-4 w-4 mr-2\" />
                        Contributors
                      </h4>
                      <div className=\"flex -space-x-2\">
                        {contributors.map((contributor, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className=\"border-2 border-white\">
                                  <AvatarImage
                                    src={
                                      contributor.image ||
                                      `/placeholder.svg?height=32&width=32&text=${contributor.name[0]}`
                                    }
                                    alt={contributor.name}
                                  />
                                  <AvatarFallback>
                                    {contributor.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{contributor.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>

                    <div className=\"space-y-2\">
                      <h4 className=\"font-medium text-sm\">Recent Tasks</h4>
                      {tasks.map((task, index) => (
                        <div
                          key={index}
                          className=\"flex items-center justify-between text-sm\"
                        >
                          <span className=\"text-gray-600\">{task.title}</span>
                          {task.completed && (
                            <CheckCircle2 className=\"h-4 w-4 text-green-500\" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className=\"space-y-2\">
                      <Button className=\"w-full\">
                        <MessageSquare className=\"h-4 w-4 mr-2\" />
                        View Discussion
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CardContent>

      <CardFooter>
        <div className=\"flex items-center justify-between w-full text-sm text-gray-600\">
          <span>Last updated: 2 hours ago</span>
          <span>{openIssues} open issues</span>
        </div>
      </CardFooter>
    </Card>
  );
}
",
      "target": "app/component/expandable-card.tsx"
    },
    {
      "path": "hero-template/app/component/hero.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { motion, useAnimation } from \"framer-motion\";
import { buttonVariants } from \"@/components/ui/button\";
import { cn } from \"@/lib/utils\";
import Link from \"next/link\";
import { ChevronRight, Pyramid } from \"lucide-react\";

const ease = [0.16, 1, 0.3, 1];

interface HeroPillProps {
  href?: string;
  text: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function HeroPill({ href, text, icon, endIcon }: HeroPillProps) {
  const controls = useAnimation();

  return (
    <Link href={href || \"/docs\"} className=\"group\">
      <motion.div
        className=\"inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm transition-colors hover:bg-muted\"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        onHoverStart={() => controls.start({ rotate: -10 })}
        onHoverEnd={() => controls.start({ rotate: 0 })}
      >
        <motion.div
          className=\"text-foreground/60 transition-colors group-hover:text-primary\"
          animate={controls}
          transition={{ type: \"spring\", stiffness: 300, damping: 10 }}
        >
          {icon || <Pyramid className=\"h-4 w-4\" />}
        </motion.div>
        <span>{text}</span>
        {endIcon || <ChevronRight className=\"h-4 w-4\" />}
      </motion.div>
    </Link>
  );
}

interface HeroContentProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    href: string;
    text: string;
    icon?: React.ReactNode;
  };
}

function HeroContent({
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
}: HeroContentProps) {
  return (
    <div className=\"flex flex-col space-y-4\">
      <motion.h1
        className=\"text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl\"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        {title}{\" \"}
        {titleHighlight && (
          <span className=\"text-primary\">{titleHighlight}</span>
        )}
      </motion.h1>
      <motion.p
        className=\"max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8\"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease }}
      >
        {description}
      </motion.p>
      <motion.div
        className=\"flex flex-col sm:flex-row gap-4 pt-4\"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
      >
        {primaryAction && (
          <Link
            href={primaryAction.href}
            className={cn(
              buttonVariants({ size: \"lg\" }),
              \"gap-2 w-full sm:w-auto justify-center\"
            )}
          >
            {primaryAction.icon}
            {primaryAction.text}
          </Link>
        )}
        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className={cn(
              buttonVariants({ variant: \"outline\", size: \"lg\" }),
              \"gap-2 w-full sm:w-auto justify-center\"
            )}
          >
            {secondaryAction.icon}
            {secondaryAction.text}
          </Link>
        )}
      </motion.div>
    </div>
  );
}

interface HeroProps {
  pill?: {
    href?: string;
    text: string;
    icon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };
  content: HeroContentProps;
  preview?: React.ReactNode;
}

export default function Hero({ pill, content, preview }: HeroProps) {
  return (
    <div className=\"container relative overflow-hidden\">
      <div className=\"flex min-h-[calc(100vh-64px)] flex-col lg:flex-row items-center py-8 px-4 md:px-8 lg:px-12\">
        <div className=\"flex flex-col gap-4 w-full lg:max-w-2xl\">
          {pill && <HeroPill {...pill} />}
          <HeroContent {...content} />
        </div>
        {preview && (
          <div className=\"w-full lg:max-w-xl lg:pl-16 mt-12 lg:mt-0\">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}
",
      "target": "app/component/hero.tsx"
    },
    {
      "path": "hero-template/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "landing-page-test",
  "type": "registry:block",
  "title": "Landing Page Test",
  "description": "A template for landing-page-test",
  "files": [
    {
      "path": "landing-page-test/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

export default function ExpandableCardPage() {
  return (
    <div className=\"container mx-auto py-10\">
      <div className=\"max-w-2xl mx-auto space-y-8\">
        <div className=\"text-center mb-8\">
          <h1 className=\"text-3xl font-bold mb-2\">Project Status Dashboard</h1>
          <p className=\"text-muted-foreground\">
            THIS IS A TEST FOR LANDING PAGE
          </p>
        </div>

        <div className=\"mt-8 text-center text-sm text-muted-foreground\">
          <p>Click the card to expand and see more details</p>
        </div>
      </div>
    </div>
  );
}
",
      "target": "app/page.tsx"
    },
    {
      "path": "landing-page-test/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Expandable Card Template\",
  description: \"A template showcasing the expandable card component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "landing-page-test/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "popover-template",
  "type": "registry:block",
  "title": "Popover Template",
  "description": "A template for popover-template",
  "files": [
    {
      "path": "popover-template/app/page.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import { MessageSquare } from \"lucide-react\";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
  PopoverFooter,
  PopoverCloseButton,
} from \"./component/popover\";

export default function PopoverPage() {
  return (
    <div className=\"min-h-screen w-full flex flex-col items-center justify-center p-4 gap-6\">
      <div className=\"text-center space-y-2\">
        <h1 className=\"text-3xl font-bold tracking-tight\">Popover</h1>
        <p className=\"text-muted-foreground\">
          A beautiful animated popover component with smooth transitions.
        </p>
      </div>

      <div className=\"flex flex-col items-center gap-4\">
        <PopoverRoot>
          <PopoverTrigger>
            <MessageSquare className=\"h-4 w-4 mr-2\" />
            Open Popover
          </PopoverTrigger>
          <PopoverContent className=\"w-[300px]\">
            <PopoverHeader>Messages</PopoverHeader>
            <PopoverBody>
              <PopoverButton>
                <MessageSquare className=\"h-4 w-4\" />
                New Message
              </PopoverButton>
              <PopoverButton>
                <MessageSquare className=\"h-4 w-4\" />
                View All
              </PopoverButton>
            </PopoverBody>
            <PopoverFooter>
              <span className=\"text-sm text-muted-foreground\">
                2 unread messages
              </span>
              <PopoverCloseButton />
            </PopoverFooter>
          </PopoverContent>
        </PopoverRoot>
      </div>
    </div>
  );
}
",
      "target": "app/page.tsx"
    },
    {
      "path": "popover-template/app/layout.tsx",
      "type": "registry:page",
      "content": "import \"./globals.css\";
import { Inter } from \"next/font/google\";
import { cn } from \"@/lib/utils\";

const inter = Inter({ subsets: [\"latin\"] });

export const metadata = {
  title: \"Popover Template\",
  description: \"A template showcasing the popover component\",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          \"min-h-screen bg-background antialiased\"
        )}
      >
        {children}
      </body>
    </html>
  );
}
",
      "target": "app/layout.tsx"
    },
    {
      "path": "popover-template/app/component/popover.tsx",
      "type": "registry:page",
      "content": "\"use client\";

import * as React from \"react\";
import { AnimatePresence, MotionConfig, motion } from \"framer-motion\";
import { X } from \"lucide-react\";
import { cn } from \"@/lib/utils\";
import { Button } from \"@/components/ui/button\";

const TRANSITION = {
  type: \"spring\",
  bounce: 0.05,
  duration: 0.3,
};

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  uniqueId: string;
  note: string;
  setNote: (note: string) => void;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined
);

function usePopover() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error(\"usePopover must be used within a PopoverProvider\");
  }
  return context;
}

function usePopoverLogic() {
  const uniqueId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);
  const [note, setNote] = React.useState(\"\");

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setNote(\"\");
  };

  return { isOpen, openPopover, closePopover, uniqueId, note, setNote };
}

interface PopoverRootProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverRoot = React.forwardRef<HTMLDivElement, PopoverRootProps>(
  ({ children, className }, ref) => {
    const popoverLogic = usePopoverLogic();

    return (
      <PopoverContext.Provider value={popoverLogic}>
        <MotionConfig transition={TRANSITION}>
          <div
            ref={ref}
            className={cn(
              \"relative flex items-center justify-center isolate\",
              className
            )}
          >
            {children}
          </div>
        </MotionConfig>
      </PopoverContext.Provider>
    );
  }
);
PopoverRoot.displayName = \"PopoverRoot\";

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | \"default\"
    | \"destructive\"
    | \"outline\"
    | \"secondary\"
    | \"ghost\"
    | \"link\";
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, className, variant = \"outline\" }, ref) => {
    const { openPopover, uniqueId } = usePopover();

    return (
      <motion.div key=\"button\" layoutId={`popover-${uniqueId}`}>
        <Button
          ref={ref}
          variant={variant}
          className={className}
          onClick={openPopover}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className=\"text-sm\"
          >
            {children}
          </motion.span>
        </Button>
      </motion.div>
    );
  }
);
PopoverTrigger.displayName = \"PopoverTrigger\";

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className }, ref) => {
    const { isOpen, closePopover, uniqueId } = usePopover();
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          closePopover();
        }
      };
      document.addEventListener(\"mousedown\", handleClickOutside);
      return () =>
        document.removeEventListener(\"mousedown\", handleClickOutside);
    }, [closePopover]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === \"Escape\") closePopover();
      };
      document.addEventListener(\"keydown\", handleKeyDown);
      return () => document.removeEventListener(\"keydown\", handleKeyDown);
    }, [closePopover]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            layoutId={`popover-${uniqueId}`}
            className={cn(
              \"absolute z-50 min-w-[200px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none\",
              className
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
PopoverContent.displayName = \"PopoverContent\";

interface PopoverHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverHeader = React.forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          \"border-b px-4 py-2.5 font-medium text-foreground/90\",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
PopoverHeader.displayName = \"PopoverHeader\";

interface PopoverBodyProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverBody = React.forwardRef<HTMLDivElement, PopoverBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn(\"p-4\", className)}>
        {children}
      </div>
    );
  }
);
PopoverBody.displayName = \"PopoverBody\";

interface PopoverButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const PopoverButton = React.forwardRef<HTMLButtonElement, PopoverButtonProps>(
  ({ children, onClick, className }, ref) => {
    return (
      <Button
        ref={ref}
        variant=\"ghost\"
        className={cn(
          \"w-full justify-start gap-2 px-4 py-2 font-normal\",
          className
        )}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
);
PopoverButton.displayName = \"PopoverButton\";

interface PopoverFooterProps {
  children: React.ReactNode;
  className?: string;
}

const PopoverFooter = React.forwardRef<HTMLDivElement, PopoverFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        key=\"close\"
        className={cn(
          \"flex items-center justify-between border-t bg-muted/50 px-4 py-3\",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
PopoverFooter.displayName = \"PopoverFooter\";

interface PopoverCloseButtonProps {
  className?: string;
}

const PopoverCloseButton = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseButtonProps
>(({ className }, ref) => {
  const { closePopover } = usePopover();

  return (
    <Button
      ref={ref}
      type=\"button\"
      variant=\"ghost\"
      size=\"icon\"
      className={cn(\"h-8 w-8\", className)}
      onClick={closePopover}
      aria-label=\"Close popover\"
    >
      <X className=\"h-4 w-4\" />
    </Button>
  );
});
PopoverCloseButton.displayName = \"PopoverCloseButton\";

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
  PopoverFooter,
  PopoverCloseButton,
};
",
      "target": "app/component/popover.tsx"
    },
    {
      "path": "popover-template/app/globals.css",
      "type": "registry:page",
      "content": "@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
},
{
  "name": "tweet-card-template",
  "type": "registry:block",
  "title": "Tweet Card Template",
  "description": "A template for tweet-card-template",
  "files": [
    {
      "path": "tweet-card-template/app/page.tsx",
      "type": "registry:page",
      "content": " ",
      "target": "app/page.tsx"
    },
    {
      "path": "tweet-card-template/app/globals.css",
      "type": "registry:page",
      "content": " ",
      "target": "app/globals.css"
    }
  ],
  "registryDependencies": [],
  "categories": [
    "templates"
  ]
}
] satisfies Registry;