import {
  Legend,
  BarChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import React, { Component } from "react";

class StatsGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    console.log("data", data);
    console.log("data.qcm", data.qcm);
    return (
      <BarChart
        width={600}
        height={300}
        data={data.qcm}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" barSize={20} fill="#8884d8" />
        {/* <Line type="monotone" dataKey="predicted" stroke="#82ca9d" /> */}
      </BarChart>
    );
  }
}

export default StatsGraph;
