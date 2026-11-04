import { formatCurrency } from "../lib/formatters";

export default function StoreRanking({
  stores,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Händler-Ranking
      </h2>

      <div className="space-y-3">

        {stores.map(
          (store: any, index: number) => (

            <div
              key={store.store}
              className="flex justify-between border-b pb-2"
            >

              <span>
                #{index + 1} {store.store}
              </span>

              <span className="font-bold">
                {formatCurrency(store.amount)}
              </span>

            </div>

          )
        )}

      </div>

    </div>
  );
}