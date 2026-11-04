"use client";

import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

import KPIGrid from "../components/KPIGrid";
import MonthlyChart from "../components/MonthlyChart";
import StoreRanking from "../components/StoreRanking";
import CategoryPieChart from "../components/CategoryPieChart";
import RecentTransactions from "../components/RecentTransactions";
import SubscriptionOverview from "../components/SubscriptionOverview";
import FoodAnalysis from "../components/FoodAnalysis";
import CategoryMonthlySummary from "../components/CategoryMonthlySummary";

export default function Home() {
  const [kpi, setKpi] = useState<any>(null);

  const [monthly, setMonthly] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [transactions, setTransactions] =
    useState<any[]>([]);

  const [subscriptions, setSubscriptions] =
    useState<any[]>([]);

  const [foodData, setFoodData] =
    useState<any[]>([]);

  const [categorySummary, setCategorySummary] =
    useState<any[]>([]);

  useEffect(() => {
    async function load() {

      const { data: kpiData } =
        await supabase
          .from("dashboard_kpis")
          .select("*")
          .single();

      const { data: monthlyData } =
        await supabase
          .from("dashboard_monthly_totals")
          .select("*");

      const { data: storeData } =
        await supabase
          .from("dashboard_store_totals")
          .select("*")
          .limit(10);

      const { data: categoryData } =
        await supabase
          .from("dashboard_category_totals")
          .select("*");

      const { data: transactionData } =
        await supabase
          .from("dashboard_recent_transactions")
          .select("*");

      const { data: subscriptionData } =
        await supabase
          .from("dashboard_subscription_summary")
          .select("*");

      const { data: foodSummary } =
        await supabase
          .from("dashboard_food_summary")
          .select("*");

	const { data: categorySummaryData } =
	  await supabase
	    .from(
	    "dashboard_category_monthly_summary_current_year"
    	)
	.select("*");

      setKpi(kpiData);

      setMonthly(monthlyData || []);
      setStores(storeData || []);
      setCategories(categoryData || []);

      setTransactions(transactionData || []);
      setSubscriptions(subscriptionData || []);
      setFoodData(foodSummary || []);

      setCategorySummary(
        categorySummaryData || []
      );
    }

    load();
  }, []);

  if (!kpi) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-bold">
          Lade Dashboard...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Finanz Dashboard
      </h1>

      <KPIGrid kpi={kpi} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
        <MonthlyChart data={monthly} />
        <StoreRanking stores={stores} />
      </div>

      <CategoryPieChart data={categories} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

        <SubscriptionOverview
          subscriptions={subscriptions}
        />

        <FoodAnalysis
          foodData={foodData}
        />

      </div>

      <RecentTransactions
        transactions={transactions}
      />

      <CategoryMonthlySummary
        data={categorySummary}
      />

    </main>
  );
}