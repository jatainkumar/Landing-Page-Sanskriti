"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import WaitlistForm from "./WaitlistForm";

const faqs = [
  {
    question: "When is Sanskriti launching?",
    answer: "We're preparing to open Sanskriti soon. Join the waitlist and you'll be the first to receive launch updates."
  },
  {
    question: "What kind of content will be available?",
    answer: "Sanskriti will offer devotional music, cultural storytelling, festival experiences, family learning, and curated heritage programming."
  },
  {
    question: "Is Sanskriti only for children?",
    answer: "No. Sanskriti is built for the whole family — children, parents, and anyone seeking a deeper connection to Indian culture."
  },
  {
    question: "Will there be founding member benefits?",
    answer: "Yes. Early members will receive first updates on launch access, selected benefits, and special communication as Sanskriti opens."
  },
  {
    question: "Can I join from outside India?",
    answer: "Yes. Sanskriti is being created for Indian families across the world."
  }
];

export default function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full py-32 px-6 lg:px-12 bg-transparent overflow-hidden flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl text-center mb-16"
      >
        <div className="text-gold-light tracking-[0.2em] text-sm uppercase font-semibold mb-4">
          Questions
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-white mb-2">
          What you might be wondering
        </h2>
      </motion.div>

      <div className="w-full max-w-3xl flex flex-col gap-4 mb-32">
        {faqs.map((faq, i) => {
          const isExpanded = expandedFaq === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full border-b border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(isExpanded ? null : i)}
                className="w-full flex justify-between items-center py-6 text-left hover:text-gold-light transition-colors group"
              >
                <span className={`text-xl font-medium transition-colors ${isExpanded ? 'text-gold-light' : 'text-white'}`}>
                  {faq.question}
                </span>
                <span className={`text-white/50 group-hover:text-gold-light transition-colors ${isExpanded ? 'text-gold-light' : ''}`}>
                  {isExpanded ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="pb-6 text-lg text-white/60 font-light pr-12">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        id="waitlist"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl mx-auto flex flex-col items-center bg-white/[0.03] p-10 md:p-14 rounded-3xl border border-white/10 scroll-mt-24"
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4 text-center">
          Join the waitlist. Stay rooted.
        </h2>
        <p className="text-white/60 font-light text-center mb-8">
          Be first in line to experience Sanskriti — a new cultural platform for Indian families across the world.
        </p>
        <WaitlistForm />
      </motion.div>
    </section>
  );
}
