"use client";

import Link from "next/link";
import { Sparkles, BarChart3, Megaphone, Send, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Campaigns", href: "/campaigns", icon: Megaphone },
    { name: "Sales Pitches", href: "/pitches", icon: Send },
    { name: "Lead Scoring", href: "/leads", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight text-primary">Tech Sales AI</span>
        </div>
        <div className="hidden space-x-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary",
                  pathname === item.href ? "bg-secondary text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
           <button className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-sm hover:opacity-90 transition-opacity">
            Pro Plan
          </button>
        </div>
      </div>
    </nav>
  );
}
