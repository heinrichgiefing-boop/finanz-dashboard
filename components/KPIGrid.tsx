import { formatCurrency } from "../lib/formatters";

export default function KPIGrid({ kpi }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      <div className="bg-white rounded-xl shadow p-5">
        <div>Gesamtausgaben</div>
        <div className="text-3xl font-bold">
          {formatCurrency(kpi.total_spending)}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div>Positionen</div>
        <div className="text-3xl font-bold">
          {kpi.positions}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div>Artikel</div>
        <div className="text-3xl font-bold">
          {kpi.unique_items}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div>Ø Kauf</div>
        <div className="text-3xl font-bold">
          {formatCurrency(kpi.average_purchase)}
        </div>
      </div>

    </div>
  );
}