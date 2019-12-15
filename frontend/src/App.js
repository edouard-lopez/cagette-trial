import axios from "axios";
import {
  Container,
  Control,
  Field,
  Hero,
  HeroBody,
  Label,
  Section,
  Select,
  Title
} from "bloomer";
import "bulma";
import React, { useEffect, useState } from "react";
import "./assets/App.css";
import Loading from "./Loading/Loading";
import * as Parser from "./parser";
import StatsGraph from "./StatsGraph";

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
        setSelectedStat(0);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Hero isColor="success" isSize="medium">
        <HeroBody>
          <Container hasTextAlign="centered">
            <Title>Cagette 🥕</Title>
          </Container>
        </HeroBody>
      </Hero>
      <Section>
        <Container isFluid isBrand>
          <Field hasTextAlign="centered">
            <Label>Choisir un questionnaire:</Label>
            <Control hasTextAlign="centered">
              <Select
                value={selectedStat}
                onChange={event => setSelectedStat(event.target.value)}
              >
                <option disabled selected>
                  None
                </option>
                {stats.map((stat, index) => (
                  <option value={index}>{stat.code}</option>
                ))}
              </Select>
            </Control>
          </Field>
        </Container>
      </Section>
      <Section>
        <Container isFluid isBrand>
          {selectedStat ? (
            <>
              <p>
                <b>Moyenne&thinsp;:</b>
                <span>&nbsp;{stats[selectedStat].numeric}&thinsp;🥕</span>
              </p>
              <StatsGraph data={stats[selectedStat || 0]} />
            </>
          ) : null}
        </Container>
      </Section>
    </div>
  );
}

export default App;
