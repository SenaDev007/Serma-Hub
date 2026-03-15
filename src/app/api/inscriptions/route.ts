import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { step1Schema, step2Schema } from "@/lib/validations/inscription";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const step1 = step1Schema.safeParse(body);
    const step2 = step2Schema.safeParse(body);
    if (!step1.success || !step2.success) {
      const errors = {
        ...(step1.success ? {} : step1.error.flatten()),
        ...(step2.success ? {} : step2.error.flatten()),
      };
      return NextResponse.json(
        { message: "Données invalides", errors },
        { status: 400 }
      );
    }
    const { filiereId, vagueId, objectif } = step2.data;
    const filiere = await prisma.filiere.findUnique({ where: { id: filiereId } });
    if (!filiere) {
      return NextResponse.json({ message: "Filière introuvable" }, { status: 400 });
    }
    const email = step1.data.email;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(2), 12);
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          nom: step1.data.nom,
          prenom: step1.data.prenom,
          telephone: step1.data.telephone,
          role: "APPRENANT",
        },
      });
      await prisma.apprenantProfil.create({
        data: {
          userId: user.id,
          genre: step1.data.genre ?? undefined,
          commune: step1.data.commune,
          objectif: objectif ?? undefined,
          statut: "PROSPECT",
        },
      });
    }
    const apprenant = await prisma.apprenantProfil.findUnique({
      where: { userId: user.id },
    });
    if (!apprenant) {
      return NextResponse.json({ message: "Profil apprenant introuvable" }, { status: 500 });
    }
    const inscription = await prisma.inscription.create({
      data: {
        apprenantId: apprenant.id,
        userId: user.id,
        filiereId,
        vagueId: vagueId || undefined,
        montantTotal: filiere.tarif,
        montantPaye: 0,
        statut: "EN_ATTENTE",
        notes: objectif ?? undefined,
      },
    });
    return NextResponse.json({
      reference: inscription.id,
      message: "Inscription enregistrée. Paiement à initier côté client (FedaPay).",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
