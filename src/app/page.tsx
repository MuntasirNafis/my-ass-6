"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "../types/workout";
import { Flame, Clock, Star, Search } from "lucide-react";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"duration" | "caloriesBurned" | "rating">("duration");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const sortedWorkouts = [...workouts]
    .filter((w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.muscleGroups.some((m) => m.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => (b[sortBy] as number) - (a[sortBy] as number));

  return (
    <div className="space-y-12">
      {/* Hero Banner Section using local banner.png */}
      <section className="bg-[#18181b] border border-slate-800 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-[#ccff00] font-mono text-xs font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight text-white">
            TRAIN WITH INTENT. <br />
            LOG EVERY SET.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <a
            href="#library"
            className="inline-block bg-[#ccff00] text-slate-950 font-bold px-6 py-3 rounded text-xs uppercase hover:bg-opacity-90 transition"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="relative h-64 md:h-80 w-full flex justify-center items-center">
          <Image
            src="/banner.png"
            alt="Gym Machine Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold uppercase text-white">THE LIBRARY</h2>
            <p className="text-slate-400 text-xs">Twelve lifts covering every major muscle group.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lift or muscle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#18181b] border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#ccff00]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#18181b] border border-slate-800 text-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="caloriesBurned">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <div className="inline-block w-6 h-6 border-2 border-slate-700 border-t-[#ccff00] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((item) => (
              <Link
                key={item.id}
                href={`/workouts/${item.id}`}
                className="bg-[#18181b] border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-600 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-950">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {item.muscleGroups.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#ccff00] text-slate-950 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold uppercase text-white group-hover:text-[#ccff00] transition">
                      {item.name}
                    </h3>
                    <p className="text-slate-400 text-xs">{item.equipment}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex justify-between items-center text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration} min</span>
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> {item.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1 text-[#ccff00]"><Star className="w-3 h-3 fill-current" /> {item.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}