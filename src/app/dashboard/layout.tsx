import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BackofficeSidebar } from "@/components/backoffice/BackofficeSidebar";
import { BackofficeTopbar } from "@/components/backoffice/BackofficeTopbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen flex bg-serma-light">
      <BackofficeSidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <BackofficeTopbar />
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
