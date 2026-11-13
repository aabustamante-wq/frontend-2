"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Customers", href: "/dashboard/customers" },
  { label: "Restaurants", href: "/dashboard/restaurants" },
  { label: "Food Items", href: "/dashboard/food-items" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Payments", href: "/dashboard/payments" },
];

const SCHEMA_MODULES = [
  {
    title: "Customers",
    table: "Customer",
    description:
      "Manage customer names, emails, phone numbers, and delivery addresses.",
    href: "/dashboard/customers",
    stat: "Manage Customers",
  },
  {
    title: "Restaurants",
    table: "Restaurant",
    description:
      "Configure branch names, locations, contact numbers, and operating hours.",
    href: "/dashboard/restaurants",
    stat: "Manage Restaurants",
  },
  {
    title: "Food Items",
    table: "food_item",
    description:
      "Maintain menu items, unit prices, and restaurant menu assignments.",
    href: "/dashboard/food-items",
    stat: "Manage Menu",
  },
  {
    title: "Orders & Order Items",
    table: "orders · order_item",
    description:
      "Track order dates, statuses, item quantities, subtotals, and totals.",
    href: "/dashboard/orders",
    stat: "Manage Orders",
  },
  {
    title: "Payments",
    table: "payment",
    description:
      "Monitor payment methods, dates, amounts, and transaction statuses.",
    href: "/dashboard/payments",
    stat: "Manage Payments",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isChecking } = useAuthGuard({ requireAuth: true });

  if (isChecking) return null;

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.replace(CONFIG.ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-[#1c1714] font-sans text-white">
      {/* Header with shadcn NavigationMenu */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#15110f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4338ca] text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight">
              Ordering Dashboard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-[#4338ca] text-white hover:bg-[#3730a3] hover:text-white"
                          : "bg-transparent text-stone-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleLogout}
              className="rounded-full bg-[#4338ca] px-5 text-xs font-semibold text-white hover:bg-[#3730a3]"
            >
              Sign Out
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 p-2 text-stone-300 hover:bg-white/10 hover:text-white md:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <nav className="border-t border-white/10 bg-[#15110f] px-6 py-3 md:hidden">
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#4338ca] text-white"
                        : "text-stone-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            RESTAURANT ORDERING SYSTEM
          </h1>
          <p className="mt-1 text-xs text-stone-300">
            Database-driven platform designed to manage customers, restaurants,
            food items, orders, order items, and payments.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          <Card className="border border-white/15 bg-white/10 text-white backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-stone-300">
                Database Schema
              </CardDescription>
              <CardTitle className="text-3xl font-bold">6 Tables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-indigo-300">
                Customer, Restaurant, Food, Orders, Items, Payment
              </p>
            </CardContent>
          </Card>

          <Card className="border border-white/15 bg-white/10 text-white backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-stone-300">
                Active Modules
              </CardDescription>
              <CardTitle className="text-3xl font-bold">5 Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-stone-300">
                Full CRUD management ready
              </p>
            </CardContent>
          </Card>

          <Card className="border border-white/15 bg-white/10 text-white backdrop-blur-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs text-stone-300">
                System Status
              </CardDescription>
              <CardTitle className="text-3xl font-bold text-emerald-400">
                Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-stone-300">Connected</p>
            </CardContent>
          </Card>
        </div>

        {/* Database Entity Cards */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Database Tables
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCHEMA_MODULES.map((mod) => (
              <Link key={mod.href} href={mod.href} className="group block">
                <Card className="h-full border border-white/15 bg-white/5 text-white transition-colors group-hover:border-[#4338ca] group-hover:bg-white/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base font-semibold">
                        {mod.title}
                      </CardTitle>
                      <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-indigo-300">
                        {mod.table}
                      </span>
                    </div>
                    <CardDescription className="pt-1 text-xs text-stone-300">
                      {mod.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs font-medium text-indigo-300 group-hover:underline">
                      {mod.stat} →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}