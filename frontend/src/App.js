import React, { useState, useEffect } from "react";
import "./assets/App.css";
import axios from "axios";
import Loading from "./Loading/Loading";
import StatsGraph from "./StatsGraph";
import * as Parser from "./parser";

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [selectedStat, setSelectedStat] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8080/stats");
        setStats(Parser.restructure(response.data));
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Loading loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Statistiques</h1>
        <select
          value={selectedStat}
          onChange={event => setSelectedStat(event.target.value)}
        >
          <option>Choisir un questionnaire</option>
          {stats.map((stat, index) => (
            <option value={index}>{stat.code}</option>
          ))}
        </select>
        {selectedStat ? (
          <>
            <p>
              <b>Numeric:</b>
              <span>{stats[selectedStat].numeric}</span>
            </p>
            <StatsGraph data={stats[selectedStat || 0]} />
          </>
        ) : null}
      </header>
    </div>
  );
}

export default App;
