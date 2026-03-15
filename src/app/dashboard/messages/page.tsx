import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-serma-navy mb-8">
        Messages
      </h1>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-serma-navy/10 bg-serma-light/50">
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Nom</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Email</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Sujet</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Traité</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-b border-serma-navy/5 hover:bg-serma-light/30">
                  <td className="p-4 font-medium">{m.nom}</td>
                  <td className="p-4 text-serma-blue/80">{m.email}</td>
                  <td className="p-4">{m.sujet}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        m.traite ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {m.traite ? "Oui" : "Non"}
                    </span>
                  </td>
                  <td className="p-4 text-serma-blue/80 text-sm">
                    {m.createdAt.toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
