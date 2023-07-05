import React from "react";
import { Text, Box, Flex, Image } from "@chakra-ui/react";
import EmptyImg from "../assets/empt_svg.svg";

function Empty({ text }) {
  return (
    <>
      <Flex direction={"column"} justify={"center"} align="center" py={"10pt"}>
        <Image src={EmptyImg} alt={"empty"} h={"300px"} />
        <Text fontSize={"18pt"} fontWeight={"500"} pt={"10pt"}>
          {text}
        </Text>
        <Text>Go to the home page to view projects</Text>
      </Flex>
    </>
  );
}

export default Empty;
