import { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useScrollReveal from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const headerReveal = useScrollReveal();
  const formReveal = useScrollReveal();
  const infoReveal = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon."
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={`max-w-3xl mx-auto text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="inline-block text-sm font-body font-semibold text-accent uppercase tracking-widest mb-4">
            Get in Touch
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Ready to take the next step in your professional journey? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div 
            ref={formReveal.ref}
            className={`bg-card rounded-2xl p-8 md:p-10 border border-border reveal-left ${formReveal.isVisible ? 'visible' : ''}`}
          >
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-body font-medium text-foreground mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="h-12"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-body font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="h-12"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-body font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your goals and how we can help..."
                  className="min-h-[150px] resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div 
            ref={infoReveal.ref}
            className={`flex flex-col justify-center reveal-right ${infoReveal.isVisible ? 'visible' : ''}`}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-1">
                    Email Us
                  </h4>
                  <a
                    href="mailto:info@lmvacademy.com"
                    className="font-body text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@lmvacademy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-1">
                    Location
                  </h4>
                  <p className="font-body text-muted-foreground">
                    Lusaka, Zambia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-1">
                    Connect With Us
                  </h4>
                  <p className="font-body text-muted-foreground">
                    Follow us on social media for updates
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="mt-12 p-6 bg-secondary/50 rounded-xl border border-border">
              <p className="font-body text-sm text-muted-foreground italic">
                "Education is not the filling of a pail, but the lighting of a fire."
              </p>
              <p className="font-body text-xs text-muted-foreground mt-2">— William Butler Yeats</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
