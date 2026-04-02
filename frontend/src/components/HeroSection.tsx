"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector("#waitlist");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-48 pb-16 px-6 lg:px-12 bg-transparent overflow-hidden">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight mb-8 text-white drop-shadow-md"
        >
          Reconnect with Indian <em className="italic font-light text-gold-light">culture</em>, wherever you are.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 max-w-3xl mb-12 font-light drop-shadow-sm"
        >
          Sanskriti brings together devotional music, cultural storytelling, festivals, and family learning in one premium platform for global Indian families.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#waitlist"
            onClick={scrollToWaitlist}
            className="bg-gold hover:bg-gold-light text-peacock font-semibold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Join the Waitlist
          </a>
        </motion.div>

        <motion.div
          id="watch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-col items-center w-full"
        >
          <div className="text-sm tracking-widest text-gold-light uppercase flex items-center gap-3 mb-8">
            <span className="w-12 h-[1px] bg-gold-light/50"></span>
            WATCH: The Sanskriti Story
            <span className="w-12 h-[1px] bg-gold-light/50"></span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-black/50 p-2 backdrop-blur-sm"
          >
            <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center relative border border-white/5">
              <iframe
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/d1SOW1iVwKU"
                title="Sanskriti Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
              </iframe>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
