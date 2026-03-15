"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, Menu, User } from "lucide-react";
import { useSidebar } from "./BackofficeLayoutClient";

export function BackofficeTopbar() {
  const pathname = usePathname();
  const { openSidebar } = useSidebar();
  const segments = pathname.replace("/dashboard", "").split("/").filter(Boolean);
  const breadcrumb = segments.length > 0 ? segments.join(" / ") : "Tableau de bord";

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-serma-navy/10 flex items-center justify-between gap-4 px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={openSidebar}
          className="lg:hidden p-2 text-serma-navy hover:bg-serma-light rounded-lg shrink-0"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <p className="text-serma-blue/80 text-xs sm:text-sm capitalize font-medium truncate">
          {breadcrumb}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <span className="hidden sm:flex items-center gap-2 text-serma-navy text-sm">
          <User className="w-4 h-4" />
          Session
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-serma-blue/80 hover:text-serma-orange text-sm font-medium py-2 px-2 sm:px-3 rounded-lg hover:bg-serma-light/50"
          type="button"
        >
          <LogOut className="w-4 h-4" />
          <span className="max-sm:sr-only">Déconnexion</span>
        </button>
      </div>
    </header>
  );
}
