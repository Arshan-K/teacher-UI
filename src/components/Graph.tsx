"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTeachers } from "@/hooks/useTeachers";

// Utility to get month name from timestamp
const getMonthName = (timestamp: number) =>
  new Date(timestamp).toLocaleString("default", { month: "short" });

const Graph = () => {
  const { teachers } = useTeachers();

  // Group by month
  const counts: Record<string, number> = {};

  teachers.forEach((teacher) => {
    const month = getMonthName(teacher.createdAt);
    counts[month] = (counts[month] || 0) + 1;
  });

  // Create a fixed month list for consistency (Jan to Dec)
  const allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const data = allMonths.map((month) => ({
    name: month,
    Teachers: counts[month] || 0,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Monthly Teacher Stats</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Teachers"
            stroke="#dc2626"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
