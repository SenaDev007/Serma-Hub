"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(8).max(13),
  genre: z.enum(["MASCULIN", "FEMININ", "AUTRE"]),
  commune: z.string().min(2),
  niveauEtudes: z.string().min(1),
  diplomeObtenu: z.string().min(2),
  anneeExperience: z.number().min(1),
  domaineExpertise: z.array(z.string()).min(1),
  filieresCibles: z.array(z.string()).min(1),
  lettreMotivation: z.string().min(200),
  disponibilite: z.string().min(1),
  pretentionSalaire: z.number().optional(),
});

type Data = z.infer<typeof schema>;

const domaines = [
  "Commerce & vente",
  "Agriculture & transformation",
  "Électricité & solaire",
  "Plomberie & BTP",
  "Marketing digital",
  "Réseaux sociaux",
  "Freelance & IT",
  "Finance & comptabilité",
  "Leadership & coaching",
  "Autre",
];

const filieresCibles = [
  "Commerce & Distribution",
  "Agro-Business",
  "Services Techniques",
  "Digital Local",
  "Entrepreneuriat Féminin",
];

export function CandidatureFormateurSection() {
  const [sent, setSent] = useState(false);
  const [dossierRef, setDossierRef] = useState("");
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: {
      genre: "MASCULIN",
      domaineExpertise: [],
      filieresCibles: [],
      anneeExperience: 1,
    },
  });

  const lettre = watch("lettreMotivation") ?? "";

  async function onSubmit(data: Data) {
    const res = await fetch("/api/candidatures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok && json.numeroDossier) {
      setDossierRef(json.numeroDossier);
      setSent(true);
    }
  }

  if (sent) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="bg-serma-teal/10 text-serma-teal rounded-2xl p-8">
            <h2 className="font-display font-bold text-2xl text-serma-navy">Candidature envoyée</h2>
            <p className="mt-4">Ton dossier a bien été reçu.</p>
            <p className="mt-2 font-mono font-bold">N° {dossierRef}</p>
            <p className="mt-4 text-sm text-serma-blue/80">
              Nous l&apos;examinerons sous 5 jours ouvrés. Tu recevras un email d&apos;accusé de réception.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="font-display font-bold text-3xl text-serma-navy text-center mb-10">
          Déposer ma candidature
        </h2>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg border border-serma-navy/10 p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-serma-navy mb-1">Prénom</label>
              <input {...register("prenom")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
              {errors.prenom && <p className="text-red-600 text-sm mt-1">{errors.prenom.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-serma-navy mb-1">Nom</label>
              <input {...register("nom")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
              {errors.nom && <p className="text-red-600 text-sm mt-1">{errors.nom.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Email</label>
            <input type="email" {...register("email")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Téléphone</label>
            <input {...register("telephone")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
            {errors.telephone && <p className="text-red-600 text-sm mt-1">{errors.telephone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Genre</label>
            <div className="flex gap-4">
              {(["MASCULIN", "FEMININ", "AUTRE"] as const).map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input type="radio" value={g} {...register("genre")} />
                  <span>{g === "AUTRE" ? "Autre" : g === "MASCULIN" ? "Masculin" : "Féminin"}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Commune de résidence</label>
            <input {...register("commune")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
            {errors.commune && <p className="text-red-600 text-sm mt-1">{errors.commune.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Niveau d&apos;études</label>
            <select {...register("niveauEtudes")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange">
              <option value="">Choisir</option>
              <option value="Bac">Bac</option>
              <option value="Bac+2">Bac+2</option>
              <option value="Licence">Licence</option>
              <option value="Master">Master</option>
              <option value="Doctorat">Doctorat</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.niveauEtudes && <p className="text-red-600 text-sm mt-1">{errors.niveauEtudes.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Diplôme principal obtenu</label>
            <input {...register("diplomeObtenu")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
            {errors.diplomeObtenu && <p className="text-red-600 text-sm mt-1">{errors.diplomeObtenu.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Années d&apos;expérience</label>
            <input type="number" min={1} {...register("anneeExperience", { valueAsNumber: true })} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
            {errors.anneeExperience && <p className="text-red-600 text-sm mt-1">{errors.anneeExperience.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-2">Domaines d&apos;expertise (au moins 1)</label>
            <div className="flex flex-wrap gap-2">
              {domaines.map((d) => (
                <label key={d} className="flex items-center gap-2 bg-serma-light px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    value={d}
                    {...register("domaineExpertise")}
                    onChange={(e) => {
                      const prev = watch("domaineExpertise");
                      if (e.target.checked) setValue("domaineExpertise", [...prev, d]);
                      else setValue("domaineExpertise", prev.filter((x) => x !== d));
                    }}
                  />
                  <span className="text-sm">{d}</span>
                </label>
              ))}
            </div>
            {errors.domaineExpertise && <p className="text-red-600 text-sm mt-1">{errors.domaineExpertise.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-2">Filières pour lesquelles tu candidates (au moins 1)</label>
            <div className="flex flex-wrap gap-2">
              {filieresCibles.map((f) => (
                <label key={f} className="flex items-center gap-2 bg-serma-light px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    value={f}
                    {...register("filieresCibles")}
                    onChange={(e) => {
                      const prev = watch("filieresCibles");
                      if (e.target.checked) setValue("filieresCibles", [...prev, f]);
                      else setValue("filieresCibles", prev.filter((x) => x !== f));
                    }}
                  />
                  <span className="text-sm">{f}</span>
                </label>
              ))}
            </div>
            {errors.filieresCibles && <p className="text-red-600 text-sm mt-1">{errors.filieresCibles.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Lettre de motivation (min. 200 caractères)</label>
            <textarea {...register("lettreMotivation")} rows={6} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
            <p className="text-serma-blue/70 text-sm mt-1">{lettre.length} / 200</p>
            {errors.lettreMotivation && <p className="text-red-600 text-sm mt-1">{errors.lettreMotivation.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Disponibilité</label>
            <select {...register("disponibilite")} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange">
              <option value="">Choisir</option>
              <option value="Temps plein">Temps plein</option>
              <option value="Partiel matin">Partiel matin</option>
              <option value="Partiel soir">Partiel soir</option>
              <option value="Week-ends">Week-ends</option>
              <option value="Flexible selon planning">Flexible selon planning</option>
            </select>
            {errors.disponibilite && <p className="text-red-600 text-sm mt-1">{errors.disponibilite.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-serma-navy mb-1">Prétention salariale mensuelle (FCFA, optionnel)</label>
            <input type="number" min={0} {...register("pretentionSalaire", { valueAsNumber: true })} className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange" />
          </div>
          <p className="text-sm text-serma-blue/70">
            CV et diplômes pourront être demandés après examen du dossier. Tu peux indiquer un lien vers ton CV ou portfolio dans la lettre de motivation si tu le souhaites.
          </p>
          <button type="submit" className="w-full bg-serma-orange text-serma-navy font-display font-bold py-4 rounded-lg hover:bg-serma-orange/90">
            Envoyer ma candidature
          </button>
        </motion.form>
      </div>
    </section>
  );
}
