"use client"

import { motion } from "framer-motion"
import {
  Salad,
  Smartphone,
  ClipboardCheck,
  Clock,
  Banknote,
  ShieldCheck,
} from "lucide-react"

const features = [
  {
    icon: Salad,
    title: "Premium Office Meals",
    description:
      "Chef-curated menus with fresh, high-quality ingredients. Every meal is prepared with care and attention to detail.",
  },
  {
    icon: Smartphone,
    title: "Easy Ordering",
    description:
      "Simple mobile and web interface. Employees browse, customize, and order in under a minute.",
  },
  {
    icon: ClipboardCheck,
    title: "Kitchen Management",
    description:
      "Real-time dashboard for order tracking, inventory management, and kitchen operations. Full visibility.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "Scheduled delivery windows that align with your office schedule. Never keep your team waiting.",
  },
  {
    icon: Banknote,
    title: "Corporate Budgeting",
    description:
      "Set per-employee budgets, track spending, and get detailed billing reports for your finance team.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Rigorous quality checks, dietary accommodation, and responsive support for every order.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-900/20 to-charcoal-950 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
            <Salad className="w-4 h-4" />
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything You Need for{" "}
            <span className="text-orange-500">Office Dining</span>
          </h2>
          <p className="text-gray-400 text-lg">
            From ordering to delivery, we handle every aspect of your office
            food service.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group"
            >
              <div className="bg-charcoal-900/40 border border-white/5 rounded-xl p-6 h-full hover:border-orange-500/15 transition-all duration-300 hover:bg-charcoal-900/60">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/10 flex items-center justify-center mb-5 group-hover:bg-orange-500/15 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
