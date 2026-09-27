"tsx"
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Bookmark, Check, Plus } from "lucide-react";
import Link from "next/link";

export default function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch(() => {
        fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setWorkout(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">Loading workout details...</div>;
  }

  if (!workout) {
    return <div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">Workout not found.</div>;
  }

  return (
    <div className="bg-[#121214] min-h-screen text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xs text-gray-400 hover:text-[#ccff00] mb-6 inline-block">
          ← Back to Workouts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#18181b] border border-gray-800 p-6 sm:p-8 rounded-2xl">
          {/* Left Column: Image */}
          <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800 h-[350px] sm:h-[450px]">
            <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
          </div>

          {/* Right Column: Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {workout.muscleGroups?.map((mg: string, i: number) => (
                <span key={i} className="bg-[#ccff00] text-black text-xs font-bold px-2.5 py-1 rounded uppercase">
                  {mg}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wide mb-2">{workout.name}</h1>
            <p className="text-gray-400 text-sm mb-6">{workout.description}</p>

            {/* Key Specs Table */}
            <div className="border border-gray-800 rounded-lg overflow-hidden mb-6 text-xs">
              {[
                { label: "EQUIPMENT", value: workout.equipment },
                { label: "DIFFICULTY", value: workout.difficulty },
                { label: "SETS", value: workout.sets },
                { label: "REPS", value: workout.reps },
                { label: "DURATION", value: `${workout.duration} min` },
                { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
                { label: "RATING", value: workout.rating },
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between p-3 border-b border-gray-800 last:border-none bg-[#121214]/50">
                  <span className="text-gray-400 font-semibold">{row.label}</span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h3 className="text-xs font-bold tracking-widest text-[#ccff00] uppercase mb-3">INSTRUCTIONS</h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-gray-300">
                {workout.instructions?.map((step: string, i: number) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToPlan(workout)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold py-3 px-4 rounded-lg hover:bg-[#b3e600] transition text-sm"
              >
                <Plus className="w-4 h-4" /> Add to today's plan
              </button>
              <button
                onClick={() => addToSaved(workout)}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-700 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-800 transition text-sm"
              >
                <Bookmark className="w-4 h-4" /> Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}