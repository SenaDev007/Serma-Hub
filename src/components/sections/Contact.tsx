"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

const CONTACT_INFO = [
  { icon: MapPin, label: "Adresse", value: "Quartier Albarika, Parakou, Bénin" },
  { icon: Phone, label: "WhatsApp", value: "+229 97 00 00 00" },
  { icon: Mail, label: "Email", value: "contact@sermahub.bj" },
  { icon: Clock, label: "Horaires", value: "Lun–Ven 8h–18h · Sam 8h–13h" },
];

export default function Contact() {
  const [form, setForm] = useState({
    prenom: "", nom: "", telephone: "", email: "",
    ville: "", profil: "", filiere: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: `${form.prenom} ${form.nom}`, email: form.email, telephone: form.telephone, sujet: `Inscription – ${form.filiere || form.profil}`, contenu: form.message || `Demande d'inscription à la filière ${form.filiere} depuis ${form.ville}` }),
      });
    } catch {}
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#1E2D3D]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-dm font-semibold tracking-[0.18em] uppercase text-[#F5A623] mb-3">Rejoignez-nous</p>
          <h2 className="font-syne font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
            Démarrez votre <span className="text-[#F5A623]">parcours</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <h3 className="font-syne font-bold text-white text-xl mb-6">Nous contacter</h3>
            <div className="space-y-4 mb-8">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-[#F5A623]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-dm text-[#8B9BB4] uppercase tracking-wider">{item.label}</div>
                    <div className="text-[14px] font-dm text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#0D1B2A] border border-[#F5A623]/20 rounded-2xl p-6">
              <div className="text-[11px] font-dm font-semibold text-[#F5A623] uppercase tracking-wider mb-2">Prochaine promotion</div>
              <p className="text-[#8B9BB4] font-dm text-sm leading-relaxed">
                Les inscriptions sont ouvertes. Places limitées à 25 apprenants par filière. Démarrage prévu le 1er Avril 2026.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#0D1B2A] border border-[#253548] rounded-2xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5A623]/10 flex items-center justify-center mb-4">
                  <ArrowRight size={28} className="text-[#F5A623]" />
                </div>
                <h3 className="font-syne font-bold text-white text-lg mb-2">Demande envoyée !</h3>
                <p className="text-[#8B9BB4] font-dm text-sm">Nous vous contacterons sous 24h par WhatsApp.</p>
              </div>
            ) : (
              <>
                <h3 className="font-syne font-bold text-white text-lg mb-6">Formulaire d&apos;inscription</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[{ name: "prenom", label: "Prénom" }, { name: "nom", label: "Nom" }].map((f) => (
                      <div key={f.name}>
                        <label className="block text-[11px] font-dm font-semibold uppercase tracking-wider text-[#8B9BB4] mb-1.5">{f.label}</label>
                        <input name={f.name} type="text" value={form[f.name as keyof typeof form]} onChange={handleChange} required
                          className="w-full px-4 py-3 bg-[#1E2D3D] border border-[#253548] rounded-xl text-[14px] text-white font-dm focus:border-[#F5A623] focus:outline-none transition-colors placeholder-[#8B9BB4]" />
                      </div>
                    ))}
                  </div>
                  {[{ name: "telephone", label: "WhatsApp / Téléphone", type: "tel" }, { name: "email", label: "Email (optionnel)", type: "email" }, { name: "ville", label: "Ville", type: "text" }].map((f) => (
                    <div key={f.name}>
                      <label className="block text-[11px] font-dm font-semibold uppercase tracking-wider text-[#8B9BB4] mb-1.5">{f.label}</label>
                      <input name={f.name} type={f.type} value={form[f.name as keyof typeof form]} onChange={handleChange} required={f.name !== "email"}
                        className="w-full px-4 py-3 bg-[#1E2D3D] border border-[#253548] rounded-xl text-[14px] text-white font-dm focus:border-[#F5A623] focus:outline-none transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[11px] font-dm font-semibold uppercase tracking-wider text-[#8B9BB4] mb-1.5">Filière souhaitée</label>
                    <select name="filiere" value={form.filiere} onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1E2D3D] border border-[#253548] rounded-xl text-[14px] text-white font-dm focus:border-[#F5A623] focus:outline-none transition-colors">
                      <option value="">Sélectionner…</option>
                      <option>Commerce &amp; Distribution</option>
                      <option>Agro-Business</option>
                      <option>Services Techniques</option>
                      <option>Digital Local</option>
                      <option>Entrepreneur Féminin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-dm font-semibold uppercase tracking-wider text-[#8B9BB4] mb-1.5">Message (optionnel)</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                      className="w-full px-4 py-3 bg-[#1E2D3D] border border-[#253548] rounded-xl text-[14px] text-white font-dm focus:border-[#F5A623] focus:outline-none transition-colors resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full py-4 bg-[#F5A623] text-[#0D1B2A] font-syne font-bold text-sm rounded-xl hover:bg-[#e09620] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group">
                    Envoyer ma demande
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
