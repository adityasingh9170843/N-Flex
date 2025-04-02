import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "../components/ui/color-mode";
import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Spacer,
  Menu,
  MenuItem,
  Button,
  Portal,
  Drawer,
  CloseButton
} from "@chakra-ui/react";
import { useAuth } from "../context/authProvider";
import { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { SiIcon } from "react-icons/si";
import { FaHamburger } from "react-icons/fa";
function Navbar() {
  const { user, SignInWithGoogle, SignOut } = useAuth();
  const [open, setOpen] = useState(false)
  const handleGoogleLogin = async () => {
    try {
      await SignInWithGoogle();
      console.log("success");
    } catch (err) {
      console.log("Error", err);
    }
  };
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
          <HStack spaceX={10} display={{ base: "none", md: "flex" }}>
            <Link to="/">Home</Link>
            <Link to="/Movies">Movies</Link>
            <Link to="/Shows">Shows</Link>
            <Link to="/Search">
              <BiSearch size={25} />
            </Link>

            {user && (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="" size="xl">
                    <Avatar.Root>
                      <Avatar.Fallback name={user.displayName} />
                      <Avatar.Image src={user.photoURL} />
                    </Avatar.Root>
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Link to="/watchlist">
                        <Menu.Item value="new-txt">WatchList</Menu.Item>
                      </Link>

                      <Menu.Item value="new-txt" onClick={SignOut}>
                        Log Out
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}
            {!user && (
              <Avatar.Root onClick={handleGoogleLogin}>
                <Avatar.Fallback name="" />
                <Avatar.Image src="" />
              </Avatar.Root>
            )}
            <ColorModeButton />
          </HStack>

          {/* Mobile */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link to="/search">
              <BiSearch fontSize={"xl"} />
            </Link>
            
            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
              <Drawer.Trigger asChild>
                <Button variant="outline" size="sm">
                  Open Drawer
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Drawer Title</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Button variant="outline">Cancel</Button>
                      <Button>Save</Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
