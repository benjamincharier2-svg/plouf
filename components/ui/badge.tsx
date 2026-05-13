import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning"
}

const Badge = ({ className, variant = "default", ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variant === "default" && "bg-indigo-100 text-indigo-700",
      variant === "success" && "bg-green-100 text-green-700",
      variant === "warning" && "bg-yellow-100 text-yellow-700",
      className
    )}
    {...props}
  />
)

export { Badge }
