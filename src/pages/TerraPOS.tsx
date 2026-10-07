import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

const capabilities = [
  "Offline-first checkout for uninterrupted service",
  "Kitchen display and order routing",
  "Online ordering and delivery coordination",
  "Sales, inventory, and operational analytics",
];

const TerraPOS = () => {
  return (
    <PageLayout showContact={false}>
      <SEO
        title="TerraPOS | Offline-first POS for F&B businesses"
        description="TerraPOS is Calterras's offline-first, AI-powered point-of-sale platform for restaurants, cafes, and other F&B businesses."
        imageUrl="/solutions/terrapos_showcase.png"
        keywords={["TerraPOS", "offline-first POS", "F&B software", "point of sale Indonesia"]}
      />

      <main>
        <section className="bg-slate-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-12">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Calterras
            </Link>
            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-amber-300 mb-5">Calterras flagship product</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">TerraPOS</h1>
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8">
                  An offline-first, AI-powered point-of-sale platform for F&B businesses.
                </p>
                <div className="inline-flex items-center gap-2 border border-amber-300/40 bg-amber-300/10 text-amber-200 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  Early Beta
                </div>
              </motion.div>
              <motion.img
                src="/solutions/terrapos_showcase.png"
                alt="TerraPOS kitchen display showing live orders on a tablet"
                className="w-full rounded-2xl shadow-2xl border border-white/10"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">Built for the floor</p>
              <h2 className="text-4xl font-bold text-slate-950 mb-6">Keep service moving when the connection does not.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                TerraPOS brings checkout, kitchen workflows, ordering, and operational insight into one system designed around the realities of restaurants, cafes, and cloud kitchens.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                TerraPOS is currently in early Beta as we onboard our first merchant users. We are working closely with those operators to validate the product in real service environments.
              </p>
            </div>
            <div className="border-l-2 border-amber-300 pl-8">
              <h3 className="text-2xl font-bold text-slate-950 mb-6">What TerraPOS does</h3>
              <ul className="space-y-5">
                {capabilities.map((capability) => (
                  <li key={capability} className="flex gap-3 text-slate-700">
                    <Check className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-500 mb-4">See it in context</p>
              <h2 className="text-4xl font-bold text-slate-950 mb-5">One view for the whole kitchen.</h2>
              <p className="text-lg text-slate-600 leading-relaxed">Orders move from the counter to the kitchen with clear statuses, timing, and item-level detail, helping teams stay aligned during busy service.</p>
            </div>
            <img src="/solutions/terrapos_showcase.png" alt="TerraPOS kitchen display interface" className="w-full rounded-xl shadow-lg" />
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-950 mb-5">Interested in joining the Beta?</h2>
            <p className="text-lg text-slate-600 mb-8">Tell us about your F&B operation and we will connect you with the Calterras team.</p>
            <a href="mailto:hello@calterras.com?subject=TerraPOS%20Beta%20interest" className="inline-flex items-center gap-3 bg-slate-950 text-white px-6 py-3 rounded-md hover:bg-slate-800 transition-colors">
              <Mail className="w-5 h-5" />
              hello@calterras.com
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default TerraPOS;
