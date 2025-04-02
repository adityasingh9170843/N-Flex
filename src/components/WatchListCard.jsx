import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip"
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { useFireStore } from "../services/FireStore";
import { useAuth } from "../context/authProvider";

import { HiCheckCircle } from "react-icons/hi";
import { SiStarship } from "react-icons/si";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removefromWatchlist } = useFireStore();
  const { user } = useAuth();

  const handleRemoveClick = (event) => {
    event.preventDefault();
    removefromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"150px"}>
          <Image
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          <Tooltip content="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              size={"sm"}
              colorScheme="green"
              position={"absolute"}
              zIndex={"999"}
              top="2px"
              left={"2px"}
              onClick={handleRemoveClick}
            >
              <HiCheckCircle color="green" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box>
          <Heading fontSize={{ base: "xl", md: "2xl" }} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={"sm"} color={"green.200"} mt="2">
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4">
            <SiStarship fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{ base: "xs", md: "sm" }} noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchlistCard;
