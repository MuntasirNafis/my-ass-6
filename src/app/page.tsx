"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Flame, Star, Timer } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(() => {
        fetch("https://api.api-store.workers.dev/api/fitlog")
          .then((res) => res.json())
          .then((data) => {
            setWorkouts(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-[#121214] min-h-screen text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#18181b] border border-gray-800 rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2 mb-4 leading-tight">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#b3e600] transition"
            >
              BROWSE WORKOUTS <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/banner.png"
              alt="Hero Fitness"
              className="rounded-xl object-cover max-h-[350px]"
            />
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase">
              THE LIBRARY
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#18181b] border border-gray-800 px-3 py-2 rounded-lg">
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

        {loading ? (
          <div className="text-center py-24 text-gray-400 text-lg animate-pulse">
            Loading workouts…
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="bg-[#18181b] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {workout.muscleGroups.map((mg: string, i: number) => (
                        <span
                          key={i}
                          className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                        >
                          {mg}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white font-bold text-base mb-1 tracking-wide">
                      {workout.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{workout.equipment}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5 text-gray-500" /> {workout.duration}m</span>
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-gray-500" /> {workout.caloriesBurned}k</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-gray-500" /> {workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}