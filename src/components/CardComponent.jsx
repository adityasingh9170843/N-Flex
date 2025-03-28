import React from "react";
import {  Box, Icon, Image, Text,Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { SlStar } from "react-icons/sl";
import { BiStar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
function CardComponent({ item }) {
  return (
    <Link to="/">
      <Box position={"relative"} transform={"scale(1)"} _hover={{transform:{base:"scale(1)",md:"scale(1.08)"},transition:"transform 0.2s ease-in-out","& .overlay":{opacity:1,}}} >
        <Image
          src={`${imagePath}${item.poster_path}`}
          alt={item?.title || item?.name}
          height={"100%"}
        />
        <Box
            className="overlay"
          position={"absolute"}
          p={"2"}
          bottom={"0"}
          left={"0"}
          w={"100%"}
          h={"33%"}
          bg="rgba(0,0,0,0.9)"
          opacity={0}
          transition={"opacity 0.3s ease-in-out"}
        >
          <Text textAlign={"center"}>{item?.title || item?.name}</Text>
          <Text fontSize={"xs"} color={"green.200"} textAlign={"center"}>{new Date(item?.release_date || item?.first_air_date).getFullYear()}</Text>
          <Flex mt={3} align={"center"} gap={2} justify={"center"}>
            <Icon  size={"small"} color={"gold"}><FaStar/></Icon>
            <Text>{item?.vote_average}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
}

export default CardComponent;
