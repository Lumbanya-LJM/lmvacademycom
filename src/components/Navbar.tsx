import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import lmvLogo from "@/assets/lmv-logo.png";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Leadership" },
  { href: "#updates", label: "Updates" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img 
              src={lmvLogo} 
              alt="LMV Academy Logo" 
              className={`h-10 md:h-12 w-auto transition-all duration-500 ${
                isScrolled ? "opacity-100" : "opacity-0 scale-90"
              }`}
            />
            <span className={`font-heading text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-primary" : "text-primary-foreground"
            }`}>
              LMV Academy
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`font-body text-sm font-medium transition-colors duration-300 link-underline ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-primary-foreground/90 hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://app.lmvacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-body text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              <LogIn className="w-4 h-4" />
              Portal
            </a>
            <Button
              variant={isScrolled ? "default" : "hero-outline"}
              size="sm"
              onClick={() => scrollToSection("#contact")}
            >
              Join the Academy
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background rounded-lg shadow-elevated p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-md transition-colors font-body"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://app.lmvacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-md transition-colors font-body"
            >
              <LogIn className="w-4 h-4" />
              Student/Tutor Portal
            </a>
            <Button
              variant="default"
              className="w-full mt-2"
              onClick={() => scrollToSection("#contact")}
            >
              Join the Academy
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
