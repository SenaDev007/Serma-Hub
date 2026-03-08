import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, email, telephone, sujet, contenu } = body;
    if (!nom || !contenu) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }
    const message = await prisma.message.create({
      data: { nom, email: email || null, telephone: telephone || null, sujet: sujet || null, contenu },
    });
    return NextResponse.json({ success: true, id: message.id });
  } catch (error) {
    console.error("Message API error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
