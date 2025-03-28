import React from "react";
import { Container, Heading } from "@chakra-ui/react";
function Search() {
  return (
    <Container minW={"container.xl"}>
      <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
        Search
      </Heading>
    </Container>
  );
}

export default Search;
