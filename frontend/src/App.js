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
import * as Parser from "./parser";
import StatsGraph from "./StatsGraph";
// import QuestionnaireSelector from "./QuestionnaireSelector";

function App() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [selectedStat, setSelectedStat] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get("http://localhost:8080/stats");
      setStats(Parser.restructure(response.data));
      setLoading(false);
      setSelectedStat(0);
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <CagetteHero />
      <Section>
        <Container style={{ maxWidth: "1024px" }}>
          <Box>
            <Columns isCentered>
              <Column>
                {selectedStat || selectedStat === 0 ? (
                  <>
                    <p>
                      <b>Moyenne&thinsp;:</b>
                      <span>&nbsp;{stats[selectedStat].numeric}&thinsp;🥕</span>
                    </p>
                    <StatsGraph data={stats[selectedStat || 0]} />
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
