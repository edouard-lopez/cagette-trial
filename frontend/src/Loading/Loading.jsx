import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Section, Subtitle, Title } from "bloomer";
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import React from "react";

function Loading() {
  return (
    <Section style={{ height: "100vh" }} hasTextAlign="centered">
      <Container >
        <Title isSize={1} hasTextColor="success" style={{marginTop: '30%'}}>
        <FontAwesomeIcon icon={faSeedling} style={{opacity: '40%'}} />
        </Title>
        <Subtitle hasTextColor="light" isSize={3}>
          Chargement…
        </Subtitle>
      </Container>
    </Section>
  );
}

export default Loading;
