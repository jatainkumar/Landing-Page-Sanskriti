"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const benefits = [
  { num: "01", title: "Early Access", text: "Be first to know when Sanskriti opens." },
  { num: "02", title: "Founding Updates", text: "Receive launch news, feature announcements, and special early communication." },
  { num: "03", title: "Priority Access", text: "Get first access to selected experiences as the platform rolls out." },
  { num: "04", title: "Launch Benefits", text: "Be first in line for founding member launch offers." },
];

export default function WhoAndWhySection() {
  return (
    <section id="who" className="w-full py-32 px-6 lg:px-12 bg-transparent relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16">

        
        {/* WHO IT'S FOR block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start justify-center pr-0 lg:pr-12"
        >
          <div className="text-gold-light tracking-[0.2em] text-sm uppercase font-semibold mb-6">
            Who Sanskriti Is For
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-10 leading-tight">
            For families who refuse to let culture fade.
          </h2>
          <div className="w-12 h-0.5 bg-gold mb-10"></div>
          <p className="text-xl text-white/70 font-light leading-relaxed mb-10">
            Sanskriti is for families who want their children to grow up connected to Indian values, stories, music, and traditions. It is for those who miss the emotional depth of festivals, the power of devotional music, and the richness of culture that deserves more than random clips and fragmented content.
          </p>
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative">
            <Image
              src="/photo1.jpg"
              alt="Sanskriti Family & Culture"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* WHY JOIN block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col bg-peacock/80 backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-14"
        >
          <div className="text-gold-light tracking-[0.2em] text-sm uppercase font-semibold mb-8">
            Why Join The Waitlist
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-12">
            Early. Intentional. Yours.
          </h2>

          <div className="flex flex-col gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <span className="text-gold-light/50 font-serif text-2xl group-hover:text-gold transition-colors">{b.num}</span>
                <div>
                  <h3 className="text-xl text-white font-medium mb-2">{b.title}</h3>
                  <p className="text-white/60 font-light">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
