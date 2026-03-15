import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  sujet: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    await prisma.contact.create({
      data: {
        nom: data.nom,
        email: data.email,
        telephone: data.telephone ?? null,
        sujet: data.sujet,
        message: data.message,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Données invalides" }, { status: 400 });
  }
}
