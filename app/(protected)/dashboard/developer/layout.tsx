import { SessionProvider } from "next-auth/react";
import { DeveloperNavbar } from "@/components/dashboard/developer-navbar";

export default function DeveloperLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-300 dark:from-gray-950 dark:to-gray-700 text-black">
      <SessionProvider>
        <DeveloperNavbar />
        {children}
      </SessionProvider>
    </main>
  );
}