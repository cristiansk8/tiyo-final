// components/ScansByQrAndDayChart.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Definir la interfaz para las props del componente
interface ScansByQrAndDayChartProps {
  data: ({ date: string } & { [key: string]: number })[]; // date es string, el resto son números
}

// Componente ScansByQrAndDayChart
export default function ScansByQrAndDayChart({ data }: ScansByQrAndDayChartProps) {
  // Obtener los nombres de los códigos QR (claves dinámicas)
  const qrNames = Object.keys(data[0] || {}).filter((key) => key !== "date");

  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {qrNames.map((qrName) => (
        <Line
          key={qrName}
          type="monotone"
          dataKey={qrName}
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Color aleatorio
        />
      ))}
    </LineChart>
  );
}