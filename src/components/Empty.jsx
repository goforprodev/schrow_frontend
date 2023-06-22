import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";

function Empty() {
  return (
    <>
      <Flex direction={"column"} justify={"center"} align="center" py={"10pt"}>
        <Box
          as="div"
          border="1px solid"
          borderColor={"gray.800"}
          minW={"400px"}
          minH={"300px"}
          my={"10pt"}
        ></Box>
        <Text fontSize={"18pt"} fontWeight={"500"}>
          No viewed projects yet
        </Text>
        <Text>Go to the home page to view projects</Text>
      </Flex>
    </>
  );
}

export default Empty;
