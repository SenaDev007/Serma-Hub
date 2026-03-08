"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord", icon: "📊", exact: true },
  { href: "/admin/inscriptions", label: "Inscriptions", icon: "📝", exact: false },
  { href: "/admin/apprenants", label: "Apprenants", icon: "🎓", exact: false },
  { href: "/admin/paiements", label: "Paiements", icon: "💰", exact: false },
  { href: "/admin/messages", label: "Messages", icon: "✉️", exact: false },
  { href: "/admin/contenu", label: "Contenu", icon: "📄", exact: false },
  { href: "/admin/equipe", label: "Équipe", icon: "👥", exact: false },
  { href: "/admin/parametres", label: "Paramètres", icon: "⚙️", exact: false },
];

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (item: typeof NAV_ITEMS[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex h-screen bg-[#F4F6FB] font-inter overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-[#1B2E5E] transition-all duration-300 flex-shrink-0 ${sidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
          <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center font-montserrat font-black text-[#1B2E5E] text-xs flex-shrink-0">
            S
          </div>
          {sidebarOpen && (
            <span className="font-montserrat font-black text-white text-sm tracking-wide">
              SERMA HUB
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg mb-1 transition-all duration-150 ${
                isActive(item)
                  ? "bg-[#F5A623] text-[#1B2E5E]"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-[13px] font-medium truncate">{item.label}</span>
              )}
              {sidebarOpen && isActive(item) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1B2E5E]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/8">
          <Link
            href="/"
            className="flex items-center gap-3 text-white/40 hover:text-white text-[12px] transition-colors"
          >
            <span>🌐</span>
            {sidebarOpen && <span>Voir le site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white border-b border-[#1B2E5E]/8 px-6 h-14 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#1B2E5E]/40 hover:text-[#1B2E5E] transition-colors p-1.5 rounded-lg hover:bg-[#F4F6FB]"
          >
            <span className="text-lg">☰</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="text-[13px] text-[#64748B]">Admin</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1B2E5E] flex items-center justify-center font-montserrat font-black text-white text-xs">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
