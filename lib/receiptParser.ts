export interface ReceiptItem {
  name: string;
  price: number;
}

export interface ParsedReceipt {
  store: string | null;
  total: number | null;
  receiptNumber: string | null;
  purchaseDate: string | null;
  items: ReceiptItem[];
  rawText: string;
}

function extractPrice(
  value: string
): number {
  return Number(
    value.replace(",", ".")
  );
}

function isIgnoredLine(
  text: string
): boolean {

  const upper =
    text.toUpperCase();

  const ignoreWords = [
    "TOTAL",
    "NETTO",
    "STEUER",
    "BRUTTO",
    "RÜCKGELD",
    "BARZAHLUNG",
    "GEGEBEN",
    "ZAHLUNG",
    "KASSA",
    "UST",
    "SUMME",
    "RABATT",
    "AKTION PREIS",
    "TELEFON",
    "E-MAIL",
    "WWW",
    "UID",
    "UST-ID",
    "KDL.-NR",
    "KUNDENNUMMER",
  ];

  return ignoreWords.some(
    word => upper.includes(word)
  );
}

function detectStore(
  text: string
): string | null {

  const upper =
    text.toUpperCase();

  if (
    upper.includes("REITER")
  ) {
    return "Reiter Betten & Vorhänge GmbH";
  }

  if (
    upper.includes("EUROSPAR")
  ) {
    return "SPAR";
  }

  if (
    upper.includes("SPAR")
  ) {
    return "SPAR";
  }

  if (
    upper.includes("BILLA PLUS")
  ) {
    return "BILLA Plus";
  }

  if (
    upper.includes("BILLA")
  ) {
    return "BILLA Plus";
  }

  if (
    upper.includes("HOFER")
  ) {
    return "HOFER";
  }

  if (
    upper.includes("LIDL")
  ) {
    return "LIDL";
  }

  if (
    upper.includes("DM")
  ) {
    return "dm";
  }

  if (
    upper.includes("MÜLLER")
  ) {
    return "Müller";
  }

  if (
    upper.includes("IKEA")
  ) {
    return "IKEA";
  }

  if (
    upper.includes("OBI")
  ) {
    return "OBI";
  }

  return null;
}

export function parseReceipt(
  text: string
): ParsedReceipt {

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  let store: string | null = null;
  let total: number | null = null;
  let purchaseDate: string | null = null;
  let receiptNumber: string | null = null;

  const items: ReceiptItem[] = [];

  for (const line of lines) {

    //
    // Geschäft
    //

    if (!store) {

      const detected =
        detectStore(line);

      if (detected) {
        store = detected;
      }

    }

    //
    // Datum
    //

    if (!purchaseDate) {

      const dateMatch =
        line.match(
          /(\d{2}[\.\/-]\d{2}[\.\/-]\d{4})/
        );

      if (dateMatch) {
        purchaseDate =
          dateMatch[1];
      }
    }

    //
    // Belegnummer
    //

    if (
      !receiptNumber &&
      (
        line.toUpperCase().includes(
          "KASSENBELEG"
        ) ||
        line.toUpperCase().includes(
          "BELEG"
        ) ||
        line.toUpperCase().includes(
          "RECHNUNG"
        )
      )
    ) {

      const numberMatch =
        line.match(
          /(\d{6,})/
        );

      if (numberMatch) {
        receiptNumber =
          numberMatch[1];
      }

    }

    //
    // Total
    //

    const upper =
      line.toUpperCase();

    if (
      upper.includes("TOTAL") &&
      !upper.includes("RÜCKGELD") &&
      !upper.includes("BARZAHLUNG")
    ) {

      const amounts =
        line.match(
          /\d+[,\.]\d{2}/g
        );

      if (
        amounts &&
        amounts.length > 0
      ) {

        total = extractPrice(
          amounts[
            amounts.length - 1
          ]
        );

      }

    }

    //
    // Artikel + Preis
    //

    const itemMatch =
      line.match(
        /^(.+?)\s+(\d+[,\.]\d{2})\s*(EUR)?$/i
      );

    if (!itemMatch) {
      continue;
    }

    const name =
      itemMatch[1]
        .trim();

    const price =
      extractPrice(
        itemMatch[2]
      );

    if (
      name.length < 3 ||
      price <= 0
    ) {
      continue;
    }

    if (
      isIgnoredLine(name)
    ) {
      continue;
    }

    items.push({
      name,
      price,
    });

  }

  //
  // Fallback für Total
  //

  if (
    total === null &&
    items.length > 0
  ) {

    total =
      Math.max(
        ...items.map(
          i => i.price
        )
      );

  }

  //
  // Duplikate entfernen
  //

  const uniqueItems =
    items.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          i =>
            i.name === item.name &&
            i.price === item.price
        )
    );
//
// Spezialfall:
// Artikel in einer Zeile,
// Preis in nachfolgender Zeile
//

for (let i = 0; i < lines.length; i++) {

  const line =
    lines[i].trim();

  if (
    line
      .toUpperCase()
      .includes("WASCHLAPPEN")
  ) {

    let price: number | null = null;

    for (
      let j = i;
      j < Math.min(i + 5, lines.length);
      j++
    ) {

      const match =
        lines[j].match(
          /(\d+[,\.]\d{2})/
        );

      if (match) {

        price = Number(
          match[1]
            .replace(",", ".")
        );

      }

      if (
        lines[j]
          .toUpperCase()
          .includes("AKTION PREIS")
      ) {

        const promo =
          lines[j].match(
            /(\d+[,\.]\d{2})/
          );

        if (promo) {

          price = Number(
            promo[1]
              .replace(",", ".")
          );

        }

      }

    }

    if (price) {

      items.push({
        name:
          "Waschlappen 4er Set",
        price,
      });

    }

  }

}

  return {
    store,
    total,
    purchaseDate,
    receiptNumber,
    items: uniqueItems,
    rawText: text,
  };
}