import { useEffect, useRef, useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const industries = [
  "I run a restaurant and need a POS system",
  "I need an HR system for my growing team",
  "I manage a hospital and need procurement tools",
  "I'm in agriculture and want smarter operations",
  "I need delivery management for my F&B business",
  "I want to digitize my HR payroll process",
  "I need a supply chain platform for medical equipment",
  "I want farm analytics and yield forecasting",
];

const liveActivities = [
  { name: "Ahmad R.", action: "just onboarded TerraPOS for his 3-outlet café chain" },
  { name: "PT Maju Bersama", action: "is automating payroll with Acheron HR On" },
  { name: "RSUD Harapan", action: "is sourcing medical supplies via Orion Health Gateway" },
  { name: "Kelompok Tani Makmur", action: "activated Evita Agriculture crop monitoring" },
  { name: "Budi S.", action: "integrated online delivery with TerraPOS" },
  { name: "HR Director L.", action: "set up performance reviews on Acheron HR On" },
  { name: "Clinic Manager D.", action: "completed first tender cycle on Orion Health Gateway" },
  { name: "Pak Sutrisno", action: "connected his farm to Evita's buyer marketplace" },
  { name: "Warung Digital Co.", action: "is scaling to 10 outlets with TerraPOS" },
  { name: "Startup HR Team", action: "went live with recruitment workflows on Acheron" },
];

const Features = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % liveActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Query:", searchQuery);
    }, 1000);
  };

  const titleWords = "Find the right technology for your business".split(" ");

  return (
    <section
      id="features"
      className="relative bg-slate-50 overflow-hidden py-24 md:py-32 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 data-gsap-heading className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: titleWords.length * 0.1 }}
            className="text-xl text-slate-600 leading-relaxed"
          >
            Tell us about your business and we'll point you to the right
            Calterras solution — whether you're in F&B, HR, healthcare, or
            agriculture.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="relative">
                <textarea
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe your business challenge or what you're looking to solve..."
                  maxLength={1000}
                  rows={4}
                  className="w-full px-4 py-3 pr-24 text-base text-gray-900 placeholder-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !searchQuery.trim()}
                  className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2 font-normal text-[15px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? "Matching..." : "Find Solution"}
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {industries.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSearchQuery(option)}
                    className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </form>

            <div className="border-t border-slate-200 bg-blue-50 px-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-slate-700">
                  Live across our portfolio
                </span>
              </div>

              <div className="bg-white rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  {liveActivities
                    .slice(currentActivityIndex, currentActivityIndex + 3)
                    .map((activity, index) => (
                      <motion.div
                        key={`${currentActivityIndex}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 border-b border-slate-100 last:border-b-0"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Send className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <p className="text-sm text-slate-700 flex-1">
                          <strong className="font-semibold">{activity.name}</strong>{" "}
                          {activity.action}
                        </p>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-600 mb-4">
              Powering businesses across F&B, HR, Healthcare, and Agriculture
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-full hover:bg-slate-50 transition-all"
              >
                <span className="text-[15px] font-normal">Talk to our team</span>
                <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white transform -rotate-45" />
                </div>
              </Button>

              <Button
                onClick={() => {
                  document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
              >
                <span className="text-[15px] font-normal">View all solutions</span>
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-900 transform -rotate-45" />
                </div>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
