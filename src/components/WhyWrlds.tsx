import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart, Sparkles, Zap, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef, {
    once: true,
    margin: "-100px",
  });
  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;
    const startAnimation = (timestamp: number) => {
      startTime = timestamp;
      animate(timestamp);
    };
    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = progress * end;
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(startAnimation);
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, inView]);
  return (
    <span ref={countRef} className="font-bold tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const features = [
  {
    ordinal: "01",
    icon: BarChart,
    title: "Industry-First Thinking",
    description:
      "Every product is designed from within the industry it serves — shaped by real operators, not just engineers.",
  },
  {
    ordinal: "02",
    icon: Sparkles,
    title: "Modern, Scalable Tech Stack",
    description:
      "Built on cloud-native architecture that scales from a single outlet to enterprise operations without friction.",
  },
  {
    ordinal: "03",
    icon: Zap,
    title: "Fast Onboarding & Support",
    description:
      "Rapid deployment with guided onboarding and hands-on training so your team is operational from day one.",
  },
  {
    ordinal: "04",
    icon: Rocket,
    title: "Long-term Growth Partnership",
    description:
      "We grow alongside your business — with continuous product updates, strategic support, and expanding capabilities.",
  },
];

const stats = [
  { end: 4, suffix: " Industries", label: "F&B, HR, Healthcare & Agriculture" },
  { end: 500, suffix: "+", label: "Businesses powered by Calterras" },
  { end: 24, suffix: "/7", label: "Ongoing support & dedicated success" },
];

const WhyCalterras = () => {
  return (
    <section
      id="why-Calterras"
      className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* Blur blobs */}
      <div data-gsap-blob className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div data-gsap-blob className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Header Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p data-gsap-eyebrow className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              WHY CALTERRAS
            </p>
            <h2 data-gsap-heading className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Why Build With Calterras?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              We don't just build software — we embed ourselves into industries
              and create technology that drives lasting operational transformation.
            </p>
            <Link
              to="/development-process"
              onClick={() => window.scrollTo(0, 0)}
              className="border border-white/20 text-white hover:bg-white hover:text-gray-950 rounded-lg px-6 py-3 text-sm font-medium transition-all inline-flex items-center gap-2 mt-6 w-fit"
            >
              Learn how we work →
            </Link>
          </motion.div>
        </div>

        {/* Stats Band */}
        <div className="border-y border-white/10 py-12 my-16">
          <motion.div
            className="grid grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                data-gsap-stat
                className="text-center px-8 border-r border-white/10 last:border-r-0"
              >
                <div className="text-5xl md:text-6xl font-bold text-white tabular-nums">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} decimals={0} />
                </div>
                <p className="text-gray-500 text-sm mt-2 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          data-gsap-cards
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.ordinal}
                variants={itemVariants}
                className="bg-white/[0.03] p-10 group hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-white/10 group-hover:bg-blue-500/20 transition-colors rounded-xl p-3">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors tabular-nums select-none">
                    {feature.ordinal}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyCalterras;
