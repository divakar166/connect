"use client"
import Footer from "@/components/homepage/footer";
import Hero from "@/components/homepage/hero";
import HeroCards from "@/components/homepage/herocards";
import JobSection from "@/components/homepage/job-section";
import Navbar from "@/components/homepage/navbar";
import SubscribeSection from "@/components/homepage/subscribe-section";
import ViewAll from "@/components/homepage/view-all";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated" && session?.user?.type === "recruiter") {
      router.replace("/dashboard/recruiter");
    }
  }, [session, status, router]);
  return (
    <main className="flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-200 dark:from-gray-950 dark:to-gray-700">
      <Navbar />
      <Hero />
      <HeroCards />
      <JobSection />
      <ViewAll />
      <SubscribeSection />
      <Footer />
    </main>
  );
}
