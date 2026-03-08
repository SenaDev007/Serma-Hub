import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Difference from "@/components/sections/Difference";
import FilieresPreview from "@/components/sections/FilieresPreview";
import Parcours from "@/components/sections/Parcours";
import Impact from "@/components/sections/Impact";
import Partenaires from "@/components/sections/Partenaires";
import Valeurs from "@/components/sections/Valeurs";
import CTABanner from "@/components/sections/CTABanner";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Difference />
        <FilieresPreview />
        <Parcours />
        <Impact />
        <Partenaires />
        <Valeurs />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
