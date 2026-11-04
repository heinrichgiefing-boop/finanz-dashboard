"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

import SubscriptionOverview
from "../../components/SubscriptionOverview";

export default function AbosPage() {
  const [subscriptions, setSubscriptions] =
    useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("dashboard_subscription_summary")
        .select("*");

      setSubscriptions(data || []);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Abonnements
      </h1>

      <SubscriptionOverview
        subscriptions={subscriptions}
      />

    </main>
  );
}