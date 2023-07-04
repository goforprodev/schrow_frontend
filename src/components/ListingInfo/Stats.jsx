import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";

function Stats({ data }) {
  const stats = [
    {
      name: "Type of house i.e Condominium",
      icon: <Icon as={AiOutlineHome} boxSize={4} />,
    },
    {
      name: `Monthly payment - ${Math.round(data?.estimated_cost / 12)} Naira`,
      icon: <Icon as={AiOutlineHome} boxSize={4} />,
    },
  ];
  return (
    <Flex direction={"column"} gap={2} py={"5pt"} fontSize={"10pt"}>
      {stats.map((stat, idx) => (
        <Flex align={"center"} gap={1} key={idx}>
          {stat.icon}
          <Text>{stat.name}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default Stats;
