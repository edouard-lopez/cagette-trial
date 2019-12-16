import axios from "axios";
import {
  Box,
  Column,
  Columns,
  Container,
  Control,
  Field,
  Label,
  Section,
  Select
} from "bloomer";
import "bulma/css/bulma.css";
import React, { useEffect, useState } from "react";
import "./assets/App.css";
import CagetteHero from "./Hero/Hero";
import Loading from "./Loading/Loading";
import Moyenne from "./Moyenne/Moyenne";
import * as Parser from "./parser";
import StatsGraph from "./StatsGraph/StatsGraph";
// import QuestionnaireSelector from "./QuestionnaireSelector";

function App() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [selectedStat, setSelectedStat] = useState();

  const fetchStats = async () => {
    const response = await axios.get("http://localhost:8080/stats");
    setStats(Parser.restructure(response.data));
    setLoading(false);
    setSelectedStat(0);
  };

  const hasStats = () =>
    (selectedStat || selectedStat === 0) && stats.length > 0;

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App" role="app-container">
      <CagetteHero />
      <Section>
        <Container style={{ maxWidth: "1024px" }}>
          <Box>
            <Columns isCentered>
              <Column>
                {hasStats() ? (
                  <>
                    <Moyenne stat={stats[selectedStat]} />
                    <StatsGraph stat={stats[selectedStat || 0]} />
                  </>
                ) : null}
              </Column>
              <Column isSize="narrow">
                <Field hasTextAlign="centered">
                  <Label>Questionnaire:</Label>
                  <Control hasTextAlign="centered">
                    <Select
                      value={selectedStat}
                      defaultValue={0}
                      onChange={event => setSelectedStat(event.target.value)}
                    >
                      {stats.map((stat, index) => (
                        <option value={index}>{stat.code}</option>
                      ))}
                    </Select>
                  </Control>
                </Field>
                {/* <QuestionnaireSelector /> */}
              </Column>
            </Columns>
          </Box>
        </Container>
      </Section>
    </div>
  );
}

export default App;
