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

function StatsGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data.qcm}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" barSize={20} fill="#82ca9d" />
        {/* <Line type="monotone" dataKey="predicted" stroke="#8884d8" /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatsGraph;
