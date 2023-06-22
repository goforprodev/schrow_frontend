import {
  Flex,
  Box,
  Divider,
  Grid,
  GridItem,
  Image,
  Text,
  Icon,
} from "@chakra-ui/react";
import Logo from "../assets/schrow.png";
import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

function Footer() {
  return (
    <>
      <Box as="div" width={{ base: "100%", md: "90%", sm: "80%" }} m={"0 auto"}>
        <Grid
          templateColumns={{
            base: "none",
            //   md: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
          }}
          gap={{ base: 4, md: 4, sm: 8 }}
          gridGap={8}
          px={"10pt"}
          py={"25pt"}
          mx={"auto"}
        >
          <GridItem py={{ base: "10pt", sm: "0" }}>
            <Image src={Logo} alt="schrow-logo" h={"50px"} ml={"-10pt"} />
            <Text as="p" fontSize={"10pt"}>
              Schrow is committed to ensuring digital accessibility for
              individuals with disabilities. We are continuously working to
              improve the accessibility of our web experience for everyone, and
              we welcome feedback and accommodation requests. If you wish to
              report an issue or seek an accommodation, please let us know.
            </Text>
          </GridItem>
          <GridItem>
            <Text fontSize={"15pt"}>Our services</Text>
            <Box
              fontSize="10pt"
              py={"10pt"}
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Text>Build</Text>
              <Text>Sponsor</Text>
              <Text>List</Text>
              <Text>Buy</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Text fontSize={"15pt"}>Company</Text>
            <Box
              fontSize="10pt"
              py={"10pt"}
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Text>Project</Text>
              <Text>About</Text>
              <Text>Services</Text>
              <Text>Contact</Text>
            </Box>
          </GridItem>
          <GridItem>
            <Text fontSize={"15pt"}>Contact Us</Text>
            <Box fontSize="10pt" py={"10pt"}>
              <Text
                display={"flex"}
                align={"center"}
                textAlign={"left"}
                gap={2}
              >
                <Icon as={MdLocationOn} boxSize={5} />5 TY Danjuma Street,
                Dideolu Estate, Victoria Island Lagos.
              </Text>
              <Text
                display={"flex"}
                align={"center"}
                textAlign={"left"}
                gap={2}
                py={"10pt"}
              >
                <Icon as={MdPhone} boxSize={5} /> +234 816 955 2189
              </Text>
              <Text
                display={"flex"}
                align={"center"}
                textAlign={"left"}
                gap={2}
              >
                <Icon as={MdEmail} boxSize={5} /> Enquiries@schrow.com
              </Text>
            </Box>
          </GridItem>
        </Grid>
        <Divider />
        <Flex
          align={"center"}
          justify={"space-between"}
          direction={{ base: "column", sm: "row" }}
          py={"10pt"}
        >
          <Text py="10pt" fontSize={"10pt"}>
            © 2021 Schrow, Inc. All rights reserved.
          </Text>
          <Flex gap={4}>
            <Icon as={AiOutlineFacebook} w={"20px"} h={"20px"} />
            <Icon as={AiOutlineTwitter} w={"20px"} h={"20px"} />
            <Icon as={AiOutlineInstagram} w={"20px"} h={"20px"} />
            <Icon as={AiOutlineLinkedin} w={"20px"} h={"20px"} />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Footer;
