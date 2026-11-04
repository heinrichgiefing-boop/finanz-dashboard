import { formatCurrency } from "../lib/formatters";

export default function RecentTransactions({
  transactions,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Letzte Einkäufe
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr>
              <th className="text-left p-2">
                Datum
              </th>

              <th className="text-left p-2">
                Geschäft
              </th>

              <th className="text-left p-2">
                Artikel
              </th>

              <th className="text-right p-2">
                Betrag
              </th>
            </tr>
          </thead>

          <tbody>

            {transactions.map(
              (item: any, index: number) => (

                <tr
                  key={index}
                  className="border-b"
                >

                  <td className="p-2">
                    {item.transaction_date}
                  </td>

                  <td className="p-2">
                    {item.store}
                  </td>

                  <td className="p-2">
                    {item.item_name}
                  </td>

                  <td className="p-2 text-right">
                    {formatCurrency(
                      item.final_price
                    )}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}