"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { ArrowLeft, Clock, Flame, Star, CheckCircle, PlusCircle, Bookmark } from "lucide-react";

export default function WorkoutDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToTodayPlan, addToSavedList } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data: Workout[]) => {
        const found = data.find((item) => item.id === Number(id));
        setWorkout(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <div className="inline-block w-6 h-6 border-2 border-slate-700 border-t-[#ccff00] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white uppercase">Workout Not Found</h2>
        <button
          onClick={() => router.push("/")}
          className="text-[#ccff00] underline text-sm"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO LIBRARY
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative h-80 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {workout.muscleGroups.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-slate-950 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold uppercase text-white tracking-tight">
              {workout.name}
            </h1>
            <p className="text-slate-400 text-xs font-mono">
              Equipment: <span className="text-slate-200">{workout.equipment}</span> | Difficulty: <span className="text-slate-200">{workout.difficulty}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-[#18181b] p-4 rounded-xl border border-slate-800 text-center font-mono">
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Time</p>
              <p className="text-sm font-bold text-white flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {workout.duration}m
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Burn</p>
              <p className="text-sm font-bold text-white flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> {workout.caloriesBurned}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase">Rating</p>
              <p className="text-sm font-bold text-[#ccff00] flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" /> {workout.rating}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToTodayPlan(workout)}
              className="flex-1 bg-[#ccff00] text-slate-950 font-bold py-3 px-4 rounded text-xs uppercase hover:bg-opacity-90 transition flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Add to Today's Plan
            </button>
            <button
              onClick={() => addToSavedList(workout)}
              className="bg-slate-800 text-white font-bold py-3 px-4 rounded text-xs uppercase hover:bg-slate-700 transition flex items-center justify-center gap-2 border border-slate-700"
            >
              <Bookmark className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#18181b] p-6 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold uppercase text-white">Execution Instructions</h3>
        <p className="text-slate-400 text-xs leading-relaxed">{workout.description}</p>

        <ul className="space-y-2 pt-2">
          {workout.instructions.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}