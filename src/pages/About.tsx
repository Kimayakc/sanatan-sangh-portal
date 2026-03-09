import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const About = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <div className="gradient-saffron py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">हमारे बारे में</h1>
      </div>
      <AboutSection />
    </main>
    <Footer />
  </div>
);

export default About;
