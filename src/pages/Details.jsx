import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails, imagePathOriginal } from "../services/api";
import { imagePath } from "../services/api";
import {
  Spinner,
  Flex,
  Box,
  Container,
  Image,
  Heading,
  Text,
  HStack,
  ProgressCircle,
  AbsoluteCenter,
  Button,
  Span,
} from "@chakra-ui/react";
import { CgCalendar } from "react-icons/cg";
import { GiCircularSaw } from "react-icons/gi";
import { resolveRatingColor } from "../utils/utils";
import { TiTick } from "react-icons/ti";
import { BiPlus } from "react-icons/bi";
function Details() {
  const router = useParams();
  const { type, id } = router;
  const [Loading, SetLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    SetLoading(true);
    fetchDetails(type, id)
      .then((res) => setData(res) || console.log(res))
      .catch((err) => console.log(err))
      .finally(() => SetLoading(false));
  }, [type, id]);

  if (Loading)
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} color={"red"} />
      </Flex>
    );
    const releaseDate = type === "tv" ? data?.first_air_date : data?.release_date;
  return (
    <Box>
      <Box
        bg={`linear-gradient(rgba(0,0,0,.88),rgba(0,0,0,.88)), url(${imagePathOriginal}/${data?.backdrop_path})`}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
        bgPosition={"center"}
        w={"100%"}
        h={{ base: "auto", md: "500px" }}
        py={2}
        display={"flex"}
        zIndex={-1}
        alignItems={"center"}
      >
        <Container maxW={"container.xl"}>
          <Flex
            align={"center"}
            gap={10}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Image
              height={"450px"}
              rounded={"sm"}
              src={`${imagePath}${data?.poster_path}`}
            />
            <Box>
              <Heading color={"white"} fontSize={"3xl"}>
                {data?.title || data?.name}
                {" ("}
                {new Date(releaseDate).getFullYear()}
                {")"}
              </Heading>
              <Flex alignItems={"center"} gap={4} mt={3} mb={5}>
                <Flex align={"center"} gap={2}>
                  <CgCalendar color="white" />
                  <Text fontSize={"sm"} color={"gray.400"}>
                  {releaseDate ? new Date(releaseDate).toLocaleDateString("en") : "N/A"}
                  </Text>
                </Flex>
              </Flex>

              <Flex alignItems={"center"} gap={4}>
                <ProgressCircle.Root
                  value={data?.vote_average*10}
                  bg={"gray.800"}
                  rounded={"full"}
                  size={"xl"}
                  color={"white"}
                >
                  <ProgressCircle.Circle>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range
                      stroke={resolveRatingColor(data?.vote_average)}
                    />
                  </ProgressCircle.Circle>
                  <AbsoluteCenter>
                    <ProgressCircle.ValueText />
                  </AbsoluteCenter>
                </ProgressCircle.Root>
                <Text display={{ base: "none", md: "block" }} color={"white"}>
                  User Score
                </Text>
                <Button
                  display={"none"}
                  colorPalette={"green"}
                  variant={"outline"}
                >
                  <HStack>
                    <TiTick />
                    <Text>In Watchlist</Text>
                  </HStack>
                </Button>
                <Button colorPalette={"green"} variant={"outline"}>
                  <HStack>
                    <BiPlus/>
                    <Text>Add to Watchlist</Text>
                  </HStack>
                </Button>
              </Flex>
              <Text my={5} color={"white"} fontStyle={"italic"} fontSize={"sm"} >{data?.tagline}</Text>
              <Heading fontSize={"xl"} color={"white"} mb={3}>Overview</Heading>
              <Text fontSize={"md"} color={"white"}>{data?.overview}</Text>
              <Flex mt={6} gap={2}>
                {data?.genres?.map((item) => (
                  <Box
                    key={item.id}
                    p={2}
                    rounded={"md"}
                    bg={"gray.800"}
                    color={"white"}
                  >
                    {item.name}
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
export default Details;
