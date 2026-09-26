"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "../types/workout";

interface PlanContextType {
  todayPlan: Workout[];
  savedList: Workout[];
  addToTodayPlan: (workout: Workout) => void;
  addToSavedList: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleMarkAsDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_today_plan");
    const savedFavs = localStorage.getItem("fitlog_saved_list");
    if (savedPlan) setTodayPlan(JSON.parse(savedPlan));
    if (savedFavs) setSavedList(JSON.parse(savedFavs));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
      localStorage.setItem("fitlog_saved_list", JSON.stringify(savedList));
    }
  }, [todayPlan, savedList, isLoaded]);

  const addToTodayPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      alert("Cap reached! You can only add up to 5 lifts for today.");
      return;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      alert("Already in Today's Plan!");
      return;
    }
    setTodayPlan([...todayPlan, { ...workout, isDone: false }]);
  };

  const addToSavedList = (workout: Workout) => {
    if (savedList.some((item) => item.id === workout.id)) {
      alert("Already in Saved List!");
      return;
    }
    setSavedList([...savedList, workout]);
  };

  const removeFromPlan = (id: number) => {
    setTodayPlan(todayPlan.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSavedList(savedList.filter((item) => item.id !== id));
  };

  const toggleMarkAsDone = (id: number) => {
    setTodayPlan(
      todayPlan.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedList,
        addToTodayPlan,
        addToSavedList,
        removeFromPlan,
        removeFromSaved,
        toggleMarkAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}