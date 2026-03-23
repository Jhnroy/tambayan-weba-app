"use client";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

type Props = {
  data: { type: string; value: number }[];
};

const RADIAN = Math.PI / 180;


const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  if (!cx || !cy || !innerRadius || !outerRadius) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-semibold"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    return (
      <div className="bg-white p-3 rounded-lg shadow-md text-sm border">
        <p className="font-semibold">{data.name}</p>
        <p className="text-gray-500">Value: {data.value}</p>
      </div>
    );
  }

  return null;
};

export function EventTypesChart({ data }: Props) {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>

          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            height={40}
            iconType="circle"
          />

          <Pie
            data={data}
            dataKey="value"
            nameKey="type"
            cx="50%"
            cy="42%" 
            innerRadius={60} 
            outerRadius={110} 
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}