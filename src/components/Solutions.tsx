import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

// --- Types & Data ---

interface Division {
  index: string;
  name: string;
  tagline: string;
  description: string;
  offerings: string[];
  accent: string;
  accentDim: string;
  iconSrc: string;
  href: string;
  featured?: boolean;
  image: string;
}

const divisions: Division[] = [
  {
    index: "01",
    name: "TerraPOS",
    tagline: "F&B Technology Solutions",
    description:
      "A full-stack platform built for the food & beverage industry. TerraPOS empowers restaurants, cafes, and cloud kitchens to run smarter and scale faster with unified operations.",
    offerings: [
      "Intuitive point-of-sale system",
      "Online ordering & delivery integration",
      "Kitchen display & order routing",
      "Sales analytics & inventory control",
    ],
    accent: "#f97316",
    accentDim: "rgba(249,115,22,0.08)",
    iconSrc: "/assets/icons/ic_terrapos.png",
    href: "/terrapos",
    featured: true,
    image: "/solutions/terrapos_showcase.png",
  },
  {
    index: "02",
    name: "Acheron — HR On",
    tagline: "Human Resource Management",
    description:
      "Streamline the entire employee lifecycle from recruitment to payroll. A modern HR platform designed for compliance and culture.",
    offerings: [
      "Recruitment automation",
      "Payroll & benefits processing",
      "Attendance tracking",
      "Performance KPIs",
    ],
    accent: "#60a5fa",
    accentDim: "rgba(96,165,250,0.08)",
    iconSrc: "/assets/icons/ic_acheron.png",
    href: "/acheron",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
  },
  {
    index: "03",
    name: "Orion Health",
    tagline: "Healthcare Procurement",
    description:
      "Connecting healthcare institutions with verified suppliers. Automating sourcing, compliance, and supply chain management at scale.",
    offerings: [
      "Multi-vendor procurement",
      "Regulatory compliance",
      "Inventory automation",
      "Contract management",
    ],
    accent: "#34d399",
    accentDim: "rgba(52,211,153,0.08)",
    iconSrc: "/assets/icons/ic_orion.png",
    href: "/orion",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  },
  {
    index: "04",
    name: "Evita Agriculture",
    tagline: "Smart Agri-Tech",
    description:
      "Technology-driven tools enabling farmers and agribusinesses to optimize operations, reduce waste, and access wider markets.",
    offerings: [
      "Farm monitoring",
      "Yield forecasting",
      "Supply chain tools",
      "Buyer connectivity",
    ],
    accent: "#a78bfa",
    accentDim: "rgba(167,139,250,0.08)",
    iconSrc: "/assets/icons/ic_evita.png",
    href: "/evita",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
  },
];

// --- Animation Variants ---

const CUSTOM_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: CUSTOM_EASE },
  },
};

// --- Components ---

const FeaturedCard = ({ division }: { division: Division }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative col-span-full rounded-3xl border border-white/10 bg-slate-900/50 overflow-hidden backdrop-blur-sm"
      whileHover={{ borderColor: `${division.accent}40` }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="absolute top-0 left-0 h-[2px] w-full opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${division.accent}, transparent)`,
        }}
      />

      <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-0 h-full">
        {/* Content Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-mono tracking-widest uppercase px-2 py-1 rounded border"
              style={{
                color: division.accent,
                borderColor: `${division.accent}30`,
                backgroundColor: `${division.accent}10`,
              }}
            >
              Featured Solution
            </span>
            <span className="text-slate-500 text-xs font-mono">
              /{division.index}
            </span>
          </div>

          <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            {division.name}
          </h3>

          <p
            className="text-sm font-semibold uppercase tracking-wider mb-6"
            style={{ color: division.accent }}
          >
            {division.tagline}
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
            {division.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
            {division.offerings.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: division.accent }}
                />
                <span className="text-slate-400 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <Link
            to={division.href}
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-base font-semibold transition-all group-hover:gap-3 w-fit"
            style={{ color: division.accent }}
          >
            Explore Platform
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Image Side */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent z-10 md:bg-none" />
          <div
            className="absolute inset-0 opacity-20 z-0 mix-blend-overlay"
            style={{ backgroundColor: division.accent }}
          />
          <img
            src={division.image}
            alt={division.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* ✅ Floating Icon Badge - Smaller container, tighter padding, bigger icon */}
          <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-1.5">
            <img
              src={division.iconSrc}
              alt={`${division.name} icon`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DivisionCard = ({ division }: { division: Division }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative rounded-3xl border border-white/10 bg-slate-900/40 overflow-hidden flex flex-col backdrop-blur-sm transition-colors duration-300 hover:bg-slate-800/40"
      whileHover={{ y: -6, borderColor: `${division.accent}40` }}
    >
      {/* Image Preview Area */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10"
          style={{ backgroundColor: division.accent }}
        />
        <img
          src={division.image}
          alt={division.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

        <div className="absolute top-4 left-4 z-20">
          <span className="text-[10px] font-bold text-white/80 bg-black/30 backdrop-blur-md px-2 py-1 rounded border border-white/10 font-mono">
            {division.index}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow relative">
        <div
          className="absolute -top-8 right-6 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: division.accent }}
        />

        <div className="flex items-center justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 p-1"
            style={{ background: division.accentDim }}
          >
            <img
              src={division.iconSrc}
              alt={`${division.name} icon`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
          {division.name}
        </h3>
        <p
          className="text-[11px] font-bold uppercase tracking-wider mb-4"
          style={{ color: division.accent }}
        >
          {division.tagline}
        </p>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {division.description}
        </p>

        <ul className="space-y-2 mb-6">
          {division.offerings.slice(0, 3).map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: division.accent }}
              />
              <span className="text-slate-400 text-xs">{item}</span>
            </li>
          ))}
        </ul>

        <Link
          to={division.href}
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mt-auto pt-4 border-t border-white/5 transition-all group-hover:border-white/10 group-hover:gap-2.5"
          style={{ color: division.accent }}
        >
          View Details
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
};

// --- Main Section Component ---

const Solutions = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [featured, ...rest] = divisions;

  return (
    <section
      id="solutions"
      className="relative bg-slate-950 py-24 md:py-32 overflow-hidden selection:bg-blue-500/30"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16 md:mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-bold text-blue-200 tracking-widest uppercase">
              Ecosystem Overview
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] max-w-2xl"
            >
              Specialized tech for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300">
                complex industries.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-lg leading-relaxed max-w-md border-l border-white/10 pl-6"
            >
              Each Calterras company is purpose-built to solve specific
              operational challenges, delivering focused technology that drives
              real change.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <FeaturedCard division={featured} />
          {rest.map((d) => (
            <DivisionCard key={d.index} division={d} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
