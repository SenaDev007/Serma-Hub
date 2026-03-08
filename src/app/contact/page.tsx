import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — SERMA HUB",
  description: "Contactez SERMA HUB pour vous inscrire, poser une question ou devenir partenaire.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#0D1B2A] pt-28 pb-10 px-6 text-center">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Nous écrire</p>
          <h1 className="font-syne font-bold text-white" style={{ fontSize: "clamp(32px,5vw,50px)" }}>
            Contactez <span className="text-[#F5A623]">SERMA HUB</span>
          </h1>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
