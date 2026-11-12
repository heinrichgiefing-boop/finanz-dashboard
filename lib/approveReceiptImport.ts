import { supabase } from "./supabase";

export async function approveReceiptImport(
  importId: number
) {

  //
  // Import laden
  //

  const { data: importData, error } =
    await supabase
      .from("receipt_imports")
      .select("*")
      .eq("id", importId)
      .single();

  if (error) {
    throw error;
  }

  //
  // Store suchen
  //

  let storeId = null;

  if (importData.store_name) {

    const { data: store } =
      await supabase
        .from("stores")
        .select("id")
        .eq(
          "name",
          importData.store_name
        )
        .single();

    storeId = store?.id ?? null;

  }

  //
  // Receipt erzeugen
  //

  const { data: receipt, error: receiptError } =
    await supabase
      .from("receipts")
      .insert({

        external_receipt_id:
          `OCR-${importData.id}`,

        store_id:
          storeId,

        transaction_date:
          new Date()
            .toISOString()
            .split("T")[0],

        total_amount:
          importData.total_amount,

        notes:
          "OCR Import",

      })
      .select()
      .single();

  if (receiptError) {
    throw receiptError;
  }

  //
  // Import aktualisieren
  //

  const { error: updateError } =
    await supabase
      .from("receipt_imports")
      .update({

        status: "approved",

        approved_at:
          new Date()
            .toISOString(),

        receipt_id:
          receipt.id,

      })
      .eq(
        "id",
        importId
      );

  if (updateError) {
    throw updateError;
  }

  return receipt;
}