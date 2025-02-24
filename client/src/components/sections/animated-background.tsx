import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function AnimatedBackground({ className, children }: AnimatedBackgroundProps) {
  return (
    <div className={cn(
      "fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-[#E31B23]/10 to-gray-800",
      className
    )}>
      {children}
    </div>
  );
}