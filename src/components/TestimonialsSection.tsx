import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Quote, Play, Image } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Law Student",
    quote: "LMV Academy transformed my approach to learning. The mentorship I received helped me secure my dream internship at a top law firm.",
    image: null,
  },
  {
    name: "David K.",
    role: "Business Graduate",
    quote: "The practical skills and professional development sessions gave me confidence I never knew I had. Highly recommend to any serious student.",
    image: null,
  },
  {
    name: "Grace N.",
    role: "Engineering Student",
    quote: "The tutoring support was exceptional. My grades improved significantly, and I learned how to think critically about complex problems.",
    image: null,
  },
];

const activityPlaceholders = [
  { type: "image", label: "Workshop Session" },
  { type: "video", label: "Mentorship Highlight" },
  { type: "image", label: "Student Presentation" },
  { type: "image", label: "Networking Event" },
  { type: "video", label: "Academy Tour" },
  { type: "image", label: "Graduation Ceremony" },
];

const TestimonialsSection = () => {
  const { ref: sectionRef } = useScrollReveal();
  const { ref: headerRef } = useScrollReveal();
  const { ref: testimonialsRef } = useScrollReveal();
  const { ref: galleryRef } = useScrollReveal();

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div ref={sectionRef} className="container-narrow mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Student Voices
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Hear from our students who have transformed their academic and professional journeys with LMV Academy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`reveal stagger-${index + 1} bg-background rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-elevated transition-all duration-300 relative`}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Avatar Placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <span className="font-heading text-xl font-bold text-primary">
                  {testimonial.name.charAt(0)}
                </span>
              </div>

              <blockquote className="font-body text-foreground/80 italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div>
                <p className="font-heading font-semibold text-foreground">{testimonial.name}</p>
                <p className="font-body text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Gallery */}
        <div ref={galleryRef} className="reveal">
          <div className="text-center mb-10">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              Academy in Action
            </h3>
            <p className="font-body text-muted-foreground">
              Glimpses of our workshops, events, and student activities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {activityPlaceholders.map((item, index) => (
              <div
                key={index}
                className={`reveal stagger-${(index % 4) + 1} aspect-video bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer group`}
              >
                {item.type === "video" ? (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Play className="w-5 h-5 text-primary ml-0.5" />
                  </div>
                ) : (
                  <Image className="w-10 h-10 text-primary/40 group-hover:text-primary/60 transition-colors" />
                )}
                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
