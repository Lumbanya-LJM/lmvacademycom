import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Information We Collect",
    body: "When you register for a programme or contact us, we collect your name, email address, phone number, and the details you share with us. Payment details are processed securely by our payment provider and are never stored on our servers.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to manage your registrations, deliver our programmes, communicate with you about your enrolment, and respond to your enquiries. We do not sell your personal information to third parties.",
  },
  {
    title: "Data Storage & Security",
    body: "Your information is stored securely with restricted access. Registration records are kept so we can confirm your enrolment and payment status, and provide your certificate of completion.",
  },
  {
    title: "Your Rights",
    body: "You may ask us at any time to view, correct, or delete the personal information we hold about you. Contact us at info@lmvacademy.com and we will respond promptly.",
  },
  {
    title: "Contact",
    body: "For any privacy questions, email info@lmvacademy.com or message us on WhatsApp at +260 974 534 253.",
  },
];

const PrivacyPolicy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | LMV Academy</title>
      <meta name="description" content="How Luminary Innovision Academy collects, uses, and protects your personal information." />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-padding">
        <div className="container-narrow mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="font-body text-sm text-muted-foreground mb-10">Last updated: September 2026</p>
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-2">{s.title}</h2>
                <p className="font-body text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default PrivacyPolicy;
