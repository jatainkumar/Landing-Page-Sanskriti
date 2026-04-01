"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Why Sanskriti", href: "#why" },
  { name: "What We Offer", href: "#offers" },
  { name: "Who It's For", href: "#who" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === "body" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
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
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-peacock/90 backdrop-blur-md border-b border-white/10 py-4 shadow-xl" : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a
            href="#"
            onClick={(e) => scrollToSection(e, "body")}
            className="text-2xl font-serif text-white flex items-center gap-2 group cursor-pointer"
          >
            <span className="w-3 h-3 rounded-full bg-gold transition-transform group-hover:scale-125"></span>
            Sanskriti
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#waitlist"
              onClick={(e) => scrollToSection(e, "#waitlist")}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:border-gold-light"
            >
              Join Waitlist
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-peacock/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 px-6 pt-20"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl text-white font-serif hover:text-gold-light transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={(e) => scrollToSection(e, "#waitlist")}
              className="mt-4 bg-gold hover:bg-gold-light text-peacock w-full max-w-sm text-center px-6 py-4 rounded-xl text-lg font-medium transition-all"
            >
              Join the Waitlist
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
