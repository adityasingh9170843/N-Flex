import {
  Text,
  Container,
  Grid,
  Heading,
  Image,
  Flex,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { fetchTrending, imagePath } from "../services/api";
import CardComponent from "../components/CardComponent";

function Home() {
  const [data, setData] = useState([]);
  const [timeWindow, SetTimeWindow] = useState("day");
  const [Loading, SetLoading] = useState(true);
  useEffect(() => {
    SetLoading(true);
    fetchTrending(timeWindow)
      .then((res) => setData(res))
      .catch((err) => console.log(err))
      .finally(() => SetLoading(false));
  }, [timeWindow]);

  console.log("data", data);
  console.log(timeWindow);

  
  return (
    <Container minW={"container.xl"}>
      <Flex alignItems={"center"} gap={4} my={10}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          align={"center"}
          gap={2}
          border={"3px solid teal"}
          rounded={"2xl"}
        >
          <Box
            p={3}
            as={"button"}
            bg={timeWindow === "day" ? "gray.900" : ""}
            onClick={() => SetTimeWindow("day")}
            rounded={"2xl"}
            cursor={"pointer"}
          >
            Today
          </Box>
          <Box
            p={3}
            bg={timeWindow === "week" ? "gray.900" : ""}
            as={"button"}
            onClick={() => SetTimeWindow("week")}
            rounded={"2xl"}
            cursor={"pointer"}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
        mt={10}
      >
        {data && data.map((el,i) => Loading? (<Skeleton key={i} height={"300px"}/>) : (<CardComponent item={el} key={el.id}/>))}
      </Grid>
    </Container>
  );
}

export default Home;
