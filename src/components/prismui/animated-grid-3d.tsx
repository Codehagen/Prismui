"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plane, Wifi, Home, Zap } from "lucide-react";

interface GridNode {
  id: string;
  x: number;
  y: number;
  z: number;
  status: "scanning" | "idle" | "irrigating" | "active";
  icon: React.ReactNode;
  label: string;
}

interface AnimatedGrid3DProps {
  className?: string;
  nodes?: GridNode[];
}

const defaultNodes: GridNode[] = [
  {
    id: "1",
    x: 2,
    y: 1,
    z: 1,
    status: "scanning",
    icon: <Plane className="w-4 h-4" />,
    label: "Scanning",
  },
  {
    id: "2",
    x: 5,
    y: 2,
    z: 2,
    status: "idle",
    icon: <Home className="w-4 h-4" />,
    label: "Idle",
  },
  {
    id: "3",
    x: 3,
    y: 3,
    z: 1,
    status: "irrigating",
    icon: <Zap className="w-4 h-4" />,
    label: "Irrigating",
  },
  {
    id: "4",
    x: 6,
    y: 1,
    z: 2,
    status: "active",
    icon: <Wifi className="w-4 h-4" />,
    label: "Scanning",
  },
];

const statusColors = {
  scanning: "border-blue-500 bg-blue-500/20 text-blue-400",
  idle: "border-gray-500 bg-gray-500/20 text-gray-400",
  irrigating: "border-orange-500 bg-orange-500/20 text-orange-400",
  active: "border-green-500 bg-green-500/20 text-green-400",
};

export default function AnimatedGrid3D({
  className,
  nodes = defaultNodes,
}: AnimatedGrid3DProps) {
  // Create grid lines
  const gridLines = [];
  const gridSize = 8;
  
  // Horizontal lines
  for (let i = 0; i <= gridSize; i++) {
    gridLines.push(
      <motion.line
        key={`h-${i}`}
        x1={i * 60}
        y1={0}
        x2={i * 60}
        y2={gridSize * 60}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
        strokeDasharray="2,2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: i * 0.1 }}
      />
    );
  }
  
  // Vertical lines
  for (let i = 0; i <= gridSize; i++) {
    gridLines.push(
      <motion.line
        key={`v-${i}`}
        x1={0}
        y1={i * 60}
        x2={gridSize * 60}
        y2={i * 60}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
        strokeDasharray="2,2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: i * 0.1 }}
      />
    );
  }

  return (
    <div className={cn("relative w-full h-64 overflow-hidden", className)}>
      {/* 3D Grid Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="relative"
          style={{
            transform: "rotateX(60deg) rotateY(-10deg) rotateZ(5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Grid Base */}
          <svg
            width={gridSize * 60}
            height={gridSize * 60}
            className="absolute inset-0"
            style={{
              transform: "translateZ(0px)",
            }}
          >
            {gridLines}
          </svg>

          {/* Elevated Grid Sections */}
          {[1, 2, 3].map((level) => (
            <motion.div
              key={level}
              className="absolute border border-green-500/30 bg-green-500/5"
              style={{
                width: "120px",
                height: "120px",
                left: `${level * 80 + 60}px`,
                top: `${level * 40 + 80}px`,
                transform: `translateZ(${level * 20}px)`,
                borderRadius: "8px",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: level * 0.3 }}
            />
          ))}

          {/* Animated Nodes */}
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: `${node.x * 60}px`,
                top: `${node.y * 60}px`,
                transform: `translateZ(${node.z * 30}px)`,
              }}
              initial={{ opacity: 0, scale: 0, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              {/* Node Circle */}
              <motion.div
                className={cn(
                  "relative w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-sm",
                  statusColors[node.status]
                )}
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.7)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)"
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {node.icon}
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                {node.label}
              </motion.div>

              {/* Connection Lines */}
              {index > 0 && (
                <motion.div
                  className="absolute top-6 left-6 w-20 h-px bg-gradient-to-r from-current to-transparent opacity-30"
                  style={{
                    transform: `rotate(${index * 45}deg)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.2 + 0.8, duration: 0.8 }}
                />
              )}
            </motion.div>
          ))}

          {/* Floating Data Points */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`data-${i}`}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 400 + 50}px`,
                top: `${Math.random() * 300 + 50}px`,
                transform: `translateZ(${Math.random() * 100}px)`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}