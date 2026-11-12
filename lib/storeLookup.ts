import { supabase } from "./supabase";

export async function lookupStore(
  detectedStore: string
) {
  if (!detectedStore) {
    return null;
  }

  //
  // Exakter Alias-Treffer
  //

  const { data: aliasMatch } =
    await supabase
      .from("store_aliases")
      .select(`
        alias,
        store_id,
        stores (
          id,
          name
        )
      `)
      .ilike(
        "alias",
        detectedStore
      )
      .limit(1)
      .single();

  if (aliasMatch) {
    return aliasMatch.stores;
  }

  //
  // Fallback-Regeln
  //

  const upper =
    detectedStore.toUpperCase();

  if (
    upper.includes("SPAR") ||
    upper.includes("EUROSPAR")
  ) {
    return {
      name: "SPAR",
    };
  }

  if (
    upper.includes("BILLA")
  ) {
    return {
      name: "BILLA Plus",
    };
  }

  if (
    upper.includes("HOFER")
  ) {
    return {
      name: "HOFER",
    };
  }

  if (
    upper.includes("LIDL")
  ) {
    return {
      name: "LIDL",
    };
  }

  if (
    upper.includes("DM")
  ) {
    return {
      name: "dm",
    };
  }

  if (
    upper.includes("REITER")
  ) {
    return {
      name:
        "Reiter Betten & Vorhänge GmbH",
    };
  }

  //
  // Unbekannten Namen speichern
  //

  await supabase
    .from("unmatched_store_names")
    .insert({
      detected_name:
        detectedStore,
    });

  return {
    name: detectedStore,
  };
}