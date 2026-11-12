"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ImportsPage() {

  const [imports, setImports] =
    useState<any[]>([]);

  useEffect(() => {

    async function load() {

      const { data } =
        await supabase
          .from("receipt_imports")
          .select("*")
          .order(
            "imported_at",
            {
              ascending: false,
            }
          );

      setImports(data || []);

    }

    load();

  }, []);

  return (

    <main className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        OCR-Importe
      </h1>

      <table className="w-full border">

<thead>

  <tr className="bg-slate-100">

    <th className="p-2 text-left">
      Datum
    </th>

    <th className="p-2 text-left">
      Geschäft
    </th>

    <th className="p-2 text-right">
      Summe
    </th>

    <th className="p-2 text-center">
      Status
    </th>

    <th className="p-2 text-center">
      Aktion
    </th>

  </tr>

</thead>

        <tbody>

          {imports.map(
            (row) => (

<tr
  key={row.id}
  className="border-t"
>

  <td className="p-2">
    {new Date(
      row.imported_at
    ).toLocaleString("de-AT")}
  </td>

  <td className="p-2">
    {row.store_name}
  </td>

  <td className="p-2 text-right">
    €
    {" "}
    {Number(
      row.total_amount || 0
    ).toFixed(2)}
  </td>

  <td className="p-2 text-center">

    <span
      className={
        row.status === "approved"
          ? "text-green-600"
          : row.status === "rejected"
          ? "text-red-600"
          : "text-orange-600"
      }
    >
      {row.status}
    </span>

  </td>

  <td className="p-2 text-center">

    <a
      href={`/imports/detail?id=${row.id}`}
      className="
        text-blue-600
        underline
      "
    >
      Öffnen
    </a>

  </td>

</tr>

            )
          )}

        </tbody>

      </table>

    </main>

  );

}