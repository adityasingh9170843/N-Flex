import React from "react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "../components/ui/color-mode";
import { Box, Container, Flex, HStack, Spacer } from "@chakra-ui/react";
function Navbar() {
  return (
    <Box mb={2} py={5}>
      <Container maxW="container.xl" >
        <Flex>
          <Link to="/">
            <Box fontSize="2xl" fontWeight={"bold"} color={"red"} letterSpacing={"widest"} fontFamily={"mono"}>N-Flex</Box>
          </Link>
          <Spacer/>
          <HStack spaceX={10}>
            <Link to="/">Home</Link>
            <Link to="/Movies">Movies</Link>
            <Link to="/Shows">Shows</Link>
            <ColorModeButton />
        </HStack>
        </Flex>
        
      </Container>
    </Box>
  );
}

export default Navbar;
