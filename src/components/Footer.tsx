import { ArrowRight, Linkedin, TwitterIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const EMAILJS_SERVICE_ID = "service_i3h66xg";
      const EMAILJS_TEMPLATE_ID = "template_fgq53nh";
      const EMAILJS_PUBLIC_KEY = "wQmcZvoOqTAhGnRZ3";

      const templateParams = {
        from_name: "Website Subscriber",
        from_email: email,
        message: `New subscription request from the website footer.`,
        to_name: "Calterras Team",
        reply_to: email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });

      setEmail("");
    } catch (error) {
      console.error("Error sending subscription:", error);

      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-blue-900 via-blue-900 to-indigo-700  text-white pt-16 pb-8 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-blue-700">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* <motion.div
              className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/60 to-blue-500/60 rounded-full blur-xl"
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
              className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
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
          <div className="lg:col-span-2 max-w-[85%]">
            <div className="bg-white/10 backdrop-blur-sm rounded-full drop-shadow-md p-4 border border-white/20 inline-block shadow-lg">
              <img
                src="/assets/icons/icon-main.png"
                alt="Calterras Group Logo"
                className="h-10 w-auto drop-shadow-xl"
              />
            </div>

            <p className="text-gray-200 mb-6">
              Calterras Holding is a leading provider of advanced healthcare
              equipment and medical products, serving hospitals, clinics, and
              healthcare institutions with quality solutions and comprehensive
              support.
            </p>
            <p className="text-gray-200 mb-6">
              Medical District Plaza
              <br />
              Suite 100, Healthcare Avenue
              <br />
              Medical City, MC 12345
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/calterras-co"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-gray-200 transition-colors hover:bg-blue-700 hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/calterrasco"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-gray-200 transition-colors hover:bg-blue-700 hover:text-white"
              >
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Get in Touch</h3>
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 bg-blue-800 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Calterras Holdingss. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
