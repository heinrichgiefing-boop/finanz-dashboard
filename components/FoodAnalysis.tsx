"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#16a34a",
  "#22c55e",
  "#84cc16",
  "#65a30d",
  "#15803d",
  "#4ade80",
];

export default function FoodAnalysis({
  foodData,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Lebensmittelanalyse
      </h2>

      <div
        style={{
          width: "100%",
          height: 400,
        }}
      >

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={foodData}
              dataKey="amount"
              nameKey="name"
              outerRadius={140}
              label
            >

              {foodData.map(
                (
                  _item: any,
                  index: number
                ) => (

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