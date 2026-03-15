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
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <aside className="w-64 bg-serma-navy text-white flex flex-col fixed left-0 top-0 bottom-0 z-40">
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="font-display font-bold text-xl">
          <span className="text-serma-orange">SERMA</span> HUB
        </Link>
        <p className="text-white/60 text-xs mt-1">Backoffice</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Navigation backoffice">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-serma-orange text-serma-navy"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            )}
          >
            <link.icon className="w-5 h-5 shrink-0" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
