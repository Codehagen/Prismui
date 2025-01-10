"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ExpandableDialogRoot,
  ExpandableDialogTrigger,
  ExpandableDialogContent,
  ExpandableDialogImage,
  ExpandableDialogTitle,
  ExpandableDialogSubtitle,
  ExpandableDialogDescription,
} from "@/components/prismui/expandable-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogClose } from "@/components/ui/dialog";

export default function TestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold">Expandable Dialog Examples</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Product Quick View Example */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Product Quick View</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            A practical example showing product details with specifications
          </p>
          <ExpandableDialogRoot
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 24,
            }}
          >
            <ExpandableDialogTrigger
              style={{
                borderRadius: "12px",
              }}
              className="flex max-w-[270px] flex-col overflow-hidden border bg-card hover:border-primary/50"
            >
              <ExpandableDialogImage
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Polaroid Camera"
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-grow flex-row items-end justify-between p-4">
                <div>
                  <Badge className="mb-2" variant="secondary">
                    New Release
                  </Badge>
                  <ExpandableDialogTitle className="text-base font-medium text-foreground">
                    Polaroid Now+ i-Type
                  </ExpandableDialogTitle>
                  <ExpandableDialogSubtitle className="text-sm text-muted-foreground">
                    $149.99
                  </ExpandableDialogSubtitle>
                </div>
                <button
                  type="button"
                  className="relative ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:bg-muted"
                  aria-label="Quick view"
                >
                  <Plus size={14} />
                </button>
              </div>
            </ExpandableDialogTrigger>
            <ExpandableDialogContent className="sm:max-w-[400px] md:max-w-[500px]">
              <DialogClose className="absolute right-4 top-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
              <div className="flex flex-col">
                <div className="relative">
                  <ExpandableDialogImage
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Polaroid Camera"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute left-4 top-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col p-6">
                  <Badge className="w-fit" variant="secondary">
                    New Release
                  </Badge>
                  <div className="mt-4">
                    <ExpandableDialogTitle className="text-2xl font-semibold text-foreground">
                      Polaroid Now+ i-Type
                    </ExpandableDialogTitle>
                    <ExpandableDialogSubtitle className="mt-1 text-xl font-medium text-muted-foreground">
                      $149.99
                    </ExpandableDialogSubtitle>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < 4
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted"
                            )}
                          />
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      4.0 (128 reviews)
                    </span>
                  </div>
                  <Tabs defaultValue="overview" className="mt-6">
                    <TabsList className="w-full">
                      <TabsTrigger value="overview" className="flex-1">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger value="specs" className="flex-1">
                        Specifications
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <ExpandableDialogDescription className="space-y-4 text-sm text-muted-foreground">
                        <p>
                          The Polaroid Now+ is our most creative analog instant
                          camera yet. Get more creative tools than ever before
                          with 5 experimental lens filters, and unlock even more
                          creative tools in the Polaroid mobile app.
                        </p>
                        <ul className="list-inside list-disc space-y-2">
                          <li>Autofocus 2‑lens system</li>
                          <li>Accurate flash system</li>
                          <li>USB‑C charging</li>
                          <li>5 creative lens filters included</li>
                          <li>Connect to the Polaroid mobile app</li>
                        </ul>
                      </ExpandableDialogDescription>
                    </TabsContent>
                    <TabsContent value="specs" className="mt-4">
                      <div className="space-y-4">
                        {[
                          {
                            label: "Dimensions",
                            value: "150.16 × 112.2 × 95.48 mm",
                          },
                          {
                            label: "Weight",
                            value: "457 grams (without film pack)",
                          },
                          {
                            label: "Battery",
                            value: "Rechargeable lithium-ion",
                          },
                          {
                            label: "Film Format",
                            value: "i-Type and 600 film",
                          },
                          {
                            label: "Lens",
                            value: "Optical grade polycarbonate lens",
                          },
                        ].map((spec) => (
                          <div
                            key={spec.label}
                            className="flex justify-between border-b pb-2 text-sm"
                          >
                            <span className="text-muted-foreground">
                              {spec.label}
                            </span>
                            <span>{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </ExpandableDialogContent>
          </ExpandableDialogRoot>
        </div>

        {/* Lamp Example */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Single Image Dialog</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Single image dialog with a simple layout
          </p>
          <ExpandableDialogRoot
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 30,
            }}
          >
            <ExpandableDialogTrigger
              style={{
                borderRadius: "12px",
              }}
              className="flex max-w-[270px] flex-col overflow-hidden border border-border/10 bg-background"
            >
              <ExpandableDialogImage
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-grow flex-row items-end justify-between p-2">
                <div>
                  <ExpandableDialogTitle className="text-foreground">
                    EB27
                  </ExpandableDialogTitle>
                  <ExpandableDialogSubtitle className="text-muted-foreground">
                    Edouard Wilfrid Buquet
                  </ExpandableDialogSubtitle>
                </div>
                <button
                  type="button"
                  className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-border/10 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 active:scale-[0.98]"
                  aria-label="Open dialog"
                >
                  <Plus size={12} />
                </button>
              </div>
            </ExpandableDialogTrigger>
            <ExpandableDialogContent
              style={{
                borderRadius: "24px",
              }}
              className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-border/10 bg-background sm:w-[400px]"
            >
              <DialogClose className="absolute right-4 top-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
              <ExpandableDialogImage
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood."
                className="h-full w-full"
              />
              <div className="p-6">
                <ExpandableDialogTitle className="text-2xl text-foreground">
                  EB27
                </ExpandableDialogTitle>
                <ExpandableDialogSubtitle className="text-muted-foreground">
                  Edouard Wilfrid Buquet
                </ExpandableDialogSubtitle>
                <ExpandableDialogDescription
                  disableLayoutAnimation
                  variants={{
                    initial: { opacity: 0, scale: 0.8, y: 100 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.8, y: 100 },
                  }}
                >
                  <p className="mt-2 text-muted-foreground">
                    Little is known about the life of Édouard-Wilfrid Buquet. He
                    was born in France in 1866, but the time and place of his
                    death is unfortunately a mystery.
                  </p>
                  <p className="text-muted-foreground">
                    Research conducted in the 1970s revealed that he&apos;d
                    designed the &ldquo;EB 27&rdquo; double-arm desk lamp in
                    1925, handcrafting it from nickel-plated brass, aluminium
                    and varnished wood.
                  </p>
                  <a
                    className="mt-2 inline-flex text-muted-foreground underline hover:text-primary"
                    href="https://www.are.na/block/12759029"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Are.na block
                  </a>
                </ExpandableDialogDescription>
              </div>
            </ExpandableDialogContent>
          </ExpandableDialogRoot>
        </div>

        {/* Camera Collection Example */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Camera Collection</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            A morphing dialog that expands from a compact camera list
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                name: "Polaroid Now+ i-Type",
                maker: "Polaroid",
                image:
                  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                price: "$149.99",
              },
              {
                name: "OneStep+ i-Type",
                maker: "Polaroid Originals",
                image:
                  "https://images.unsplash.com/photo-1525459819821-1c2d33189e23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                price: "$139.99",
              },
              {
                name: "SX-70 Original",
                maker: "Polaroid",
                image:
                  "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                price: "$429.99",
              },
            ].map((camera) => (
              <ExpandableDialogRoot
                key={camera.name}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                }}
              >
                <ExpandableDialogTrigger
                  style={{
                    borderRadius: "4px",
                  }}
                  className="border border-border/60 bg-card hover:bg-accent"
                >
                  <div className="flex items-center space-x-3 p-3">
                    <ExpandableDialogImage
                      src={camera.image}
                      alt={camera.name}
                      className="h-8 w-8 object-cover"
                      style={{
                        borderRadius: "4px",
                      }}
                    />
                    <div className="flex flex-col items-start justify-center space-y-0">
                      <ExpandableDialogTitle className="text-[10px] font-medium text-foreground sm:text-xs">
                        {camera.name}
                      </ExpandableDialogTitle>
                      <ExpandableDialogSubtitle className="text-[10px] text-muted-foreground sm:text-xs">
                        {camera.maker}
                      </ExpandableDialogSubtitle>
                    </div>
                  </div>
                </ExpandableDialogTrigger>
                <ExpandableDialogContent
                  style={{
                    borderRadius: "12px",
                  }}
                  className="relative h-auto w-[400px] border bg-card"
                >
                  <DialogClose className="absolute right-4 top-4 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </DialogClose>
                  <ScrollArea className="h-[90vh]" type="scroll">
                    <div className="relative p-6">
                      <div className="flex justify-center py-10">
                        <ExpandableDialogImage
                          src={camera.image}
                          alt={camera.name}
                          className="h-auto w-[200px] rounded-lg"
                        />
                      </div>
                      <div>
                        <Badge className="mb-4" variant="secondary">
                          New Release
                        </Badge>
                        <ExpandableDialogTitle className="text-2xl font-semibold text-foreground">
                          {camera.name}
                        </ExpandableDialogTitle>
                        <ExpandableDialogSubtitle className="mt-1 text-xl font-medium text-muted-foreground">
                          {camera.price}
                        </ExpandableDialogSubtitle>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex items-center">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-4 w-4",
                                    i < 4
                                      ? "fill-primary text-primary"
                                      : "fill-muted text-muted"
                                  )}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            4.0 (128 reviews)
                          </span>
                        </div>
                        <ExpandableDialogDescription
                          className="mt-6 space-y-4 text-sm text-muted-foreground"
                          disableLayoutAnimation
                          variants={{
                            initial: { opacity: 0, scale: 0.8, y: 100 },
                            animate: { opacity: 1, scale: 1, y: 0 },
                            exit: { opacity: 0, scale: 0.8, y: 100 },
                          }}
                        >
                          <p>
                            The {camera.name} is our most creative analog
                            instant camera yet. Get more creative tools than
                            ever before with 5 experimental lens filters, and
                            unlock even more creative tools in the Polaroid
                            mobile app.
                          </p>
                          <ul className="list-inside list-disc space-y-2">
                            <li>Autofocus 2‑lens system</li>
                            <li>Accurate flash system</li>
                            <li>USB‑C charging</li>
                            <li>5 creative lens filters included</li>
                            <li>Connect to the Polaroid mobile app</li>
                          </ul>
                        </ExpandableDialogDescription>
                      </div>
                    </div>
                  </ScrollArea>
                </ExpandableDialogContent>
              </ExpandableDialogRoot>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
