import React, { useEffect, useState } from "react";
import { Container, Heading, Flex, Select, Box ,createListCollection,Portal } from "@chakra-ui/react";
import { fetchMovies } from "../services/api";
import { Grid, Skeleton } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent";
import Pagination from "../components/Pagination";
function Movies() {
  const [movies, setMovies] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    SetLoading(true);
    fetchMovies(page)
      .then(
        (res) =>
          console.log(res) ||
          setMovies(res?.results) ||
          setPage(res?.page) ||
          setTotalPages(res?.total_pages)
      )
      .catch((err) => console.log(err))
      .finally(() => SetLoading(false));
  }, [page]);
  const filter = createListCollection({
    items: [
      { label: "Popularity", value: "popularity.desc" },
      { label: "Top Rated", value: "vote_average" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  })
  return (
    <Container minW={"container.xl"}>
      <Flex alignItems={"center"} gap={4} my={10}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>
        <Select.Root collection={filter} size="sm" width="320px " onChange={(e) => console.log(e.target.value)}  >
      <Select.HiddenSelect />
      <Select.Label>Select Filter</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Filter" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content  >
            {filter.items.map((framework) => (
              <Select.Item item={framework} key={framework.value} onChange={(e) => console.log(e)}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  
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
        {movies &&
          movies.map((el, i) =>
            Loading ? (
              <Skeleton key={i} height={"300px"} />
            ) : (
              <CardComponent item={el} key={el.id} type={"movie"} />
            )
          )}
      </Grid>
      {/* <Pagination /> */}
      <Pagination active={page} total={totalPages} setPage={setPage} />
    </Container>
  );
}

export default Movies;
