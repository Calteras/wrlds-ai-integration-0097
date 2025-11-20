import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = document.body;
      const currentScrollY =
        scrollElement.scrollTop ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full"
      )}
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="w-full mx-auto">
        <div
          className={cn(
            "flex items-center justify-center h-20 transition-all duration-300 backdrop-blur-lg border-none",
            isScrolled
              ? "bg-gradient-to-r from-slate-900 via-blue-100 to-indigo-200 shadow-lg"
              : "bg-transparent"
          )}
        >
          <div className="flex-shrink-0 absolute left-8 sm:left-10 lg:left-12 ">
            <Link to="/" className="flex items-center mx-4 my-2">
              <img
                src="/assets/icons/icon-main.png"
                alt="Calterras Holdingss Logo"
                className={cn("h-10 w-auto transition-all duration-300")}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink
                      className={cn(
                        "transition-colors px-4 py-2 text-[15px] font-normal",
                        isActive("/about")
                          ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                          : isScrolled
                          ? "text-gray-900/90 hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={cn(
                        "transition-colors px-4 py-2 text-[15px] font-normal",
                        isActive("/")
                          ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                          : isScrolled
                          ? "text-gray-900/90 hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      Who we are
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/projects/firecat">
                    <NavigationMenuLink
                      className={cn(
                        "transition-colors px-4 py-2 text-[15px] font-normal",
                        isActive("/projects/firecat")
                          ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                          : isScrolled
                          ? "text-gray-900/90 hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      For companies
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink
                      className={cn(
                        "transition-colors px-4 py-2 text-[15px] font-normal",
                        isActive("/blog")
                          ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                          : isScrolled
                          ? "text-gray-900/90 hover:text-gray-900"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      Why join
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={cn(
                      "transition-colors px-4 py-2 text-[15px] font-normal",
                      isScrolled
                        ? "text-gray-900/90 hover:text-gray-900"
                        : "text-white/90 hover:text-white"
                    )}
                  >
                    Contact us
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 absolute right-8 sm:right-10 lg:right-12">
            <Link
              to="/careers"
              className={cn(
                "group relative flex items-center gap-3 px-6 py-2.5 rounded-full backdrop-blur-sm border transition-all duration-300",
                isScrolled
                  ? "bg-gray-100 border-gray-200 hover:bg-gray-200"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              )}
            >
              <span
                className={cn(
                  "text-[15px] font-normal",
                  isScrolled ? "text-gray-900" : "text-white"
                )}
              >
                Sign in
              </span>
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  isScrolled ? "bg-gray-900" : "bg-white"
                )}
              >
                <ArrowUpRight
                  className={cn(
                    "w-4 h-4",
                    isScrolled ? "text-white" : "text-gray-900"
                  )}
                />
              </div>
            </Link>

            <button
              onClick={() => scrollToSection("contact")}
              className="group relative flex items-center gap-3 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
            >
              <span className="text-white text-[15px] font-normal">
                Get started
              </span>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-blue-900" />
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden absolute right-4 sm:right-6 lg:right-8">
            <button
              onClick={toggleMenu}
              className={cn(
                "focus:outline-none transition-colors",
                isScrolled ? "text-gray-900" : "text-white"
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden w-full",
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div
          className={cn(
            "mx-4 mt-2 px-4 pt-4 pb-4 space-y-2 rounded-2xl backdrop-blur-lg border transition-colors",
            isScrolled
              ? "bg-white/90 border-gray-200"
              : "bg-white/10 border-white/20"
          )}
        >
          <Link
            to="/about"
            className={cn(
              "block px-4 py-2.5 rounded-lg text-[15px] transition-colors",
              isActive("/about")
                ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                : isScrolled
                ? "text-gray-900/90 hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10"
            )}
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            About
          </Link>

          <Link
            to="/"
            className={cn(
              "block px-4 py-2.5 rounded-lg text-[15px] transition-colors",
              isActive("/")
                ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                : isScrolled
                ? "text-gray-900/90 hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10"
            )}
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Who we are
          </Link>

          <Link
            to="/projects/firecat"
            className={cn(
              "block px-4 py-2.5 rounded-lg text-[15px] transition-colors",
              isActive("/projects/firecat")
                ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                : isScrolled
                ? "text-gray-900/90 hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10"
            )}
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            For companies
          </Link>

          <Link
            to="/blog"
            className={cn(
              "block px-4 py-2.5 rounded-lg text-[15px] transition-colors",
              isActive("/blog")
                ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                : isScrolled
                ? "text-gray-900/90 hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10"
            )}
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Why join
          </Link>

          <button
            onClick={() => scrollToSection("contact")}
            className={cn(
              "block w-full text-left px-4 py-2.5 rounded-lg text-[15px] transition-colors",
              isScrolled
                ? "text-gray-900/90 hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10"
            )}
          >
            Contact us
          </button>

          <div
            className={cn(
              "pt-3 space-y-2 border-t",
              isScrolled ? "border-gray-200" : "border-white/10"
            )}
          >
            <Link
              to="/careers"
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors",
                isScrolled
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-white/10 hover:bg-white/20"
              )}
              onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              <span
                className={cn(
                  "text-[15px]",
                  isScrolled ? "text-gray-900" : "text-white"
                )}
              >
                Sign in
              </span>
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center",
                  isScrolled ? "bg-gray-900" : "bg-white"
                )}
              >
                <ArrowUpRight
                  className={cn(
                    "w-4 h-4",
                    isScrolled ? "text-white" : "text-gray-900"
                  )}
                />
              </div>
            </Link>

            <button
              onClick={() => {
                scrollToSection("contact");
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <span className="text-white text-[15px]">Get started</span>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-blue-900" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
