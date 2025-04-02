import { useState, useEffect } from "react";
import { useFireStore } from "../services/FireStore";
import { useAuth } from "../context/authProvider";
import { Flex, Heading, Container, Spinner,Grid } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchListCard";
function WatchList() {
  const { user } = useAuth();
  const { getWatchlist } = useFireStore();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getWatchlist(user.uid)
        .then((res) => {
          setWatchlist(res);
          console.log(res);
          setIsLoading(false);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [user?.uid, getWatchlist]);
  return (
    <Container minW={"container.xl"}>
      <Flex alignItems={"center"} gap={4} my={10}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Watchlist
        </Heading>
      </Flex>
      {isLoading && (
        <Flex justify={"center"} mt={10}>
          <Spinner size={"xl"} color={"red.500"}/>
        </Flex>
      )}
      {!isLoading && watchlist.length === 0 && (
        <Flex justify={"center"} mt={10}>
        <Heading>Watchlist is empty</Heading>
      </Flex>
      )}
      {!isLoading && watchlist.length > 0 && (
        <Grid templateColumns={{base:"1fr"}} gap={4}>
          {watchlist.map((item) => (
            <WatchlistCard key={item.id} item={item} type={item?.type} setWatchlist={setWatchlist} />
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default WatchList;
