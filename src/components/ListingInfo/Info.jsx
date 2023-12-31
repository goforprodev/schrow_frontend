import { Heading, Flex, Text, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { status } from "../../utils/status";

function Info({ data }) {
  return (
    <Flex direction="column" fontSize={"10pt"} pb={"5"} gap={2}>
      <Text color="blue.600" fontSize="2xl">
        N{data?.estimated_cost}
      </Text>
      <Flex align={"center"} gap={"5pt"} fontSize={"10pt"}>
        {data?.no_of_units || 0} Units
        <Tag size={"sm"} variant="subtle" colorScheme="blue">
          <TagLabel>{status[data?.statuse] || "House for sale"}</TagLabel>
        </Tag>
      </Flex>
      <Text>{`${data?.street} , ${data.city} , ${data?.statex}`} </Text>
      <Text textTransform={"uppercase"}>{data?.title}</Text>
    </Flex>
  );
}

export default Info;
