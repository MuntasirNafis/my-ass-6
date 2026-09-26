"use client";

import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import Image from "next/image";
import { Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function MyPlanPage() {
  const { todayPlan, toggleMarkAsDone, removeFromPlan } = usePlan();
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<"duration" | "calories">("duration");

  const completedCount = todayPlan.filter((item) => item.isDone).length;
  const totalMinutes = todayPlan.reduce((acc, item) => acc + item.duration, 0);
  const totalCalories = todayPlan.reduce((acc, item) => acc + item.caloriesBurned, 0);

  const sortedPlan = [...todayPlan].sort((a, b) => {
    if (sortBy === "duration") return b.duration - a.duration;
    return b.caloriesBurned - a.caloriesBurned;
  });

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold uppercase text-white tracking-wide">
          MY PLAN
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats Summary Box */}
      <div className="bg-[#181d28] border border-slate-800 rounded-xl p-5 mb-8 grid grid-cols-3 gap-4 text-left">
        <div>
          <p className="text-xs text-slate-400 font-medium mb-1">Exercises</p>
          <p className="text-2xl font-bold text-white">{completedCount} / {todayPlan.length}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium mb-1">Minutes</p>
          <p className="text-2xl font-bold text-white">{totalMinutes}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium mb-1">Calories</p>
          <p className="text-2xl font-bold text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Filter Tabs & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-[#181d28] p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("today")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "today"
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "saved"
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "duration" | "calories")}
            className="bg-[#181d28] border border-slate-800 text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-slate-600"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
          </select>
        </div>
      </div>

      {/* Content List / Empty State */}
      {todayPlan.length === 0 ? (
        <div className="bg-[#181d28] border border-slate-800/80 rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[250px]">
          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-lime-400 hover:bg-lime-500 text-black font-semibold text-xs px-5 py-2.5 rounded-lg transition uppercase"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedPlan.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition ${
                item.isDone
                  ? "bg-[#131720] border-slate-800/60 opacity-60"
                  : "bg-[#181d28] border-slate-800"
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleMarkAsDone(item.id)}
                  className={`p-1.5 rounded-full transition ${
                    item.isDone
                      ? "text-lime-400 bg-lime-400/10"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4
                    className={`font-bold text-sm text-white ${
                      item.isDone ? "line-through text-slate-400" : ""
                    }`}
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {item.duration} min • {item.caloriesBurned} kcal
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromPlan(item.id)}
                className="text-slate-500 hover:text-red-400 p-2 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}