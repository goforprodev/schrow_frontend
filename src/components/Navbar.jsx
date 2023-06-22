import React from "react";
import Logo from "../assets/schrow.png";
import {
  Flex,
  Image,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import RightContent from "./RightContent";
import { EmailIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Box as="div" width={{ base: "100%", md: "90%", sm: "80%" }} m={"0 auto"}>
        <Flex
          h="10vh"
          w="100%"
          align={"center"}
          justify={"space-between"}
          px={{ base: "5pt" }}
        >
          <Link to={"/"}>
            <Image
              src={Logo}
              alt="schrow-logo"
              h={{ base: "60px", md: "70px" }}
            />
          </Link>
          <Button
            as={"button"}
            display={{ base: "none", sm: "flex" }}
            gap={"8pt"}
            align="center"
          >
            <EmailIcon boxSize={4} />
            <Link to={"/message"}>Leave a message</Link>
          </Button>
          <RightContent />
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
