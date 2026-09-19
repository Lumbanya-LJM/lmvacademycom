import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const included = [
  "Full moot court training sessions with experienced practitioners",
  "Moot brief preparation guidance and templates",
  "Advocacy and legal argumentation skills coaching",
  "Case presentation and trial technique practice",
  "Personalized feedback on your courtroom performance",
  "Certificate of completion from LMV Academy",
];

const MootCourtSuccess = () => {
  return (
    <>
      <Helmet>
        <title>Registration Confirmed | LMV Academy</title>
        <meta
          name="description"
          content="Your Moot Court Sessions & Training registration is confirmed. See what's included in your package."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="section-padding">
          <div className="container-narrow mx-auto max-w-2xl text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Thank you — you're registered!
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
              Your payment was successful and your spot in the Moot Court Sessions &amp;
              Training is confirmed. A confirmation email with your registration details is
              on its way to your inbox.
            </p>

            <div className="bg-secondary/40 rounded-xl border border-border p-8 text-left mb-10">
              <p className="font-heading text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Your package includes
              </p>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.lmvacademy.com/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Access your student portal
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-body text-sm font-semibold text-foreground hover:bg-secondary/50 transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MootCourtSuccess;
