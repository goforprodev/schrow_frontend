import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

function Success() {
  return (
    <Flex
      align="center"
      justify={"center"}
      w={"100vw"}
      h={"100vh"}
      bg={"body.100"}
    >
      <Heading fontSize={"2em"}>
        Congratulations! Your documents have been uploaded and are pending
        approval.
      </Heading>
    </Flex>
  );
}

export default Success;
