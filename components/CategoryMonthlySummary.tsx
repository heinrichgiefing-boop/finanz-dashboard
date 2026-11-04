import { formatCurrency } from "../lib/formatters";

export default function CategoryMonthlySummary({
  data,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Kategorien nach Monat
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b bg-slate-100">

              <th className="p-2 text-left">
                Kategorie
              </th>

              <th className="p-2 text-right">Jan</th>
              <th className="p-2 text-right">Feb</th>
              <th className="p-2 text-right">Mär</th>
              <th className="p-2 text-right">Apr</th>
              <th className="p-2 text-right">Mai</th>
              <th className="p-2 text-right">Jun</th>
              <th className="p-2 text-right">Jul</th>
              <th className="p-2 text-right">Aug</th>
              <th className="p-2 text-right">Sep</th>
              <th className="p-2 text-right">Okt</th>
              <th className="p-2 text-right">Nov</th>
              <th className="p-2 text-right">Dez</th>

              <th className="p-2 text-right font-bold">
                Jahr
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((row: any) => {

              const isTotal =
                row.category === "TOTAL";

              return (

                <tr
                  key={row.category}
                  className={
                    isTotal
                      ? "bg-slate-200 font-bold"
                      : "border-b"
                  }
                >

                  <td className="p-2 text-right">
  {formatCurrency(row.jan)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.feb)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.mar)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.apr)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.may)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.jun)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.jul)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.aug)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.sep)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.oct)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.nov)}
</td>

<td className="p-2 text-right">
  {formatCurrency(row.dec)}
</td>

<td className="p-2 text-right font-bold">
  {formatCurrency(row.year_total)}
</td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}