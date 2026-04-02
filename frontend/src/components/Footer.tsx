import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050B14] py-12 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-4">
            <Image
              src="/Sanskriti_White_Horizontal.png"
              alt="Sanskriti Logo"
              width={1081}
              height={411}
              className="object-contain w-40 md:w-52 h-auto"
            />
          </div>
          <p className="text-white/40 text-sm max-w-sm">
            Building a cultural home for global Indian families through music, stories, festivals, and learning.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/50 font-light">
          <a href="#" className="hover:text-gold-light transition-colors">About</a>
          <a href="#" className="hover:text-gold-light transition-colors">Contact</a>
          <a href="#" className="hover:text-gold-light transition-colors">Privacy</a>
          <a href="#" className="hover:text-gold-light transition-colors">Terms</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 text-center text-white/30 text-xs font-light">
        © 2025 Sanskriti. All rights reserved.
      </div>
    </footer>
  );
}
