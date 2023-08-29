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
import MessageModal from "./MessageModal";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <MessageModal open={open} setOpen={setOpen} />
      <Box as="div" w={"100%"} px={{base:"5%",md:"10%"}} m={"0 auto"}
          boxShadow={"md"}
      >
        <Flex
          h={{ base: "7vh", md: "5vh" }}
          w="100%"
          align={"center"}
          justify={"space-between"}
          mx={"auto"}
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
            onClick={() => setOpen(true)}
          >
            <EmailIcon boxSize={4} />
            {/* <Link to={"/message"}>Leave a message</Link> */}
            Leave a message
          </Button>
          <RightContent setOpen={setOpen} />
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
