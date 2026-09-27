"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Timer, Flame, ChevronDown, Check, Trash2, ArrowRight } from "lucide-react";

export default function MyPlan() {
  const [planWorkouts, setPlanWorkouts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("duration");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("fitlog_plan");
    if (saved) {
      try {
        setPlanWorkouts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const removeWorkout = (id: any) => {
    const updated = planWorkouts.filter((item) => String(item.id) !== String(id));
    setPlanWorkouts(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast("Workout removed from plan!");
  };

  const markAsDone = (id: any) => {
    const updated = planWorkouts.map((item) => {
      if (String(item.id) === String(id)) {
        return { ...item, done: true };
      }
      return item;
    });
    setPlanWorkouts(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast("Workout marked as done!");
  };

  // Sorting logic for My Plan workouts
  const sortedPlanWorkouts = [...planWorkouts].sort((a, b) => {
    if (sortBy === "duration") return (a.duration || 0) - (b.duration || 0);
    if (sortBy === "calories") return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const totalMinutes = planWorkouts.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = planWorkouts.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

  return (
    <div className="bg-[#121214] min-h-screen text-white px-4 sm:px-6 lg:px-8 py-10 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#ccff00] text-black font-bold px-4 py-2 rounded-lg shadow-lg z-50 transition animate-bounce">
          {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-wider mb-1">MY PLAN</h1>
        <p className="text-gray-400 text-sm mb-8">Cap of five lifts for today. Finish them, then load more.</p>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">EXERCISES</span>
            <div className="text-3xl font-black mt-2">{planWorkouts.length}</div>
          </div>
          <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">TOTAL MINUTES</span>
            <div className="text-3xl font-black mt-2">{totalMinutes} min</div>
          </div>
          <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">CALORIES BURNED</span>
            <div className="text-3xl font-black mt-2">{totalCalories} kcal</div>
          </div>
        </div>

        {/* Sort & Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold border-b-2 border-[#ccff00] pb-1 text-white">
              Today's Plan ({planWorkouts.length})
            </button>
          </div>

          {/* Sort Dropdown on My Plan Page */}
          <div className="flex items-center gap-2 bg-[#18181b] border border-gray-800 px-3 py-2 rounded-lg self-start sm:self-auto">
            <span className="text-xs text-gray-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="duration" className="bg-[#18181b]">Duration</option>
              <option value="calories" className="bg-[#18181b]">Calories</option>
              <option value="rating" className="bg-[#18181b]">Rating</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Workouts List */}
        {planWorkouts.length === 0 ? (
          <div className="bg-[#18181b] border border-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-400 mb-4">No workouts added to your plan yet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#b3e600] transition text-sm"
            >
              BROWSE WORKOUTS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPlanWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#18181b] border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gray-700 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-gray-900 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] bg-[#27272a] text-gray-300 font-bold px-2 py-0.5 rounded uppercase">
                      {workout.muscleGroups?.[0] || workout.equipment || "Workout"}
                    </span>
                    <h3 className={`font-bold text-base mt-1 ${workout.done ? "line-through text-gray-500" : "text-white"}`}>
                      {workout.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5 text-gray-500" /> {workout.duration}m</span>
                      <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-gray-500" /> {workout.caloriesBurned} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => markAsDone(workout.id)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold transition ${
                      workout.done
                        ? "bg-green-900/40 text-green-400 border border-green-800"
                        : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {workout.done ? "Done" : "Mark as Done"}
                  </button>

                  <button
                    onClick={() => removeWorkout(workout.id)}
                    className="bg-red-950/40 border border-red-900/50 text-red-400 hover:bg-red-900/50 p-2 rounded-lg transition"
                    title="Remove Workout"
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