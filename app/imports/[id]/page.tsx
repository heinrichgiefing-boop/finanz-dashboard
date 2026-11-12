"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function ImportDetailPage() {

  const params = useParams();

  const id = params.id as string;

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadImport() {

      const { data } =
        await supabase
          .from("receipt_imports")
          .select("*")
          .eq("id", id)
          .single();

      setData(data);
      setLoading(false);

    }

    if (id) {
      loadImport();
    }

  }, [id]);

  if (loading) {
    return (
      <main className="p-8">
        Lädt...
      </main>
    );
  }

  if (!data) {
    return (
      <main className="p-8">
        Import nicht gefunden
      </main>
    );
  }

  return (
    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Import #{data.id}
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="mb-4">
          <strong>Geschäft:</strong>{" "}
          {data.store_name}
        </div>

        <div className="mb-4">
          <strong>Summe:</strong>{" "}
          € {data.total_amount}
        </div>

        <div className="mb-4">
          <strong>Status:</strong>{" "}
          {data.status}
        </div>

        <div className="mb-6">
          <strong>Bild:</strong>{" "}
          {data.image_path}
        </div>

        <h2 className="text-xl font-bold mb-2">
          OCR Rohtext
        </h2>

        <pre className="bg-slate-100 p-4 rounded whitespace-pre-wrap text-sm">
          {data.ocr_text}
        </pre>

      </div>

    </main>
  );
}