import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const menuLinks = [
  { href: "/filieres", label: "Filières" },
  { href: "/a-propos", label: "À propos" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/contact", label: "Contact" },
];

const filiereLinks = [
  { href: "/filieres/commerce-distribution", label: "Commerce & Distribution" },
  { href: "/filieres/agro-business", label: "Agro-Business" },
  { href: "/filieres/services-techniques", label: "Services Techniques" },
  { href: "/filieres/digital-local", label: "Digital Local" },
  { href: "/filieres/entrepreneur-feminin", label: "Entrepreneur Féminin" },
];

export function Footer() {
  return (
    <footer className="bg-serma-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-display font-bold text-xl">
              <span className="text-serma-orange">SERMA</span> HUB
            </Link>
            <p className="mt-2 text-white/80 text-sm font-accent italic">
              ENTREPRENDRE • INNOVER • IMPACTER
            </p>
            <p className="mt-2 text-white/70 text-sm">
              Éveiller les esprits, transformer l&apos;avenir entrepreneurial en Afrique.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-serma-orange mb-3">Menu</h3>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-serma-orange text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/devenir-formateur" className="text-white/80 hover:text-serma-orange text-sm transition-colors">
                  Devenir formateur
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-serma-orange mb-3">Filières</h3>
            <ul className="space-y-2">
              {filiereLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-serma-orange text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-serma-orange mb-3">Contact</h3>
            <address className="not-italic text-sm text-white/80 space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-serma-orange shrink-0" />
                Parakou, Bénin
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-serma-orange shrink-0" />
                <a href="tel:+2290140377199" className="hover:text-serma-orange transition-colors">
                  +229 01 40 37 71 99
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-serma-orange shrink-0" />
                <a href="mailto:contact@sermahub.bj" className="hover:text-serma-orange transition-colors">
                  contact@sermahub.bj
                </a>
              </p>
            </address>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-white/70 hover:text-serma-orange transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-serma-orange transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
          <p>Site conçu par YEHI OR Tech – Parakou</p>
          <p className="mt-1">© {new Date().getFullYear()} SERMA HUB – Impact Academy. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
