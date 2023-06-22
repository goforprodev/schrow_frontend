import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Apple from "../assets/apple.png";
import Facebook from "../assets/face.png";
import Google from "../assets/google.png";
import Logo from "../assets/schrow.png";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function Auth() {
  return (
    <>
      <Flex
        justifyContent={"flex-end"}
        w={"100vw"}
        h="100vh"
        bg={"purple.600"}
        overflow={"hidden"}
      >
        <Flex
          direction={"column"}
          bg={"body.100"}
          w={{ base: "100vw", md: "65vw", sm: "45vw", xl: "30vw" }}
          py={"10px"}
          px={{ base: "15px", sm: "30px" }}
          borderTopLeftRadius={{ base: "none", sm: "24pt" }}
          borderBottomLeftRadius={{ base: "none", sm: "24pt" }}
          overflowY={"scroll"}
        >
          <Flex
            as={"nav"}
            justify={"space-between"}
            align={"center"}
            width={"100%"}
          >
            <Image src={Logo} alt="schrow-logo" height={"65px"} ml={"-10pt"} />
            <CloseIcon cursor={"pointer"} fontSize={"10pt"} />
          </Flex>
          <Flex
            as={"div"}
            py={"5pt"}
            direction={"column"}
            w={{ base: "100%", md: "293pt" }}
            wrap={"wrap"}
          >
            <Heading as={"h2"} fontSize={"16pt"}>
              Welcome,
            </Heading>
            <Heading as={"h2"} fontSize={"16pt"}>
              lets get started!
            </Heading>
            <Text pt={"5pt"} fontSize={"9pt"} fontWeight={"light"}>
              Please use your credentials to create a new account. If you are
              already a member, please
              <Text as={"span"} color={"brand.100"}>
                <Link to={"/auth"}> Sign in</Link>.
              </Text>
            </Text>
          </Flex>

          {/* Auth tabs */}
          <Tabs position="relative" variant="unstyled" pt="10pt">
            <TabList color={"gray.700"}>
              <Tab fontWeight={"medium"}>Login</Tab>
              <Tab fontWeight={"medium"}>New Account</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              w={"100%"}
              bg="brand.100"
              borderRadius="5px"
            />
            <Flex direction={"column"} w={"100%"} pt={"1pt"}>
              <TabPanels>
                <TabPanel>
                  <SignIn />
                </TabPanel>
                <TabPanel>
                  {/* <Outlet /> */}
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Flex>
          </Tabs>
          {/* Auth tabs */}

          <Divider
            orientation="horizontal"
            my={"10pt"}
            height={"1pt"}
            bg={"gray.300"}
          />
          <Text as="p" align={"center"} py={"10pt"} fontSize={"14pt"}>
            Or continue with:
          </Text>
          <Flex
            direction={"column"}
            w={{ base: "100%", md: "60%" }}
            m={"0 auto 10pt auto"}
          >
            <Button
              my={"5pt"}
              variant={"oauth"}
              bg={"gray.900"}
              alignItems={"center"}
            >
              <Image
                src={Apple}
                alt="google-logo"
                height={"16pt"}
                pr={"15pt"}
              />
              Continue with Apple
            </Button>
            <Button
              color="gray.800"
              my={"5pt"}
              variant={"oauth"}
              alignItems={"center"}
            >
              <Image
                src={Google}
                alt="google-logo"
                height={"16pt"}
                pr={"15pt"}
              />
              Continue with Google
            </Button>
            <Button
              my={"5pt"}
              variant={"oauth"}
              bg="#3B5998"
              alignItems={"center"}
            >
              <Image
                src={Facebook}
                alt="google-logo"
                height={"16pt"}
                pr={"15pt"}
              />
              Continue with Facebook
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Auth;
