import { RecruiterNavbar } from "@/components/dashboard/recruiter-navbar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export default function RecruiterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-300 dark:from-gray-950 dark:to-gray-700 text-black">
      <SessionProvider>
        <RecruiterNavbar />
        {children}
      </SessionProvider>
      <Toaster richColors />
    </main>
  );
}
