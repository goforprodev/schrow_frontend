import { Heading, Flex, Text, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";

function Info({ data }) {
  return (
    <Flex direction="column" fontSize={"10pt"} pb={"5"} gap={2}>
      <Text color="blue.600" fontSize="2xl">
        {data.price}
      </Text>
      <Flex align={"center"} gap={"5pt"} fontSize={"10pt"}>
        {data.mass}
        <Tag size={"sm"} variant="subtle" colorScheme="blue">
          <TagLabel>{data.status}</TagLabel>
        </Tag>
      </Flex>
      <Text>{data.location} </Text>
      <Text>{data.owner}</Text>
    </Flex>
  );
}

export default Info;
