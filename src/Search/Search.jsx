import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Flex,
  Input,
  Spinner,
  Grid,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { SearchData } from "../services/api";
import CardComponent from "../components/CardComponent";
import Pagination from "../components/Pagination";
function Search() {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [Loading, SetLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    SetLoading(true);
    SearchData(value, page)
      .then(
        (res) =>
          console.log(res) ||
          setData(res?.results) ||
          setPage(res?.page) ||
          setTotalPages(res?.total_pages)
      )
      .catch((err) => console.log(err))
      .finally(() => SetLoading(false));
  }, [page, value]);

  const handleSearch = (e) => {
    e.preventDefault();
    setValue(tempValue);
  };

  return (
    <Container minW={"container.xl"}>
      <Flex alignItems={"center"} gap={4} my={10}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search Movies or Shows"
          colorPalette={"red"}
          fontSize={"md"}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
        />
      </form>

      {Loading && (
        <Flex justify={"center"} mt={10}>
          <Spinner size={"xl"} color={"red"} />
        </Flex>
      )}

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
        {data &&
          data.map((el, i) =>
            Loading ? (
              <Skeleton key={i} height={"300px"} />
            ) : (
              <CardComponent item={el} key={el.id} type={el?.media_type} />
            )
          )}
      </Grid>

      {data.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          SetLoading={SetLoading}
        />
      )}
    </Container>
  );
}

export default Search;
