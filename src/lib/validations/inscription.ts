import { z } from "zod";

export const step1Schema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Téléphone invalide").max(13),
  genre: z.enum(["MASCULIN", "FEMININ", "AUTRE"]).optional(),
  commune: z.string().min(2, "La commune est requise"),
});

export const step2Schema = z.object({
  filiereId: z.string().min(1, "Choisis une filière"),
  vagueId: z.string().optional(),
  objectif: z.string().optional(),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
