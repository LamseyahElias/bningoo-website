import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-orange-500/15 text-orange-400 border border-orange-500/20",
        variant === "outline" && "border border-white/10 text-white/60",
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
