"use client";

import { usePlan } from "@/context/PlanContext";
import Image from "next/image";
import Link from "next/link";
import { Check, Trash2, Flame, Clock, Trophy } from "lucide-react";

export default function MyPlan() {
  const { todayPlan, removeFromPlan, toggleMarkAsDone } = usePlan();

  const totalCalories = todayPlan.reduce((acc, item) => acc + item.caloriesBurned, 0);
  const totalDuration = todayPlan.reduce((acc, item) => acc + item.duration, 0);
  const completedCount = todayPlan.filter((item) => item.isDone).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold uppercase text-white tracking-tight">
            TODAY'S WORKOUT PLAN
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Track your routines, check off completed lifts, and hit your target.
          </p>
        </div>

        {/* Dynamic Metric Summaries */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-[#18181b] border border-slate-800 px-3 py-2 rounded-lg">
            <span className="text-slate-500 uppercase block text-[9px]">Lifts</span>
            <span className="text-white font-bold">{completedCount}/{todayPlan.length} Done</span>
          </div>
          <div className="bg-[#18181b] border border-slate-800 px-3 py-2 rounded-lg">
            <span className="text-slate-500 uppercase block text-[9px]">Est. Burn</span>
            <span className="text-orange-400 font-bold flex items-center gap-1">
              <Flame className="w-3 h-3" /> {totalCalories} kcal
            </span>
          </div>
          <div className="bg-[#18181b] border border-slate-800 px-3 py-2 rounded-lg">
            <span className="text-slate-500 uppercase block text-[9px]">Est. Time</span>
            <span className="text-white font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> {totalDuration} m
            </span>
          </div>
        </div>
      </div>

      {todayPlan.length === 0 ? (
        <div className="bg-[#18181b] border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-[#ccff00]">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase">Your plan is empty</h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            Go back to the workout library and select up to 5 lifts for today's session.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-slate-950 font-bold px-6 py-2.5 rounded text-xs uppercase hover:bg-opacity-90 transition"
          >
            BROWSE WORKOUTS
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {todayPlan.map((item) => (
            <div
              key={item.id}
              className={`bg-[#18181b] border rounded-xl p-4 flex items-center justify-between gap-4 transition ${
                item.isDone
                  ? "border-[#ccff00]/40 opacity-60 bg-slate-950/50"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleMarkAsDone(item.id)}
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition ${
                    item.isDone
                      ? "bg-[#ccff00] border-[#ccff00] text-slate-950"
                      : "border-slate-700 hover:border-[#ccff00]"
                  }`}
                >
                  {item.isDone && <Check className="w-4 h-4 stroke-[3]" />}
                </button>

                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div>
                  <h3
                    className={`font-bold text-sm uppercase ${
                      item.isDone ? "line-through text-slate-400" : "text-white"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {item.sets} Sets × {item.reps} | {item.duration} min | {item.caloriesBurned} kcal
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromPlan(item.id)}
                className="text-slate-500 hover:text-red-400 transition p-2"
                title="Remove lift"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}