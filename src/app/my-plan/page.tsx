"tsx"
"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import { Check, Flame, Timer, Trash2, ArrowRight } from "lucide-react";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const { planWorkouts, savedWorkouts, removeFromPlan, markAsDone, removeFromSaved } = usePlan();

  const totalExercises = planWorkouts.length;
  const totalMinutes = planWorkouts.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = planWorkouts.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  const currentList = activeTab === "plan" ? planWorkouts : savedWorkouts;

  return (
    <div className="bg-[#121214] min-h-screen text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider">MY PLAN</h1>
          <p className="text-gray-400 text-sm mt-1">Cap of five lifts for today. Finish them, then load more.</p>
        </div>

        {/* Metrics Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#18181b] border border-gray-800 p-5 rounded-xl">
            <p className="text-xs text-gray-400 uppercase font-semibold">Exercises</p>
            <p className="text-2xl font-black mt-1">{totalExercises} <span className="text-xs font-normal text-gray-500">/ 5 max</span></p>
          </div>
          <div className="bg-[#18181b] border border-gray-800 p-5 rounded-xl">
            <p className="text-xs text-gray-400 uppercase font-semibold">Total Minutes</p>
            <p className="text-2xl font-black mt-1">{totalMinutes} min</p>
          </div>
          <div className="bg-[#18181b] border border-gray-800 p-5 rounded-xl">
            <p className="text-xs text-gray-400 uppercase font-semibold">Calories Burned</p>
            <p className="text-2xl font-black mt-1">{totalCalories} kcal</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("plan")}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === "plan" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan ({planWorkouts.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === "saved" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        {/* List or Empty State */}
        {currentList.length === 0 ? (
          <div className="bg-[#18181b] border border-gray-800 rounded-xl p-12 text-center">
            <h3 className="text-lg font-bold uppercase mb-2">NOTHING HERE YET</h3>
            <p className="text-gray-400 text-xs mb-6">Browse the library and add a lift to get today moving.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-5 py-2.5 rounded-lg text-xs hover:bg-[#b3e600] transition"
            >
              Go to workouts <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((workout) => (
              <div
                key={workout.id}
                className={`bg-[#18181b] border ${workout.done ? 'border-[#ccff00]/50 bg-[#ccff00]/5' : 'border-gray-800'} rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition`}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img src={workout.image} alt={workout.name} className="w-16 h-16 rounded-lg object-cover bg-gray-900 border border-gray-800 flex-shrink-0" />
                  <div>
                    <h4 className={`font-bold text-sm sm:text-base ${workout.done ? 'line-through text-gray-400' : 'text-white'}`}>
                      {workout.name}
                    </h4>
                    <p className="text-gray-400 text-xs">{workout.equipment}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {workout.duration}m</span>
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {workout.caloriesBurned}k</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="border border-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-bold transition ${
                        workout.done ? "bg-[#ccff00] text-black" : "border border-gray-700 text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" /> {workout.done ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => activeTab === "plan" ? removeFromPlan(workout.id) : removeFromSaved(workout.id)}
                    className="border border-red-900/50 text-red-400 p-1.5 rounded-lg hover:bg-red-950/30 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}