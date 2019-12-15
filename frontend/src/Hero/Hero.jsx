import { Container, Hero, HeroBody, Title } from "bloomer";
import React from "react";

function CagetteHero() {
  return (
    <Hero isColor="success" isSize="medium">
      <HeroBody>
        <Container hasTextAlign="centered">
          <Title>Cagette <span role="img" aria-label="carotte">🥕</span> </Title>
        </Container>
      </HeroBody>
    </Hero>
  );
}

export default CagetteHero;