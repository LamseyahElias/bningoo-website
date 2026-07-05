import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "lg"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40",
        variant === "outline" && "border border-white/20 bg-transparent text-white hover:bg-white/10",
        variant === "ghost" && "text-white/70 hover:text-white hover:bg-white/5",
        size === "default" && "h-11 px-6 py-2",
        size === "sm" && "h-9 rounded-md px-3",
        size === "lg" && "h-13 px-8 py-3 text-base",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
