import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BackofficeLayoutClient } from "@/components/backoffice/BackofficeLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <BackofficeLayoutClient>{children}</BackofficeLayoutClient>;
}
