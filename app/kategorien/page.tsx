"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

import CategoryPieChart
from "../../components/CategoryPieChart";

import CategoryMonthlySummary
from "../../components/CategoryMonthlySummary";

export default function KategorienPage() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [summary, setSummary] =
    useState<any[]>([]);

  useEffect(() => {

    async function load() {

      const { data: categoryData } =
        await supabase
          .from("dashboard_category_totals")
          .select("*");

      const { data: summaryData } =
        await supabase
          .from(
            "dashboard_category_monthly_summary_current_year"
          )
          .select("*");

      setCategories(categoryData || []);
      setSummary(summaryData || []);

    }

    load();

  }, []);

  return (

    <main className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Kategorien
      </h1>

      <CategoryPieChart
        data={categories}
      />

      <CategoryMonthlySummary
        data={summary}
      />

    </main>

  );
}