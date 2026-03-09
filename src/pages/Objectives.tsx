import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ObjectivesGrid from "@/components/ObjectivesGrid";

const Objectives = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <div className="gradient-saffron py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center">हमारे उद्देश्य</h1>
      </div>
      <ObjectivesGrid />
    </main>
    <Footer />
  </div>
);

export default Objectives;
