import { GraduationCap, Briefcase, BookOpen, Video, Rocket, Users } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Academic Mentorship",
    description: "Personalized tutoring and guidance from experienced practitioners to help you excel in your studies and examinations."
  },
  {
    icon: Briefcase,
    title: "Professional Skills Training",
    description: "Develop essential workplace competencies including communication, leadership, and career readiness skills."
  },
  {
    icon: BookOpen,
    title: "Research & Study Support",
    description: "Comprehensive research assistance and study tools to enhance your academic performance and understanding."
  },
  {
    icon: Video,
    title: "Live Classes",
    description: "Interactive online learning experiences with real-time engagement, discussions, and practical demonstrations."
  },
  {
    icon: Rocket,
    title: "Growth Programmes",
    description: "Structured workshops and development programmes designed to accelerate your professional journey."
  },
  {
    icon: Users,
    title: "Peer Learning Networks",
    description: "Connect with like-minded learners to share knowledge, collaborate on projects, and build lasting professional relationships."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container-narrow mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-body font-semibold text-accent uppercase tracking-widest mb-4">
            Our Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Learning Solutions
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            We offer a complete suite of educational services designed to support your 
            academic journey and professional development at every stage.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative p-8 bg-background rounded-xl border border-border hover:border-primary/30 overflow-hidden card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
