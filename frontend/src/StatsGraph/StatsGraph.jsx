import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

function StatsGraph({ stat }) {
  console.log('stat', stat);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={stat.qcm}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" barSize={20} fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatsGraph;
