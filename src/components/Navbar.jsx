import React from "react";
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
} from "@chakra-ui/react";
import { useAuth } from "../context/authProvider";
import { useContext } from "react";
import { BiSearch } from "react-icons/bi";
function Navbar() {
  const { user, SignInWithGoogle, SignOut } = useAuth();
  const handleGoogleLogin = async() => {
    try{
      await SignInWithGoogle();
      console.log("success")
    }catch(err){
      console.log("Error",err)
    }
  }
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
            <Link to="/Search"><BiSearch size={25}/></Link>

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
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
