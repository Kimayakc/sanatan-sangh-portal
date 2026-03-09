import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ObjectivesGrid from "@/components/ObjectivesGrid";
import MembershipCTA from "@/components/MembershipCTA";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
      <ObjectivesGrid />
      <MembershipCTA />
    </main>
    <Footer />
  </div>
);

export default Index;
