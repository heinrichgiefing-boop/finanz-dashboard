import { formatCurrency } from "../lib/formatters";

export default function SubscriptionOverview({
  subscriptions,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Abos
      </h2>

      <div className="space-y-3">

        {subscriptions.map(
          (sub: any, index: number) => (

            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >

              <span>
                {sub.item_name}
              </span>

              <span className="font-bold text-blue-600">
                {formatCurrency(sub.amount)}
              </span>

            </div>

          )
        )}

      </div>

    </div>
  );
}