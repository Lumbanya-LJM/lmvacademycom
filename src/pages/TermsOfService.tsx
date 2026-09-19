import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Our Services",
    body: "Luminary Innovision Academy (LMV Academy) provides academic mentorship, professional skills training, live classes, moot court sessions, and related educational programmes. Programme details, schedules, and pricing are described on this website and may be updated from time to time.",
  },
  {
    title: "Registration & Payment",
    body: "Some programmes require registration and payment in advance. A registration is confirmed once payment is completed successfully. Prices are shown in Zambian Kwacha (K) and, where indicated, charged in US Dollars at the approximate equivalent shown on the programme page.",
  },
  {
    title: "Acceptable Use",
    body: "You agree to provide accurate information when registering, to use our programmes for your own learning, and not to share paid materials or access with others without our permission.",
  },
  {
    title: "Intellectual Property",
    body: "Training materials, templates, and content provided in our programmes remain the property of LMV Academy and are provided for your personal educational use only.",
  },
  {
    title: "Liability",
    body: "Our programmes are educational in nature and do not constitute legal advice. To the fullest extent permitted by law, LMV Academy is not liable for indirect or consequential losses arising from participation in our programmes.",
  },
  {
    title: "Contact",
    body: "Questions about these terms: info@lmvacademy.com or WhatsApp +260 974 534 253.",
  },
];

const TermsOfService = () => (
  <>
    <Helmet>
      <title>Terms of Service | LMV Academy</title>
      <meta name="description" content="The terms that govern use of Luminary Innovision Academy programmes and this website." />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="section-padding">
        <div className="container-narrow mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
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

export default TermsOfService;
