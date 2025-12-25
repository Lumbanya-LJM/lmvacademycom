import { Calendar, ArrowRight, Headphones, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const updates = [
  {
    type: "Announcement",
    title: "New Semester Enrollment Now Open",
    excerpt: "Join our upcoming cohort and begin your journey towards professional excellence.",
    date: "December 2024"
  },
  {
    type: "Event",
    title: "Legal Practice Workshop Series",
    excerpt: "A comprehensive workshop on practical skills for aspiring legal practitioners.",
    date: "January 2025"
  },
  {
    type: "News",
    title: "Partnership with Leading Law Firms",
    excerpt: "LMV Academy announces strategic partnerships to enhance student placement opportunities.",
    date: "Coming Soon"
  }
];

const SPOTIFY_PODCAST_URL = "https://creators.spotify.com/pod/profile/luminary-innovision-acade/episodes/Women-in-Leadership-e33h00q";

const UpdatesSection = () => {
  return (
    <section id="updates" className="section-padding bg-secondary/30">
      <div className="container-narrow mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-body font-semibold text-accent uppercase tracking-widest mb-4">
            Stay Updated
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Latest News & Events
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Keep up with the latest announcements, upcoming events, and featured learning content.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Updates Column */}
          <div className="lg:col-span-2 space-y-6">
            {updates.map((update, index) => (
              <article
                key={update.title}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/20 card-hover flex gap-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="hidden sm:flex flex-col items-center justify-center w-20 h-20 bg-primary/10 rounded-xl shrink-0">
                  <Calendar className="w-6 h-6 text-primary mb-1" />
                  <span className="text-xs text-muted-foreground font-body">{update.date.split(" ")[0]}</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block text-xs font-body font-semibold text-accent uppercase tracking-wider mb-2">
                    {update.type}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {update.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    {update.excerpt}
                  </p>
                  <span className="text-xs text-muted-foreground font-body">{update.date}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all self-center shrink-0" />
              </article>
            ))}
          </div>

          {/* Podcast Card */}
          <div className="lg:col-span-1">
            <div className="p-8 bg-gradient-to-br from-primary to-accent rounded-2xl text-primary-foreground h-full flex flex-col">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8" />
              </div>
              <span className="text-sm font-body font-semibold uppercase tracking-wider opacity-80 mb-2">
                Featured Podcast
              </span>
              <h3 className="font-heading text-2xl font-bold mb-4">
                EduConnect Podcast
              </h3>
              <p className="font-body text-primary-foreground/80 mb-8 flex-1 leading-relaxed">
                Join us for insightful discussions on education, legal practice, 
                and professional development. Available on your favorite platforms.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SPOTIFY_PODCAST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="hero-outline"
                    size="sm"
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Spotify
                  </Button>
                </a>
                <Button
                  variant="hero-outline"
                  size="sm"
                  className="gap-2"
                  disabled
                >
                  <ExternalLink className="w-4 h-4" />
                  Apple Podcasts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
