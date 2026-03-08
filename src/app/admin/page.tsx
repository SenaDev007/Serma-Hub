import Link from "next/link";
import { ClipboardList, GraduationCap, Banknote, Mail, ArrowRight, ClipboardCheck, CreditCard, MessageSquare, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getDashboardData() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [inscriptions, apprenants, paiements, messagesNonLus, recent, filieres] = await Promise.all([
      prisma.apprenant.count(),
      prisma.apprenant.count({ where: { statut: { in: ["confirme", "certifie"] } } }),
      prisma.paiement.aggregate({ where: { datePaiement: { gte: startOfMonth }, statut: "paye" }, _sum: { montant: true } }),
      prisma.message.count({ where: { lu: false } }),
      prisma.apprenant.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { filiere: true } }),
      prisma.filiere.findMany({ where: { actif: true }, include: { _count: { select: { apprenants: true } } } }),
    ]);

    return { inscriptions, apprenants, revenus: paiements._sum.montant ?? 0, messagesNonLus, recent, filieres };
  } catch {
    return { inscriptions: 0, apprenants: 0, revenus: 0, messagesNonLus: 0, recent: [], filieres: [] };
  }
}

const STATUT_STYLE: Record<string, string> = {
  confirme:   "bg-green-500/10 text-green-400",
  certifie:   "bg-blue-500/10 text-blue-400",
  en_attente: "bg-[#F5A623]/10 text-[#F5A623]",
};

const STATUT_LABEL: Record<string, string> = {
  confirme: "Confirmé", certifie: "Certifié", en_attente: "En attente",
};

export default async function AdminDashboard() {
  const data = await getDashboardData();

  const KPIs = [
    { icon: ClipboardList, label: "Inscriptions totales",  value: data.inscriptions,                         color: "#F5A623", href: "/admin/inscriptions" },
    { icon: GraduationCap, label: "Apprenants actifs",     value: data.apprenants,                           color: "#60A5FA", href: "/admin/apprenants" },
    { icon: Banknote,      label: "Revenus ce mois (FCFA)",value: data.revenus.toLocaleString("fr-FR"),       color: "#4ADE80", href: "/admin/paiements" },
    { icon: Mail,          label: "Messages non lus",      value: data.messagesNonLus,                       color: "#F472B6", href: "/admin/messages" },
  ];

  const QUICK_ACTIONS = [
    { href: "/admin/inscriptions", label: "Valider une inscription",  icon: ClipboardCheck },
    { href: "/admin/paiements",    label: "Enregistrer un paiement",  icon: CreditCard },
    { href: "/admin/messages",     label: "Répondre aux messages",    icon: MessageSquare },
    { href: "/admin/equipe",       label: "Gérer l'équipe",           icon: Users },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-syne font-bold text-white text-2xl">Tableau de bord</h1>
        <p className="text-[#8B9BB4] font-dm text-sm mt-1">Activité en temps réel — SERMA HUB Impact Academy</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIs.map((k) => (
          <Link key={k.label} href={k.href} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-5 hover:border-[#F5A623]/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.color + "15" }}>
                <k.icon size={20} style={{ color: k.color }} />
              </div>
              <ArrowRight size={14} className="text-[#8B9BB4] group-hover:text-[#F5A623] transition-colors" />
            </div>
            <div className="font-syne font-bold text-white text-2xl leading-none mb-1">{String(k.value)}</div>
            <div className="text-[12px] font-dm text-[#8B9BB4]">{k.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent inscriptions */}
        <div className="lg:col-span-2 bg-[#1E2D3D] border border-[#253548] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#253548]">
            <h2 className="font-syne font-bold text-white text-sm">Inscriptions récentes</h2>
            <Link href="/admin/inscriptions" className="text-[12px] font-dm text-[#F5A623] hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#253548]">
            {data.recent.map((ins) => (
              <div key={ins.id} className="flex items-center justify-between px-6 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5A623]/10 flex items-center justify-center font-syne font-bold text-[#F5A623] text-xs flex-shrink-0">
                    {ins.prenom.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13px] font-dm font-medium text-white">{ins.prenom} {ins.nom}</div>
                    <div className="text-[11px] font-dm text-[#8B9BB4]">{ins.filiere.nom}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-dm text-[#8B9BB4]">
                    {new Date(ins.dateInscription).toLocaleDateString("fr-FR")}
                  </span>
                  <span className={`text-[10px] font-dm font-semibold px-2.5 py-1 rounded-full ${STATUT_STYLE[ins.statut] ?? "bg-[#253548] text-[#8B9BB4]"}`}>
                    {STATUT_LABEL[ins.statut] ?? ins.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-5">
          <h2 className="font-syne font-bold text-white text-sm mb-4">Actions rapides</h2>
          <div className="space-y-1.5">
            {QUICK_ACTIONS.map((a) => (
              <Link key={a.label} href={a.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#253548] transition-colors group">
                <a.icon size={16} className="text-[#8B9BB4] group-hover:text-[#F5A623] transition-colors flex-shrink-0" />
                <span className="text-[13px] font-dm text-[#8B9BB4] group-hover:text-white transition-colors">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Filières fill rate */}
      {data.filieres.length > 0 && (
        <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#253548]">
            <h2 className="font-syne font-bold text-white text-sm">Remplissage par filière</h2>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.filieres.map((f) => {
              const pct = Math.min(Math.round((f._count.apprenants / 25) * 100), 100);
              return (
                <div key={f.id} className="text-center">
                  <div className="text-[12px] font-syne font-bold text-white mb-2 truncate">{f.nom.split(" ")[0]}</div>
                  <div className="w-full h-2 bg-[#253548] rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-[#F5A623] rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-[11px] font-dm text-[#8B9BB4]">{f._count.apprenants}/25</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
