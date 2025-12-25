import { Linkedin, Mail } from "lucide-react";
import lumbanyaImage from "@/assets/lumbanya-mulenga.jpeg";
import natashaImage from "@/assets/natasha-fumbauta.jpeg";

const team = [
  {
    name: "Lumbanya J. Mulenga",
    role: "Managing Partner",
    specialty: "Business Development & Regulatory Compliance",
    bio: "Lumbanya J. Mulenga is an Advocate of the High Court of Zambia (AHCZ), and a legal practitioner with vast experience in mentoring and teaching law students. His passion lies in helping students think beyond the classroom and hone the skills required to excel as future legal practitioners and leaders.",
    image: lumbanyaImage
  },
  {
    name: "Natasha Keturah Fumbauta",
    role: "Managing Partner",
    specialty: "Publicity & Student Affairs",
    bio: "Natasha Keturah Fumbauta is a lawyer with extensive teaching experience, having tutored a wide range of courses at the University of Lusaka. She is passionate about student development, academic excellence, and empowering learners to unlock their full potential.",
    image: natashaImage
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-body font-semibold text-accent uppercase tracking-widest mb-4">
            Our Leadership
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Led by experienced legal professionals dedicated to shaping the next generation 
            of leaders in law and professional practice.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 card-hover"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-primary-foreground/80 font-medium">
                    {member.role}
                  </p>
                  <p className="font-body text-sm text-primary-foreground/60">
                    {member.specialty}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="p-6">
                <p className="font-body text-muted-foreground leading-relaxed text-sm">
                  {member.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex gap-3 mt-6">
                  <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
