import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import UpdatesSection from "@/components/UpdatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const Index = () => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://app.lmvacademy.com";
  const ogImageUrl = `${siteUrl}/og-image.jpg`;

  return (
    <>
      <Helmet>
        <title>LMV Academy | Luminary Innovision Academy - Empowering Future Leaders</title>
        <meta
          name="description"
          content="LMV Academy delivers mentorship, live learning, professional growth tools, and academic development support. Empowering students and young professionals in Zambia."
        />
        <meta
          name="keywords"
          content="LMV Academy, Luminary Innovision Academy, mentorship, legal education, professional development, Zambia, law training"
        />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="LMV Academy | Empowering Future Leaders" />
        <meta
          property="og:description"
          content="Mentorship, live learning, and professional development for tomorrow's leaders."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LMV Academy | Empowering Future Leaders" />
        <meta
          name="twitter:description"
          content="Mentorship, live learning, and professional development for tomorrow's leaders."
        />
        <meta name="twitter:image" content={ogImageUrl} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TeamSection />
          <TestimonialsSection />
          <UpdatesSection />
          <ContactSection />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </>
  );
};

export default Index;
