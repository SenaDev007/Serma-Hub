"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { BackofficeSidebar } from "./BackofficeSidebar";
import { BackofficeTopbar } from "./BackofficeTopbar";

type SidebarContextType = {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within BackofficeLayoutClient");
  return ctx;
}

export function BackofficeLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, openSidebar, closeSidebar, toggleSidebar }}
    >
      <div className="min-h-screen flex bg-serma-light">
        <BackofficeSidebar />
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
          <BackofficeTopbar />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
