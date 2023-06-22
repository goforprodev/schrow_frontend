import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";

function Stats() {
  const stats = [
    {
      name: "Type of house i.e Condominium",
      icon: <Icon as={AiOutlineHome} boxSize={4} />,
    },
    {
      name: "Year it was built",
      icon: <Icon as={AiOutlineHome} boxSize={4} />,
    },
  ];
  return (
    <Flex direction={"column"} gap={2} py={"5pt"} fontSize={"10pt"}>
      {stats.map((stat,idx) => (
        <Flex align={"center"} gap={1} key={idx}>
          {stat.icon}
          <Text>{stat.name}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default Stats;
