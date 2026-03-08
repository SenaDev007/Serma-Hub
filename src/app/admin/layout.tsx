"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap, LayoutDashboard, ClipboardList, Users, CreditCard,
  MessageSquare, FileText, UsersRound, Settings, ExternalLink, Menu, X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin",             label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/inscriptions",label: "Inscriptions",    icon: ClipboardList,   exact: false },
  { href: "/admin/apprenants",  label: "Apprenants",      icon: Users,           exact: false },
  { href: "/admin/paiements",   label: "Paiements",       icon: CreditCard,      exact: false },
  { href: "/admin/messages",    label: "Messages",        icon: MessageSquare,   exact: false },
  { href: "/admin/contenu",     label: "Contenu",         icon: FileText,        exact: false },
  { href: "/admin/equipe",      label: "Équipe",          icon: UsersRound,      exact: false },
  { href: "/admin/parametres",  label: "Paramètres",      icon: Settings,        exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (item: typeof NAV_ITEMS[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex h-screen bg-[#0D1B2A] font-dm overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex flex-col bg-[#1E2D3D] border-r border-[#253548] transition-all duration-300 flex-shrink-0 ${sidebarOpen ? "w-60" : "w-16"}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#253548]">
          <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center text-[#0D1B2A] flex-shrink-0">
            <GraduationCap size={16} strokeWidth={2.5} />
          </div>
          {sidebarOpen && (
            <span className="font-syne font-bold text-white text-sm tracking-wide">
              SERMA <span className="text-[#F5A623]">HUB</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl mb-0.5 transition-all duration-150 ${
                  active
                    ? "bg-[#F5A623] text-[#0D1B2A]"
                    : "text-[#8B9BB4] hover:bg-[#253548] hover:text-white"
                }`}
              >
                <Icon size={17} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-[13px] font-dm font-medium truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom — View site */}
        <div className="p-3 border-t border-[#253548]">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#8B9BB4] hover:bg-[#253548] hover:text-white transition-all`}
          >
            <ExternalLink size={17} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-[12px] font-dm">Voir le site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-[#1E2D3D] border-b border-[#253548] px-6 h-14 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#8B9BB4] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#253548]"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-dm text-[#8B9BB4]">Administration</span>
            <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center font-syne font-bold text-[#0D1B2A] text-xs">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0D1B2A]">
          {children}
        </main>
      </div>
    </div>
  );
}
