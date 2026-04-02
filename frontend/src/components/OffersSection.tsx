"use client";

import { motion, Variants } from "framer-motion";
import { Music, BookOpen, Lamp, Users } from "lucide-react";

// (Pillars array remains the same; truncated for brevity but we must include it exactly)
const pillars = [
  {
    id: 1,
    title: "Devotional Music",
    description: "Bhajans, sacred music, concerts, and original Sanskriti productions.",
    icon: Music,
    videoId: "iGCPoaS91bI",
  },
  {
    id: 2,
    title: "Cultural Stories",
    description: "Timeless stories, traditions, and heritage explained with depth and beauty.",
    icon: BookOpen,
    videoId: "KzuQpnbvS3g",
  },
  {
    id: 3,
    title: "Festivals & Rituals",
    description: "Celebrate Indian festivals with meaning, not just memory.",
    icon: Lamp,
    videoId: "KzuQpnbvS3g",
  },
  {
    id: 4,
    title: "Family Learning",
    description: "Cultural journeys, stories, and spiritual learning designed for children and families.",
    icon: Users,
    videoId: "xigYQkfh0BQ",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function OffersSection() {
  return (
    <section id="offers" className="w-full py-32 px-6 lg:px-12 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="text-gold-light tracking-[0.2em] text-sm uppercase font-semibold mb-4">
            What We Offer
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-medium">
            A living cultural experience
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              className="group relative p-10 rounded-2xl border border-white/10 bg-peacock/80 backdrop-blur-md hover:bg-peacock/90 transition-colors duration-500 overflow-hidden flex flex-col items-start"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-gold-light group-hover:scale-110 transition-transform duration-500">
                <pillar.icon size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold-light transition-colors duration-500">
                {pillar.title}
              </h3>
              
              <p className="text-white/70 font-light text-lg leading-relaxed mb-6">
                {pillar.description}
              </p>

              <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 relative mt-auto shadow-inner">
                <iframe
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube.com/embed/${pillar.videoId}`}
                  title={`${pillar.title} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen>
                </iframe>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
