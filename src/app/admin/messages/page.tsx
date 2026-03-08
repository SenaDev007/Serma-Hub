import { Mail, MailOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

type MessageRow = { id: number; nom: string; email: string | null; telephone: string | null; sujet: string | null; contenu: string; lu: boolean; createdAt: Date };

async function getMessages(): Promise<MessageRow[]> {
  try {
    return await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  } catch { return []; }
}

export default async function MessagesPage() {
  const messages = await getMessages();
  const nonLus = messages.filter((m) => !m.lu).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-syne font-bold text-white text-2xl">Messages</h1>
        <p className="text-[#8B9BB4] font-dm text-sm mt-1">
          {nonLus} message{nonLus !== 1 ? "s" : ""} non lu{nonLus !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-[#1E2D3D] border border-[#253548] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#253548] flex items-center gap-3">
          <Mail size={16} className="text-[#F5A623]" />
          <h2 className="font-syne font-bold text-white text-sm">Boîte de réception</h2>
        </div>
        <div className="divide-y divide-[#253548]">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-4 px-6 py-4 hover:bg-[#253548]/30 transition-colors">
              <div className="mt-1 flex-shrink-0">
                {msg.lu
                  ? <MailOpen size={16} className="text-[#8B9BB4]" />
                  : <Mail size={16} className="text-[#F5A623]" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className={`text-[13px] font-dm ${msg.lu ? "text-[#8B9BB4]" : "text-white font-medium"}`}>
                    {msg.nom}
                  </span>
                  <span className="text-[11px] font-dm text-[#8B9BB4] flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                {msg.sujet && (
                  <div className="text-[12px] font-dm text-[#F5A623] mb-1">{msg.sujet}</div>
                )}
                <p className="text-[13px] font-dm text-[#8B9BB4] line-clamp-2 leading-relaxed">
                  {msg.contenu}
                </p>
                {msg.telephone && (
                  <a
                    href={`https://wa.me/${msg.telephone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-dm text-green-400 hover:text-green-300 transition-colors"
                  >
                    Répondre sur WhatsApp
                  </a>
                )}
              </div>
              {!msg.lu && (
                <div className="w-2 h-2 rounded-full bg-[#F5A623] flex-shrink-0 mt-2" />
              )}
            </div>
          ))}
          {messages.length === 0 && (
            <div className="py-16 text-center">
              <MailOpen size={32} className="text-[#8B9BB4] mx-auto mb-3" />
              <p className="text-[#8B9BB4] font-dm text-sm">Aucun message reçu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
