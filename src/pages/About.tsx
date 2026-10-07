import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <section className="pt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[65vh] bg-gradient-to-br from-black via-blue-900 to-indigo-900 overflow-hidden mb-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
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
            />
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
          </div>
          <div className="max-w-[55%] mx-auto h-full flex flex-col justify-center ">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-2"
            >
              <div className="w-24 h-1 bg-blue-400 mb-4" />
              <p className="text-xl text-slate-300">About</p>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-slate-300 max-w-4xl">
                Where trust <br /> meets competency
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-300 mb-12 text-right"
            >
              We're a team of innovators dedicated to <br /> revolutionizing
              smart textile technology <br /> for industries worldwide.
            </motion.p>
          </div>
        </motion.div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-gray-600">
                  At Calterras Technologies, we're on a mission to transform
                  ordinary textiles into intelligent, data-driven solutions that
                  improve safety, performance, and quality of life across
                  industries.
                </p>
                <p className="text-gray-600">
                  We believe that by embedding intelligence into everyday
                  fabrics, we can create a more connected, responsive, and safer
                  world.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                    <span>
                      <strong>Innovation:</strong> We push boundaries to create
                      solutions that weren't possible before.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                    <span>
                      <strong>Quality:</strong> We're committed to excellence in
                      every sensor, algorithm, and solution we deliver.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                    <span>
                      <strong>Collaboration:</strong> We work closely with our
                      clients to ensure their unique needs are met.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gray-700 mt-1 mr-3 flex-shrink-0" />
                    <span>
                      <strong>Impact:</strong> We measure success by the
                      tangible differences our technology makes in the real
                      world.
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <p className="text-gray-600 mb-4">
                  We started with the ambition to make an inherently scattered
                  and complex development area modular, smart and available to
                  analog brands. After successfully raising millions of dollars
                  for development, we spent the first two years in full code
                  mode.
                </p>
                <p className="text-gray-600 mb-4">
                  The goal was to turn all the scattered hardware and building
                  blocks into simple modules to be assembled like Lego. During
                  this time we took in a range of customers for whom we built
                  prototypes - a way for us to make sure what we built had
                  bearing in real world use cases.
                </p>
                <p className="text-gray-600">
                  In 2023 we felt we had reached a technology level allowing us
                  to start working on enterprise level. Since then, we have
                  focused on textile integrations because of the enormous
                  potential smart textiles have across multiple industries from
                  healthcare to public safety.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Our Team</h2>
              <p className="text-gray-600 mb-8">
                Our diverse team combines expertise in textile engineering,
                electronics, software development, artificial intelligence, and
                industry-specific knowledge to deliver holistic solutions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Saifulloh Fadli",
                    role: "CEO and Founder",
                    bio: "Leading Calterras Technologies with a vision to transform the future of smart textiles.",
                    image:
                      "/lovable-uploads/aa5291bd-2417-4c1e-9a02-0bcc71a92507.png",
                  },
                  {
                    name: "Niek Bijman",
                    role: "Software Lead",
                    bio: "Specializing in cloud infrastructure and APIs for seamless data integration.",
                    image:
                      "/lovable-uploads/e502f601-c519-43a8-86f5-5fa89ae50d2f.png",
                  },
                  {
                    name: "Chengjie Li",
                    role: "Hardware Lead",
                    bio: "Expert in embedded systems engineering, leading our hardware development efforts.",
                    image:
                      "/lovable-uploads/3de85ddd-15e1-4216-9697-f91abb9a47ce.png",
                  },
                  {
                    name: "Love",
                    role: "COO",
                    bio: "Overseeing daily operations and ensuring business objectives are met effectively.",
                    image:
                      "/lovable-uploads/a9bb9110-964a-43b0-a5ab-7162140cd133.png",
                  },
                ].map((member, i) => (
                  <Card
                    key={i}
                    className="bg-gray-50 border border-gray-100 overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-32 relative mb-4 rounded-full overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover filter grayscale"
                          />
                        </div>
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">
                          {member.role}
                        </p>
                        <p className="text-gray-600 text-sm">{member.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              to="/careers"
              className="inline-flex items-center px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all group"
            >
              Join Our Team
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
