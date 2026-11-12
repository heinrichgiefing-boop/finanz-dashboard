"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import {  updateImportStatus } from "../../../lib/updateImportStatus";

function ImportDetailContent() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImport() {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("receipt_imports")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      }

      setData(data);
      setLoading(false);
    }

    loadImport();
  }, [id]);

  if (loading) {
    return (
      <main className="p-8">
        <h1>Lädt...</h1>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="p-8">
        <h1>Import nicht gefunden</h1>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        OCR Import #{data.id}
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="mb-4">
          <strong>Geschäft:</strong> {data.store_name}
        </div>

        <div className="mb-4">
          <strong>Summe:</strong> € {data.total_amount}
        </div>

        <div className="mb-4">
          <strong>Status:</strong> {data.status}
        </div>

        <div className="mb-4">
          <strong>Belegbild:</strong> {data.image_path}
        </div>

        <h2 className="text-xl font-bold mt-6 mb-2">
          OCR Rohtext
        </h2>

        <pre className="bg-slate-100 p-4 rounded whitespace-pre-wrap text-sm">
          {data.ocr_text}
        </pre>

         <div className="mt-6 flex gap-4">

            <button
              onClick={async () => {

                await updateImportStatus(
                  data.id,
                  "approved"
                );

                location.reload();

              }}
              className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded
              "
            >
              ✅ Freigeben
            </button>

            <button
              onClick={async () => {

                await updateImportStatus(
                  data.id,
                  "rejected"
                );

                location.reload();

              }}
              className="
                bg-red-600
                text-white
                px-4
                py-2
                rounded
              "
            >
              ❌ Verwerfen
            </button>

          </div>
        <button
          onClick={async () => {

            await updateImportStatus(
              data.id,
              "approved"
            );

            location.reload();

          }}
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          ✅ Freigeben
        </button>

        <button
          onClick={async () => {

            await updateImportStatus(
              data.id,
              "rejected"
            );

            location.reload();

          }}
          className="
            bg-red-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          ❌ Verwerfen
        </button>

      </div>        
      </div>
    </main>
  );
}

export default function ImportDetailPage() {
  return (
    <Suspense fallback={<div>Lädt...</div>}>
      <ImportDetailContent />
    </Suspense>
  );
}