"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export function BackofficeTopbar() {
  const pathname = usePathname();
  const segments = pathname.replace("/dashboard", "").split("/").filter(Boolean);
  const breadcrumb = segments.length > 0 ? segments.join(" / ") : "Tableau de bord";

  return (
    <header className="h-16 bg-white border-b border-serma-navy/10 flex items-center justify-between px-6 sticky top-0 z-30">
      <p className="text-serma-blue/80 text-sm capitalize font-medium">
        {breadcrumb}
      </p>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-serma-navy text-sm">
          <User className="w-4 h-4" />
          Session
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-serma-blue/80 hover:text-serma-orange text-sm font-medium"
          type="button"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
