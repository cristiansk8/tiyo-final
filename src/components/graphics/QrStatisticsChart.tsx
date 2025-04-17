// components/QrStatisticsChart.tsx
"use client"; // Recharts requiere interactividad del lado del cliente

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface QrStatisticsChartProps {
  data: { name: string; scans: number }[]; // Datos para el gráfico
}


export default function QrStatisticsChart({ data }: QrStatisticsChartProps) {
  /* console.log(data) */
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        formatter={(value) => [value, "Scans"]}
        labelFormatter={(label) => `Time Slot: ${label}`}
      />
      <Legend />
      <Bar dataKey="scans" fill="oklch(0.623 0.214 259.815)" name=" " />
    </BarChart>
  );
}