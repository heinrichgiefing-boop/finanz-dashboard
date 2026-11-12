"use client";

"use client";

import { useState } from "react";

import { formatCurrency }
from "../lib/formatters";

import { saveReceiptImport }
from "../lib/saveReceiptImport";

export default function ReceiptImportPreview({
  parsedReceipt,
  uploadedPath,
}: any) {

  const [saving, setSaving] =
    useState(false);

  if (!parsedReceipt) {
    return null;
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Importvorschlag
      </h2>

      <div className="mb-2">

        <strong>Geschäft:</strong>
        {" "}
        {parsedReceipt.store}

      </div>

      <div className="mb-4">

        <strong>Gesamtsumme:</strong>
        {" "}
        {formatCurrency(
          parsedReceipt.total
        )}

      </div>

      <table className="w-full border">

        <thead>

          <tr className="bg-slate-100">

            <th className="text-left p-2">
              Artikel
            </th>

            <th className="text-right p-2">
              Preis
            </th>

          </tr>

        </thead>

        <tbody>

          {parsedReceipt.items.map(
            (
              item: any,
              index: number
            ) => (

              <tr
                key={index}
                className="border-t"
              >

                <td className="p-2">
                  {item.name}
                </td>

                <td className="p-2 text-right">
                  {formatCurrency(
                    item.price
                  )}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

<button
  onClick={async () => {

    try {

      console.log(
        "SAVE START"
      );

      const result =
        await saveReceiptImport(
          parsedReceipt,
          uploadedPath
        );

      console.log(
        "SAVE SUCCESS",
        result
      );

      alert(
        "✅ Import gespeichert"
      );

    } catch (error) {

      console.error(
        "SAVE ERROR",
        error
      );

      alert(
        "❌ Fehler beim Speichern"
      );

    }

  }}
  className="
    mt-6
    bg-green-600
    text-white
    px-4
    py-2
    rounded
  "
>
  💾 In Datenbank speichern
</button>

    </div>
  );
}