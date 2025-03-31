import React from "react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "../components/ui/color-mode";
import { Avatar, Box, Container, Flex, HStack, Spacer,Menu,MenuItem,Button,Portal } from "@chakra-ui/react";
import { useAuth } from "../context/authProvider";
import { useContext } from "react";
function Navbar() {
  const { user, SignInWithGoogle, SignOut } = useAuth();
  return (
    <Box mb={2} py={5}>
      <Container maxW="container.xl">
        <Flex>
          <Link to="/">
            <Box
              fontSize="2xl"
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              N-Flex
            </Box>
          </Link>
          <Spacer />
          <HStack spaceX={10}>
            <Link to="/">Home</Link>
            <Link to="/Movies">Movies</Link>
            <Link to="/Shows">Shows</Link>
            <Link to="/Search">Search</Link>
            
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="outline" size="xl">
                    <Avatar.Root>
                      <Avatar.Fallback name="Segun Adebayo" />
                      <Avatar.Image src="https://bit.ly/sage-adebayo" />
                    </Avatar.Root>
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Link to="/">
                        <Menu.Item value="new-txt">WatchList</Menu.Item>
                      </Link>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            
            <ColorModeButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
