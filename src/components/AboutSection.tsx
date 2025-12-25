import { Target, Users, Lightbulb, Award } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";

const features = [
  {
    icon: Target,
    title: "Bridge Theory & Practice",
    description: "We connect academic learning with real-world application, ensuring students are ready for professional challenges."
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Learn from experienced practitioners who guide you through every step of your professional journey."
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "We cultivate creative thinking and problem-solving skills essential for modern professionals."
  },
  {
    icon: Award,
    title: "Leadership Development",
    description: "Building confident leaders equipped to make meaningful contributions in their fields."
  }
];

const AboutSection = () => {
  const headerReveal = useScrollReveal();
  const featuresReveal = useScrollReveal({ threshold: 0.05 });
  const missionReveal = useScrollReveal();

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        {/* Section Header */}
        <div 
          ref={headerReveal.ref}
          className={`max-w-3xl mx-auto text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <span className="inline-block text-sm font-body font-semibold text-accent uppercase tracking-widest mb-4">
            About Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Shaping Tomorrow's Leaders
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            LMV Academy exists to empower students and young professionals by bridging the gap 
            between academic theory and professional practice. Through comprehensive coaching, 
            mentoring, and skills-based learning, we create confident future leaders ready to 
            excel in their chosen fields.
          </p>
        </div>

        {/* Features Grid */}
        <div 
          ref={featuresReveal.ref}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group p-8 bg-card rounded-xl border border-border hover:border-primary/20 card-hover reveal ${featuresReveal.isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div 
          ref={missionReveal.ref}
          className={`mt-16 p-8 md:p-12 bg-gradient-to-br from-primary to-accent rounded-2xl text-center reveal-scale ${missionReveal.isVisible ? 'visible' : ''}`}
        >
          <blockquote className="font-heading text-2xl md:text-3xl font-medium text-primary-foreground italic leading-relaxed max-w-3xl mx-auto">
            "Our mission is to nurture academic excellence, foster innovation, and develop 
            the professional competencies that transform students into industry leaders."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
