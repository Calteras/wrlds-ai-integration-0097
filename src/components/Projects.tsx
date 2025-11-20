import { useState, useRef, useEffect, TouchEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    id: 1,
    title: "Patient Monitoring Systems",
    brand: "Advanced ICU Solutions",
    description:
      "Comprehensive patient monitoring equipment providing real-time vital signs tracking, multi-parameter displays, and advanced alarm systems for critical care environments.",
    tags: ["Monitoring", "ICU", "Vital Signs", "Critical Care"],
    imageUrl: "/lovable-uploads/93ab0638-8190-4ccf-897f-21fda7f4f5ad.png",
    isFeatured: true,
    link: "/projects/firecat",
    details: `
      Our patient monitoring systems deliver cutting-edge technology for healthcare facilities. Features include continuous vital signs monitoring, ECG, SpO2, blood pressure, temperature tracking, and integrated alarm systems. Benefits: enhanced patient safety, centralized monitoring capabilities, seamless EMR integration, and 24/7 technical support with rapid response times.
    `,
  },
  {
    id: 2,
    title: "Diagnostic Imaging Equipment",
    brand: "Calterras Imaging Solutions",
    description:
      "State-of-the-art diagnostic imaging systems including ultrasound, X-ray, and MRI equipment for accurate medical assessments.",
    tags: ["Imaging", "Diagnostics", "Radiology", "Medical Technology"],
    imageUrl: "/lovable-uploads/b0622048-17b4-4c75-a3f0-6c9e17de1d09.png",
    link: "/projects/sport-retail",
  },
  {
    id: 3,
    title: "Surgical Instruments & Equipment",
    brand: "Precision Surgical Systems",
    description:
      "Premium surgical instruments and operating room equipment designed for precision, reliability, and optimal surgical outcomes.",
    tags: ["Surgery", "OR Equipment", "Precision Tools", "Medical Devices"],
    imageUrl: "/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png",
    link: "/projects/workwear",
  },
  {
    id: 4,
    title: "Laboratory & Testing Solutions",
    brand: "Clinical Lab Systems",
    description:
      "Complete laboratory equipment including analyzers, centrifuges, and testing instruments for accurate clinical diagnostics and research.",
    tags: ["Laboratory", "Clinical Testing", "Diagnostics", "Research"],
    imageUrl: "/lovable-uploads/c30e0487-2fa0-41d1-9a0b-699cb2855388.png",
    link: "/projects/hockey",
  },
  {
    id: 5,
    title: "Sterilization & Hygiene Systems",
    brand: "Medical Sterilization Solutions",
    description:
      "Advanced sterilization equipment and hygiene systems ensuring the highest standards of infection control and patient safety.",
    tags: ["Sterilization", "Infection Control", "Safety", "Hygiene"],
    imageUrl: "/lovable-uploads/d5ce901e-2ce0-4f2a-bce1-f0ca5d6192df.png",
    link: "/projects/pet-tracker",
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setActiveProject((prev) => (prev + 1) % projects.length);
    } else if (isRightSwipe) {
      setActiveProject(
        (prev) => (prev - 1 + projects.length) % projects.length
      );
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === activeProject) return "scale-100 opacity-100 z-20";
    if (index === (activeProject + 1) % projects.length)
      return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (activeProject - 1 + projects.length) % projects.length)
      return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="bg-white py-24 md:py-32 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 max-w-3xl mx-auto transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Healthcare Equipment Solutions
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore our comprehensive range of medical equipment and healthcare
            products serving hospitals and healthcare institutions worldwide
            specific needs.
          </p>
          {isMobile && (
            <div className="flex items-center justify-center mt-4 animate-pulse-slow">
              <div className="flex items-center text-blue-500">
                <ChevronLeft size={16} />
                <p className="text-sm mx-1">Swipe to navigate</p>
                <ChevronRight size={16} />
              </div>
            </div>
          )}
        </div>

        <div
          className="relative h-[550px] overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(
                  index
                )}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card className="overflow-hidden h-[500px] border border-blue-100 shadow-sm hover:shadow-md flex flex-col">
                  <div
                    className="relative bg-blue-900 p-6 flex items-center justify-center h-48 overflow-hidden"
                    style={{
                      backgroundImage: `url(${project.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.brand.toUpperCase()}
                      </h3>
                      <div className="w-12 h-1 bg-white mb-2"></div>
                      <p className="text-white/90 text-sm">{project.title}</p>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-gray-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium">
                        {project.brand}
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {project.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs animate-pulse-slow"
                            style={{ animationDelay: `${idx * 300}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={project.link}
                        className="text-blue-600 flex items-center hover:underline relative overflow-hidden group"
                        onClick={() => {
                          if (project.link.startsWith("/")) {
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        <span className="relative z-10">Learn more</span>
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {!isMobile && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-blue-600 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110"
                onClick={() =>
                  setActiveProject(
                    (prev) => (prev - 1 + projects.length) % projects.length
                  )
                }
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-blue-600 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110"
                onClick={() =>
                  setActiveProject((prev) => (prev + 1) % projects.length)
                }
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {projects.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeProject === idx
                    ? "bg-blue-600 w-5"
                    : "bg-gray-300 hover:bg-blue-400"
                }`}
                onClick={() => setActiveProject(idx)}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
