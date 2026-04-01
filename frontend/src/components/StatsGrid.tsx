"use client";

import { motion, Variants } from "framer-motion";

const stats = [
  {
    number: "3500+",
    line1: "Premium cultural content",
    line2: "Minutes of programming",
  },
  {
    number: "100+",
    line1: "Original music",
    line2: "Songs and growing",
  },
  {
    number: "4",
    line1: "Content pillars",
    line2: "Regional · Devotional · Family · Stories",
  },
  {
    number: "Global",
    line1: "Designed for the diaspora",
    line2: "Indian families across the world",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function StatsGrid() {
  return (
    <section className="w-full py-24 bg-transparent overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-gold-light tracking-[0.2em] text-sm uppercase font-semibold mb-4">
            Built on depth, not noise
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={statVariants}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="text-5xl md:text-6xl text-gold-light mb-4 font-serif relative">
                {stat.number}
              </div>
              <div className="text-white/90 text-sm tracking-wider uppercase mb-2 font-medium">
                {stat.line1}
              </div>
              <div className="text-white/50 text-sm font-light">
                {stat.line2}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
