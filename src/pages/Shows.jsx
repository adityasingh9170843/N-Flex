import React from "react";
import { Container, Heading } from "@chakra-ui/react";
function Shows() {
  return (
    <Container minW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Discover Shows
      </Heading>
    </Container>
  );
}

export default Shows;
