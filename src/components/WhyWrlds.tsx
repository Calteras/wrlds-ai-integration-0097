import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  BarChart,
  AlertTriangle,
  Clock4,
  Rocket,
  Zap,
  Sparkles,
  ArrowRight,
  Award,
  Target,
  Shield,
  ChartBar,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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

const WhyCalterras = () => {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8,
      },
    },
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };
  return (
    <section
      id="why-Calterras"
      className="relative py-24 md:py-32 bg-gradient-to-br from-white via-blue-100 to-indigo-200 overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Why Choose Calterras?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Trusted by leading healthcare institutions for delivering quality
            medical equipment and comprehensive support
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="bg-white p-10 rounded-2xl text-center hover:shadow-lg transition-all"
          >
            <h3 className="text-gray-900 text-5xl lg:text-6xl font-bold mb-4">
              <AnimatedCounter end={658} decimals={0} suffix="B" />
            </h3>
            <p className="text-gray-600 text-lg">
              Global healthcare equipment market value projected by 2030
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-10 rounded-2xl text-center hover:shadow-lg transition-all"
          >
            <h3 className="text-gray-900 text-5xl lg:text-6xl font-bold mb-4">
              <AnimatedCounter end={500} suffix="+" />
            </h3>
            <p className="text-gray-600 text-lg">
              Healthcare facilities trust our reliable medical equipment
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white p-10 rounded-2xl text-center hover:shadow-lg transition-all"
          >
            <h3 className="text-gray-900 text-5xl lg:text-6xl font-bold mb-4">
              <AnimatedCounter end={24} suffix="/7" />
            </h3>
            <p className="text-gray-600 text-lg">
              Round-the-clock technical support and maintenance
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What We Deliver for Your Institution
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare equipment solutions designed to enhance
              patient care and operational efficiency
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-gray-900 rounded-lg p-3 mr-6">
                  <BarChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Quality Medical Equipment
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Certified, reliable equipment meeting international
                    healthcare standards and regulatory requirements.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-gray-900 rounded-lg p-3 mr-6">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Latest Technology
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Access to cutting-edge medical technology and innovative
                    healthcare solutions.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-gray-900 rounded-lg p-3 mr-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Fast Installation & Support
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Rapid deployment and comprehensive training to ensure
                    seamless integration.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-start">
                <div className="bg-gray-900 rounded-lg p-3 mr-6">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Long-term Partnership
                  </h4>
                  <p className="text-gray-600 text-lg">
                    Ongoing maintenance, upgrades, and dedicated support for
                    your facility's growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-16">
            <Link
              to="/development-process"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all group text-lg font-medium"
            >
              Learn more about our service process
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCalterras;
