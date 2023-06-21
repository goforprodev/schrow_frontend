import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

function Aside() {
  const asideButtons = [
    {
      name: "Save",
      icon: <Icon as={AiOutlineHeart} />,
    },
    {
      name: "Share",
      icon: <Icon as={AiOutlineShareAlt} />,
    },
    {
      name: "Hide",
      icon: <Icon as={BiHide} />,
    },
    {
      name: "More",
      icon: <Icon as={BsThreeDots} />,
    },
  ];
  return (
    <>
      {asideButtons.map((buttonAs, idx) => (
        <Flex align={"center"} gap={1} key={idx}>
          {buttonAs.icon}
          <Text>{buttonAs.name}</Text>
        </Flex>
      ))}
    </>
  );
}

export default Aside;
