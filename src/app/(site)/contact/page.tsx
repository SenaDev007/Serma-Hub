import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Contactez SERMA HUB – Impact Academy à Parakou, Bénin.",
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display font-bold text-4xl text-serma-navy text-center">
            Contact
          </h1>
          <p className="mt-4 text-serma-blue/80 text-center">
            Une question ? Envoie-nous un message. Nous répondons sous 48h.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display font-bold text-xl text-serma-navy mb-4">
                Nous trouver
              </h2>
              <p className="text-serma-blue/90">
                <strong>SERMA HUB – Impact Academy</strong><br />
                Parakou, Bénin
              </p>
              <p className="mt-4">
                Tél. : <a href="tel:+2290140377199" className="text-serma-orange font-medium">+229 01 40 37 71 99</a>
              </p>
              <p className="mt-2">
                Email : <a href="mailto:contact@sermahub.bj" className="text-serma-orange font-medium">contact@sermahub.bj</a>
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
