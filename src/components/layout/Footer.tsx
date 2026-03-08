import Link from "next/link";
import { GraduationCap, Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Settings } from "lucide-react";

const FILIERES_LINKS = [
  { href: "/filieres", label: "Commerce & Distribution" },
  { href: "/filieres", label: "Agro-Business" },
  { href: "/filieres", label: "Services Techniques" },
  { href: "/filieres", label: "Digital Local" },
  { href: "/filieres", label: "Entrepreneur Féminin" },
];

const NAV_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/impact", label: "Impact" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] border-t border-[#253548]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#F5A623] flex items-center justify-center text-[#0D1B2A]">
                <GraduationCap size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-syne font-bold text-white text-base">SERMA <span className="text-[#F5A623]">HUB</span></div>
                <div className="text-[10px] text-[#8B9BB4] font-dm tracking-widest uppercase">Impact Academy</div>
              </div>
            </div>
            <p className="text-[13px] text-[#8B9BB4] font-dm leading-relaxed mb-5">
              Centre de Formation Entrepreneuriale Appliquée. Parakou, Bénin.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-[#1E2D3D] border border-[#253548] flex items-center justify-center text-[#8B9BB4] hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Filières */}
          <div>
            <h5 className="text-[11px] font-dm font-semibold text-[#F5A623] tracking-widest uppercase mb-4">Filières</h5>
            <ul className="space-y-2.5">
              {FILIERES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-[#8B9BB4] font-dm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-[11px] font-dm font-semibold text-[#F5A623] tracking-widest uppercase mb-4">Navigation</h5>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-[#8B9BB4] font-dm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-[11px] font-dm font-semibold text-[#F5A623] tracking-widest uppercase mb-4">Contact</h5>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: "Quartier Albarika, Parakou" },
                { icon: Phone, text: "+229 97 00 00 00" },
                { icon: Mail, text: "contact@sermahub.bj" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 text-[13px] text-[#8B9BB4] font-dm">
                  <item.icon size={14} className="text-[#F5A623] flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#253548] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#8B9BB4] font-dm">
            © {new Date().getFullYear()} SERMA HUB – Impact Academy. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/confidentialite" className="text-[12px] text-[#8B9BB4] font-dm hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/cgv" className="text-[12px] text-[#8B9BB4] font-dm hover:text-white transition-colors">
              CGV
            </Link>
            <Link href="/admin" className="flex items-center gap-1.5 text-[11px] text-[#8B9BB4]/40 font-dm hover:text-[#F5A623] transition-colors">
              <Settings size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
