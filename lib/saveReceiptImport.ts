import { supabase } from "./supabase";

export async function saveReceiptImport(
  parsedReceipt: any,
  uploadedPath: string
) {

  const { data, error } =
    await supabase
      .from("receipt_imports")
      .insert({

        store_name:
          parsedReceipt.store,

        total_amount:
          parsedReceipt.total,

        receipt_number:
          parsedReceipt.receiptNumber,

        purchase_date:
          parsedReceipt.purchaseDate,

        image_path:
          uploadedPath,

        ocr_text:
          parsedReceipt.rawText,

        parsed_json:
          parsedReceipt,

      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}