"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Logo from "../homepage/logo"
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserNav from "../homepage/user-nav";
import { useEffect, useState } from "react";

export function DeveloperNavbar() {
  const pathname = usePathname();
  const linkClass = (href:string) =>
    pathname === href ? "text-primary" : "text-md font-medium text-muted-foreground transition-colors hover:text-primary";
  const { data: session, status } = useSession();
  const [authLoaded, setAuthLoaded] = useState(false)
  console.log(status)
  useEffect(() => {
    console.log(status)
    if (status === 'authenticated') {
      setAuthLoaded(true)
    }
  }, [status])
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
      <nav
          className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}
        >
          <div className="flex flex-shrink-0 items-center mr-4 logo-container group">
            <Link href='/dashboard/developer' className="rounded-full bg-transparent  flex justify-center items-center relative">
              <div className="w-8 h-8 flex items-center justify-center" >
                <Logo />
              </div>
              <span className="font-bold text-lg ml-2 text-black dark:text-white">
                Connect
              </span>
            </Link>
          </div>
          <Link
            href="/dashboard/developer"
            className={`${linkClass('/dashboard/developer')}`}
          >
            Overview
          </Link>
          <Link
            href="/dashboard/developer/applications"
            className={`${linkClass('/dashboard/developer/applications')}`}
          >
            Applications
          </Link>
          <Link
            href="/dashboard/developer/bookmarks"
            className={`${linkClass('/dashboard/developer/bookmarks')}`}
          >
            Bookmarks
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {!authLoaded ? (
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 bg-gray-400 rounded animate-pulse"></div>
            </div>
          ) : status === "authenticated" && session?.user ? (
            <UserNav data={session.user} />
          ) : null}
        </div>
      </div>
    </div>
  )
}