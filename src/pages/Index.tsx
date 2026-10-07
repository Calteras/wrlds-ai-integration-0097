import PageLayout from "@/components/PageLayout";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Features from "@/components/Features";
import Projects from "@/components/Projects";
import WhyCalterras from "@/components/WhyWrlds";
import BlogPreview from "@/components/BlogPreview";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useGsapPageAnimations } from "@/hooks/useGsapPageAnimations";

const Index = () => {
  const pageRef = useGsapPageAnimations();

  useEffect(() => {
    const contactElements = document.querySelectorAll('[id="contact"]');
    if (contactElements.length > 1) {
      contactElements[1].id = "contact-footer";
    }
  }, []);

  return (
    <PageLayout>
      <SEO
        title="Calterras — Elevate Your Business Through Technology & Innovation"
        description="Calterras Holdings is a technology and innovation group building industry-focused software companies — TerraPOS for F&B, Acheron HR On for HR, Orion Health Gateway for healthcare procurement, and Evita Agriculture for agribusiness."
        imageUrl="/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png"
        keywords={[
          "Calterras Holdings",
          "technology holding company",
          "TerraPOS",
          "Acheron HR On",
          "Orion Health Gateway",
          "Evita Agriculture",
          "F&B technology",
          "HR management system",
          "healthcare procurement",
          "agricultural technology",
          "business innovation",
        ]}
      />

      {/* ── Scroll progress bar ────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent pointer-events-none">
        <div
          data-gsap-progress
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500"
        />
      </div>

      {/* ── Page animation context ────────────────────────────────────────── */}
      <div ref={pageRef}>
        {/* Hero — always visible, no entrance animation, has parallax */}
        <div data-gsap-hero>
          <Hero />
        </div>

        {/* Solutions */}
        <div data-gsap-section>
          <Solutions />
        </div>

        {/* Features */}
        <div data-gsap-section>
          <Features />
        </div>

        {/* Why Calterras */}
        <div data-gsap-section>
          <WhyCalterras />
        </div>

        {/* Projects */}
        <div data-gsap-section>
          <Projects />
        </div>

        {/* Blog Preview */}
        <div data-gsap-section>
          <BlogPreview />
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
