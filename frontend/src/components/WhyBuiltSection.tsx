"use client";

import { motion } from "framer-motion";

export default function WhyBuiltSection() {
  return (
    <section id="why" className="w-full py-32 px-6 lg:px-12 bg-transparent flex items-center justify-center relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] opacity-50 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center flex flex-col items-center"
      >
        <div className="text-gold-light tracking-[0.2em] text-sm uppercase font-semibold mb-6">
          Why We Built Sanskriti
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-12 leading-tight">
          Culture shouldn't have to travel in fragments.
        </h2>

        <div className="w-12 h-0.5 bg-gold mb-12"></div>

        <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
          For families living away from India, culture often becomes fragmented. Stories are scattered, music is disconnected, and traditions are reduced to occasional moments. Sanskriti was created to bring it all together in one place, so families can stay rooted, children can grow up with cultural confidence, and tradition can remain a living part of everyday life.
        </p>
      </motion.div>
    </section>
  );
}
