"use client"

import { motion } from "framer-motion"
import { UserPlus, Smartphone, ChefHat, Truck } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Company Signs Up",
    description:
      "Your company registers with Bningoo. Set up your team, preferences, and budget in minutes.",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Smartphone,
    title: "Employees Order",
    description:
      "Employees browse the daily menu, customize their meals, and place orders through our simple platform.",
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-400",
  },
  {
    icon: ChefHat,
    title: "Kitchen Prepares",
    description:
      "Our kitchen team gets to work — fresh ingredients, expert preparation, and quality checks on every order.",
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-400",
  },
  {
    icon: Truck,
    title: "Meals Delivered",
    description:
      "Hot, fresh meals are packed and delivered to your office at the scheduled time. Ready to enjoy.",
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-400",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/30 via-transparent to-charcoal-900/30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/2 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
            <ChefHat className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            From Sign Up to{" "}
            <span className="text-orange-500">Lunch Time</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Four simple steps to bring premium office meals to your team.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative group"
              >
                <div className="bg-charcoal-900/60 border border-white/5 rounded-2xl p-6 md:p-8 h-full hover:border-orange-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5">
                  {/* Step number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-orange-500/25">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} border border-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
