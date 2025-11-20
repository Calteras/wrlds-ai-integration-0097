import { Arrow } from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Globe } from "./Globe";

const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Advanced", "Innovative", "Reliable", "Modern"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xDrift: Math.random() * 40 - 20, // -20px to 20px drift
      duration: 6 + Math.random() * 4, // 6-10 seconds
      delay: Math.random() * 3,
      color: i % 2 === 0 ? "147, 197, 253" : "196, 181, 253",
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.div
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Subtle gradient orb */}
      {/* <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/10 to-blue-300/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      /> */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -50, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-indigo-400/30 via-purple-400/30 to-fuchsia-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-end">
        <div className="relative h-full aspect-square opacity-40 translate-x-[30%] -translate-y-[25%]">
          <Globe />
        </div>
      </div>

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: `rgba(${particle.color}, 0.4)`,
          }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
          animate={{
            y: [0, -50, 0],
            x: [0, particle.xDrift, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            times: [0, 0.5, 1], // Evenly distribute keyframes
            ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smoother easing
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative z-10 w-full mx-auto px-6 lg:px-8 max-w-6xl pt-32 pb-20 flex flex-col items-center justify-center min-h-screen">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-2 mb-8"
          variants={itemVariants}
        >
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm font-medium text-blue-200">
            Trusted by Healthcare Leaders
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
            <br />
            Healthcare Solutions
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          className="text-center text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12"
          variants={itemVariants}
        >
          Equipment that transforms care. Technology that empowers providers.
        </motion.p>

        {/* CTA Section */}
        <div className="flex flex-row gap-3 pt-3 border-t border-white/10">
          <Link
            to="/careers"
            className="flex items-center gap-3 justify-between px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <span className="text-white text-[15px] leading-none">
              Explore Solutions
            </span>
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-gray-900" />
            </div>
          </Link>

          <button className="flex items-center gap-3 justify-between px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
            <span className="text-white text-[15px] leading-none">
              Request Demo
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-blue-900" />
            </div>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
