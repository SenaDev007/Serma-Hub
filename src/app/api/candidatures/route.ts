import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const year = new Date().getFullYear();
    const count = await prisma.candidatureFormateur.count({
      where: { createdAt: { gte: new Date(year, 0, 1) } },
    });
    const numeroDossier = `SERMA-FORM-${year}-${String(count + 1).padStart(4, "0")}`;

    await prisma.candidatureFormateur.create({
      data: {
        ...data,
        numeroDossier,
        diplomesUrl: [],
        autresDocsUrl: [],
      },
    });

    return NextResponse.json({ ok: true, numeroDossier });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ message: "Données invalides", errors: e.flatten() }, { status: 400 });
    }
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
