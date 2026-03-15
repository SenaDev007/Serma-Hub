"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { step1Schema, step2Schema, type Step1Data, type Step2Data } from "@/lib/validations/inscription";
import type { Filiere, Vague } from "@prisma/client";
import { formatFCFA } from "@/lib/utils";

type FiliereWithRelation = Filiere & {};
type VagueWithFiliere = Vague & { filiere: Filiere };

interface InscriptionFormProps {
  filieres: FiliereWithRelation[];
  vagues: VagueWithFiliere[];
  filierePreselected?: string;
}

export function InscriptionForm({
  filieres,
  vagues,
  filierePreselected,
}: InscriptionFormProps) {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      commune: "",
    },
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      filiereId: filierePreselected ?? "",
      vagueId: "",
      objectif: "",
    },
  });

  const onStep1 = form1.handleSubmit((data) => {
    setStep1Data(data);
    setStep(2);
  });

  const onStep2 = form2.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/inscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...step1Data, ...data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Erreur");
      if (json.paiementUrl) {
        window.location.href = json.paiementUrl;
        return;
      }
      window.location.href = `/inscription/confirmation?ref=${json.reference ?? ""}`;
    } catch (e) {
      form2.setError("root", { message: e instanceof Error ? e.message : "Erreur lors de l'inscription." });
    }
  });

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-lg border border-serma-navy/10 p-6 md:p-8">
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${s <= step ? "bg-serma-orange" : "bg-serma-navy/10"}`}
            aria-hidden
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onSubmit={onStep1}
            className="space-y-4"
          >
            <h2 className="font-display font-bold text-xl text-serma-navy">Informations personnelles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-serma-navy mb-1">Prénom</label>
                <input
                  {...form1.register("prenom")}
                  className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
                />
                {form1.formState.errors.prenom && (
                  <p className="text-red-600 text-sm mt-1">{form1.formState.errors.prenom.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-serma-navy mb-1">Nom</label>
                <input
                  {...form1.register("nom")}
                  className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
                />
                {form1.formState.errors.nom && (
                  <p className="text-red-600 text-sm mt-1">{form1.formState.errors.nom.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-serma-navy mb-1">Email</label>
              <input
                type="email"
                {...form1.register("email")}
                className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
              />
              {form1.formState.errors.email && (
                <p className="text-red-600 text-sm mt-1">{form1.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-serma-navy mb-1">Téléphone (WhatsApp)</label>
              <input
                {...form1.register("telephone")}
                className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
                placeholder="+229 01 23 45 67 89"
              />
              {form1.formState.errors.telephone && (
                <p className="text-red-600 text-sm mt-1">{form1.formState.errors.telephone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-serma-navy mb-1">Commune de résidence</label>
              <input
                {...form1.register("commune")}
                className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
              />
              {form1.formState.errors.commune && (
                <p className="text-red-600 text-sm mt-1">{form1.formState.errors.commune.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-serma-orange text-serma-navy font-display font-bold py-3 rounded-lg hover:bg-serma-orange/90"
            >
              Continuer
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            onSubmit={onStep2}
            className="space-y-4"
          >
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-serma-orange text-sm font-medium mb-4"
            >
              ← Retour
            </button>
            <h2 className="font-display font-bold text-xl text-serma-navy">Choix de la filière</h2>
            <div>
              <label className="block text-sm font-medium text-serma-navy mb-2">Filière</label>
              <select
                {...form2.register("filiereId")}
                className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
              >
                <option value="">Choisir une filière</option>
                {filieres.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nom} — {f.duree} — {formatFCFA(f.tarif)}
                  </option>
                ))}
              </select>
              {form2.formState.errors.filiereId && (
                <p className="text-red-600 text-sm mt-1">{form2.formState.errors.filiereId.message}</p>
              )}
            </div>
            {vagues.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-serma-navy mb-2">Promotion / vague (optionnel)</label>
                <select
                  {...form2.register("vagueId")}
                  className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
                >
                  <option value="">Aucune préférence</option>
                  {vagues.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.nom} ({v.filiere.nom}) — {v.dateDebut.toLocaleDateString("fr-FR")}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-serma-navy mb-1">Objectif / motivation (optionnel)</label>
              <textarea
                {...form2.register("objectif")}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange"
              />
            </div>
            {form2.formState.errors.root && (
              <p className="text-red-600 text-sm">{form2.formState.errors.root.message}</p>
            )}
            <button
              type="submit"
              className="w-full mt-6 bg-serma-orange text-serma-navy font-display font-bold py-3 rounded-lg hover:bg-serma-orange/90"
            >
              Valider et passer au paiement
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
