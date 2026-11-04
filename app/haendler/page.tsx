"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import StoreRanking from "../../components/StoreRanking";

export default function HaendlerPage() {
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("dashboard_store_totals")
        .select("*");

      setStores(data || []);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Händleranalyse
      </h1>

      <StoreRanking stores={stores} />
    </main>
  );
}