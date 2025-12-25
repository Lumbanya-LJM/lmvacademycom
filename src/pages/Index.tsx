import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import UpdatesSection from "@/components/UpdatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LMV Academy | Luminary Innovision Academy - Empowering Future Leaders</title>
        <meta 
          name="description" 
          content="LMV Academy delivers mentorship, live learning, professional growth tools, and academic development support. Empowering students and young professionals in Zambia." 
        />
        <meta name="keywords" content="LMV Academy, Luminary Innovision Academy, mentorship, legal education, professional development, Zambia, law training" />
        <link rel="canonical" href="https://lmvacademy.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="LMV Academy | Empowering Future Leaders" />
        <meta property="og:description" content="Mentorship, live learning, and professional development for tomorrow's leaders." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lmvacademy.com" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LMV Academy | Empowering Future Leaders" />
        <meta name="twitter:description" content="Mentorship, live learning, and professional development for tomorrow's leaders." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TeamSection />
          <UpdatesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
