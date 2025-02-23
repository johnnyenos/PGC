import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function AnimatedBackground({ className, children }: AnimatedBackgroundProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [
    'bg-gradient-to-br from-gray-900 to-gray-800',
    'bg-gradient-to-br from-gray-900 via-[#E31B23]/10 to-gray-800',
    'bg-gradient-to-br from-gray-900 via-[#004B87]/10 to-gray-800',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      "fixed inset-0 transition-colors duration-1000 ease-in-out -z-10",
      colors[colorIndex]
    )}>
      {children}
    </div>
  );
}
