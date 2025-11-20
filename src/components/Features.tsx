import { useEffect, useRef, useState } from "react";
import { Radio, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Features = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  const quickSearchOptions = [
    "I'm looking for patient monitoring systems",
    "I need diagnostic equipment",
    "Looking for surgical instruments",
    "I need lab testing equipment",
    "Hospital equipment procurement",
    "Medical device consultation",
  ];

  const liveActivities = [
    {
      name: "Dr. Sarah M.",
      action: "just ordered advanced patient monitoring for ICU",
    },
    {
      name: "Hospital Admin J.",
      action: "is comparing diagnostic imaging solutions",
    },
    {
      name: "Procurement Lead K.",
      action: "requested quote for surgical instruments",
    },
    {
      name: "Lab Director R.",
      action: "is evaluating automated testing equipment",
    },
    {
      name: "Chief Medical Officer T.",
      action: "exploring sterilization systems",
    },
    {
      name: "Facilities Manager P.",
      action: "just upgraded to digital X-ray systems",
    },
    {
      name: "ER Director L.",
      action: "implementing real-time monitoring solutions",
    },
    {
      name: "Surgery Center H.",
      action: "ordered minimally invasive surgical tools",
    },
    {
      name: "Research Lab D.",
      action: "acquired molecular diagnostic equipment",
    },
    {
      name: "Clinic Manager V.",
      action: "is seeking medical furniture solutions",
    },
    {
      name: "Hospital Group C.",
      action: "standardizing equipment across facilities",
    },
    {
      name: "Healthcare IT Lead B.",
      action: "integrating smart medical devices",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % liveActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [liveActivities.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle form submission logic here
      console.log("Search query:", searchQuery);
    }, 1000);
  };

  const handleQuickSearch = (option: string) => {
    setSearchQuery(option);
  };

  const titleWords = "Find the medical equipment your facility needs".split(
    " "
  );

  return (
    <section
      id="features"
      className="relative bg-slate-50 overflow-hidden py-24 md:py-32 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Heading with word animation */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
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
            Our AI-powered platform connects you with the right medical
            equipment suppliers and solutions tailored to your healthcare
            facility's specific needs
          </motion.p>
        </div>

        {/* Interactive Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="relative">
                <textarea
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe the type of equipment you're looking for..."
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
                  {isSubmitting ? "Searching..." : "Submit"}
                </Button>
              </div>

              {/* Quick Search Options */}
              <div className="mt-6 flex flex-wrap gap-2">
                {quickSearchOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleQuickSearch(option)}
                    className="px-4 py-2.5 text-sm text-gray-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </form>

            {/* Live Activity Ticker */}
            <div className="border-t border-slate-200 bg-blue-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2371869d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v20M2 12h20'/%3E%3C/svg%3E"
                      alt="Activity"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                      Live community activity
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              {/* Animated Activity Feed */}
              <div className="mt-4 bg-white rounded-lg overflow-hidden">
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
                          <Radio className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-sm text-slate-700 flex-1">
                          <strong className="font-semibold">
                            {activity.name}
                          </strong>{" "}
                          {activity.action}
                        </p>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-4">
              Join thousands of healthcare professionals finding the right
              equipment
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-full hover:bg-slate-50 transition-all"
              >
                <span className="text-[15px] font-normal">Schedule a demo</span>
                <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white transform -rotate-45" />
                </div>
              </Button>

              <Button
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
              >
                <span className="text-[15px] font-normal">Learn more</span>
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
