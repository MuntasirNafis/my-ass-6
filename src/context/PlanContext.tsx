"tsx"
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
  done?: boolean;
}

interface PlanContextType {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  markAsDone: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  toastMessage: string | null;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedFav = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlanWorkouts(JSON.parse(savedPlan));
    if (savedFav) setSavedWorkouts(JSON.parse(savedFav));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToPlan = (workout: Workout) => {
    if (planWorkouts.length >= 5) {
      showToast("Plan is full! Maximum 5 lifts allowed for today.");
      return;
    }
    if (planWorkouts.some((item) => String(item.id) === String(workout.id))) {
      showToast("Already in today's plan!");
      return;
    }

    const updated = [...planWorkouts, workout];
    setPlanWorkouts(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast("Added to today's plan");
  };

  const removeFromPlan = (id: number) => {
    const updated = planWorkouts.filter((item) => item.id !== id);
    setPlanWorkouts(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast("Removed from plan");
  };

  const markAsDone = (id: number) => {
    const updated = planWorkouts.map((item) => 
      item.id === id ? { ...item, done: !item.done } : item
    );
    setPlanWorkouts(updated);
    localStorage.setItem("fitlog_plan", JSON.stringify(updated));
    showToast("Workout status updated");
  };

  const addToSaved = (workout: Workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      showToast("Already saved for later!");
      return;
    }
    const updated = [...savedWorkouts, workout];
    setSavedWorkouts(updated);
    localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    showToast("Saved for later");
  };

  const removeFromSaved = (id: number) => {
    const updated = savedWorkouts.filter((item) => item.id !== id);
    setSavedWorkouts(updated);
    localStorage.setItem("fitlog_saved", JSON.stringify(updated));
    showToast("Removed from saved");
  };

  return (
    <PlanContext.Provider
      value={{
        planWorkouts,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        markAsDone,
        addToSaved,
        removeFromSaved,
        toastMessage,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#ccff00] text-black font-bold px-4 py-3 rounded-lg shadow-lg transition-all duration-300">
          {toastMessage}
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
}