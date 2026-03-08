import { Users, UserPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";

type MembreEquipeRow = { id: number; prenom: string; nom: string; role: string; description: string; initiales: string; actif: boolean };

async function getEquipe(): Promise<MembreEquipeRow[]> {
  try {
    return await prisma.membreEquipe.findMany({ orderBy: { id: "asc" } });
  } catch { return []; }
}

export default async function EquipePage() {
  const equipe = await getEquipe();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne font-bold text-white text-2xl">Équipe</h1>
          <p className="text-[#8B9BB4] font-dm text-sm mt-1">{equipe.length} membres de l&apos;équipe</p>
        </div>
        <div className="flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] text-[12px] font-dm px-3 py-2 rounded-xl">
          <Users size={14} />
          {equipe.length} membres
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipe.map((m) => (
          <div key={m.id} className="bg-[#1E2D3D] border border-[#253548] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F5A623] flex items-center justify-center font-syne font-bold text-[#0D1B2A] text-lg flex-shrink-0">
              {m.prenom.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-syne font-bold text-white text-sm">{m.prenom} {m.nom}</h3>
              <p className="text-[11px] font-dm font-semibold text-[#F5A623] uppercase tracking-wider mt-0.5 mb-2">{m.role}</p>
              {m.description && (
                <p className="text-[13px] font-dm text-[#8B9BB4] leading-relaxed">{m.description}</p>
              )}
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-[#253548] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-[#F5A623]/30 transition-colors group cursor-pointer">
          <UserPlus size={24} className="text-[#8B9BB4] group-hover:text-[#F5A623] transition-colors" />
          <div className="text-[13px] font-dm text-[#8B9BB4] group-hover:text-white transition-colors">
            Ajouter un formateur
          </div>
        </div>
      </div>
    </div>
  );
}
