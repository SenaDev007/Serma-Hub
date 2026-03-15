import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = body?.event ?? body?.type;
    const transaction = body?.data?.transaction ?? body?.transaction;

    if (event !== "transaction.approved" && body?.status !== "approved") {
      return NextResponse.json({ received: true });
    }

    const id = transaction?.id ?? body?.id;
    const reference = transaction?.reference ?? body?.reference;
    if (!id && !reference) return NextResponse.json({ received: true });

    const paiement = await prisma.paiement.findFirst({
      where: { OR: [{ fedapayId: String(id) }, { reference: reference ?? "" }] },
      include: { inscription: true, apprenant: true },
    });
    if (!paiement) return NextResponse.json({ received: true });

    await prisma.$transaction([
      prisma.paiement.update({
        where: { id: paiement.id },
        data: { statut: "COMPLETE" },
      }),
      prisma.inscription.update({
        where: { id: paiement.inscriptionId },
        data: {
          montantPaye: { increment: paiement.montant },
          ...(paiement.inscription.montantPaye + paiement.montant >= paiement.inscription.montantTotal
            ? { statut: "CONFIRMEE" as const }
            : {}),
        },
      }),
    ]);

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("FedaPay webhook error:", e);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
