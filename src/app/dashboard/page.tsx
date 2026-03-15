import { prisma } from "@/lib/prisma";
import { formatFCFA } from "@/lib/utils";
import Link from "next/link";
import { Users, FileCheck, CreditCard, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalApprenants,
    inscriptionsThisMonth,
    paiementsThisMonth,
    recentInscriptions,
    unreadMessages,
  ] = await Promise.all([
    prisma.apprenantProfil.count(),
    prisma.inscription.count({
      where: { dateInscription: { gte: startOfMonth } },
    }),
    prisma.paiement.aggregate({
      where: { statut: "COMPLETE", createdAt: { gte: startOfMonth } },
      _sum: { montant: true },
    }),
    prisma.inscription.findMany({
      take: 5,
      orderBy: { dateInscription: "desc" },
      include: { apprenant: { include: { user: true } }, filiere: true },
    }),
    prisma.contact.count({ where: { traite: false } }),
  ]);

  const revenusMois = paiementsThisMonth._sum.montant ?? 0;

  const kpis = [
    { label: "Total apprenants", value: totalApprenants, icon: Users, href: "/dashboard/apprenants" },
    { label: "Inscriptions ce mois", value: inscriptionsThisMonth, icon: FileCheck, href: "/dashboard/inscriptions" },
    { label: "Revenus du mois", value: formatFCFA(revenusMois), icon: CreditCard, href: "/dashboard/paiements" },
    { label: "Messages non lus", value: unreadMessages, icon: TrendingUp, href: "/dashboard/messages" },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-serma-navy mb-8">
        Tableau de bord
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-white rounded-xl p-6 shadow border border-serma-navy/5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-serma-blue/80 text-sm font-medium">{kpi.label}</span>
              <kpi.icon className="w-8 h-8 text-serma-orange" />
            </div>
            <p className="mt-2 font-display font-bold text-2xl text-serma-navy">
              {typeof kpi.value === "number" ? kpi.value : kpi.value}
            </p>
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow border border-serma-navy/5 overflow-hidden">
        <h2 className="font-display font-bold text-lg text-serma-navy p-6 pb-0">
          Dernières inscriptions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-serma-navy/10">
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Apprenant</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Filière</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Date</th>
                <th className="text-left p-4 text-sm font-medium text-serma-blue/80">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentInscriptions.map((ins) => (
                <tr key={ins.id} className="border-b border-serma-navy/5 hover:bg-serma-light/50">
                  <td className="p-4">
                    {ins.apprenant.user.prenom} {ins.apprenant.user.nom}
                  </td>
                  <td className="p-4">{ins.filiere.nom}</td>
                  <td className="p-4 text-serma-blue/80 text-sm">
                    {ins.dateInscription.toLocaleDateString("fr-FR")}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        ins.statut === "CONFIRMEE"
                          ? "bg-green-100 text-green-800"
                          : ins.statut === "EN_ATTENTE"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-serma-light text-serma-blue/80"
                      }`}
                    >
                      {ins.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-serma-navy/5">
          <Link
            href="/dashboard/inscriptions"
            className="text-serma-orange font-medium text-sm hover:underline"
          >
            Voir toutes les inscriptions →
          </Link>
        </div>
      </div>
    </div>
  );
}
