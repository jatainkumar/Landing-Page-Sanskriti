"use client";

import { useState } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";

const INTERESTS = [
  "Family & Kids",
  "Devotional Music",
  "Festivals & Traditions",
  "Cultural Stories"
];

const COUNTRIES = [
  "India", "United States", "United Kingdom", "Canada", "Australia", "UAE", "Singapore", "Other"
];

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    country: "",
    interests: [] as string[]
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json();
        setErrorMsg(data.detail || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Unable to connect to the server.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-6 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-gold-light" />
        </div>
        <h3 className="text-2xl font-serif text-white mb-2">You're on the list.</h3>
        <p className="text-white/70">Welcome to the Sanskriti founding family circle. We will be in touch soon with launch updates.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-xs text-white/50 mb-1 uppercase tracking-wider">First Name</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-light focus:bg-white/10 transition-colors"
            placeholder="Aarav"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-xs text-white/50 mb-1 uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-light focus:bg-white/10 transition-colors"
            placeholder="aarav@example.com"
          />
        </div>
      </div>

      <div className="flex flex-col relative w-full">
        <label className="text-xs text-white/50 mb-1 uppercase tracking-wider">Location</label>
        <select
          required
          value={formData.country}
          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
          className="w-full appearance-none bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-light focus:bg-white/10 transition-colors cursor-pointer"
        >
          <option value="" disabled className="bg-peacock text-white/50">Select Country</option>
          {COUNTRIES.map(country => (
            <option key={country} value={country} className="bg-peacock text-white">{country}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 bottom-3 w-5 h-5 text-white/50 pointer-events-none" />
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-white/50 mb-3 uppercase tracking-wider">I'm most interested in:</label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(interest => {
            const isSelected = formData.interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${
                  isSelected 
                    ? "bg-gold-light border-gold-light text-peacock font-medium"
                    : "bg-transparent border-white/20 text-white/70 hover:border-white/40"
                }`}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full bg-gold hover:bg-gold-light text-peacock font-semibold text-lg py-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          "Join the Founding Families Waitlist"
        )}
      </button>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center mt-2">{errorMsg}</p>
      )}
    </form>
  );
}
