"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedList } = usePlan();

  return (
    <header className="bg-[#121212] text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo using local logo.png */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wider text-white">
          <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} priority />
          <span>FITLOG</span>
        </Link>

        {/* Navigation Tabs */}
        <div className="bg-slate-900/80 p-1 rounded-full border border-slate-800 flex items-center text-xs font-medium">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full transition ${
              pathname === "/" ? "bg-[#ccff00] text-slate-950 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full transition ${
              pathname === "/my-plan" ? "bg-[#ccff00] text-slate-950 font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">
            Plan <span className="bg-[#ccff00] text-slate-950 px-1.5 py-0.5 rounded font-bold">{todayPlan.length}</span>
          </span>
          <span className="text-slate-400">
            Saved <span className="bg-slate-800 text-white px-1.5 py-0.5 rounded font-bold">{savedList.length}</span>
          </span>
        </div>
      </div>
    </header>
  );
}