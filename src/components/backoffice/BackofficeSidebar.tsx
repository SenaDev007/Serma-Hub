"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  GraduationCap,
  ClipboardList,
  CreditCard,
  BookOpen,
  MessageSquare,
  Settings,
  BarChart3,
  Star,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./BackofficeLayoutClient";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/apprenants", label: "Apprenants", icon: Users },
  { href: "/dashboard/inscriptions", label: "Inscriptions", icon: FileCheck },
  { href: "/dashboard/vagues", label: "Vagues & Promotions", icon: GraduationCap },
  { href: "/dashboard/filieres", label: "Filières", icon: BookOpen },
  { href: "/dashboard/formateurs", label: "Formateurs", icon: Users },
  { href: "/dashboard/candidatures", label: "Candidatures", icon: ClipboardList },
  { href: "/dashboard/paiements", label: "Paiements", icon: CreditCard },
  { href: "/dashboard/rapports", label: "Rapports", icon: BarChart3 },
  { href: "/dashboard/contenu", label: "Blog & Actualités", icon: BookOpen },
  { href: "/dashboard/temoignages", label: "Témoignages", icon: Star },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/parametres", label: "Paramètres", icon: Settings },
];

export function BackofficeSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, closeSidebar } = useSidebar();

  return (
    <>
      {/* Overlay mobile : ferme le menu au clic */}
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={closeSidebar}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />
      <aside
        className={cn(
          "w-64 bg-serma-navy text-white flex flex-col fixed left-0 top-0 bottom-0 z-50 transition-transform duration-200 ease-out",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/dashboard" className="font-display font-bold text-xl" onClick={closeSidebar}>
            <span className="text-serma-orange">SERMA</span> HUB
          </Link>
          <button
            type="button"
            onClick={closeSidebar}
            className="lg:hidden p-2 text-white/80 hover:text-white rounded-lg"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-white/60 text-xs px-4 pb-2 lg:px-6">Backoffice</p>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Navigation backoffice">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSidebar}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-serma-orange text-serma-navy"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
