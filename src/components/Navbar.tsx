"tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { planWorkouts, savedWorkouts } = usePlan();

  return (
    <header className="bg-[#121214] border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold tracking-wider text-xl">
          <div className="bg-[#ccff00] p-1.5 rounded text-black">
            <Dumbbell className="w-5 h-5" />
          </div>
          FITLOG
        </Link>

        {/* Middle Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-medium transition ${
              pathname === "/" ? "text-[#ccff00] font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-medium transition ${
              pathname === "/my-plan" ? "text-[#ccff00] font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Status Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {planWorkouts.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:border-gray-500"
          >
            <span>Saved</span>
            <span className="bg-gray-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}