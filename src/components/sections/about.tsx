"use client"

import { motion } from "framer-motion"
import { Utensils, Building2, Truck } from "lucide-react"

const stats = [
  { label: "Companies Served", value: "50+" },
  { label: "Meals Delivered", value: "10,000+" },
  { label: "Happy Employees", value: "5,000+" },
]

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-transparent to-charcoal-950 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Stats & Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-charcoal-800 to-charcoal-900 max-w-md mx-auto lg:mx-0">
                <div className="h-full flex items-center justify-center">
                  <Utensils className="w-32 h-32 text-orange-500/30" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />
              </div>

              {/* Stats floating */}
              <div className="grid grid-cols-3 gap-3 mt-6 max-w-md mx-auto lg:mx-0">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="bg-charcoal-900/80 border border-white/5 rounded-xl px-3 py-4 text-center"
                  >
                    <div className="text-orange-500 text-xl sm:text-2xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              About Bningoo
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Premium Office{" "}
              <span className="text-orange-500">Food Service</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Bningoo is a premium B2B office food service designed to bring
              fresh, delicious meals directly to workplaces. We partner with
              companies to provide their employees with a seamless dining
              experience — from ordering to delivery.
            </p>

            <p className="text-gray-500 leading-relaxed mb-8">
              Born out of Lamseyah Corp, Bningoo reimagines the office lunch
              break. No more sad desk salads, no more ordering chaos. Just
              great food, delivered on time, every time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-orange-500" />
                </div>
                <span>Office-wide delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4 text-orange-500" />
                </div>
                <span>Premium menu curation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
