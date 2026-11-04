"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#7c3aed",
  "#0891b2",
  "#ea580c",
  "#4b5563",
];

export default function CategoryPieChart(
  { data }: any
) {

  return (

    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Kategorien
      </h2>

      <div style={{ width: "100%", height: 500 }}>

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius={180}
              label
            >

              {data.map(
                (_: any, index: number) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}