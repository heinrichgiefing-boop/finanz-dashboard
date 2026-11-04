"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import FoodAnalysis from "../../components/FoodAnalysis";

export default function LebensmittelPage() {
  const [foodData, setFoodData] =
    useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("dashboard_food_summary")
        .select("*");

      setFoodData(data || []);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Lebensmittelanalyse
      </h1>

      <FoodAnalysis foodData={foodData} />

    </main>
  );
}