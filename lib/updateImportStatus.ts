import { supabase } from "./supabase";

export async function updateImportStatus(
  id: number,
  status: "approved" | "rejected"
) {

  const { error } =
    await supabase
      .from("receipt_imports")
      .update({
        status,
      })
      .eq("id", id);

  if (error) {
    throw error;
  }

}