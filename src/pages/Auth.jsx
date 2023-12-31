import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
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
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Apple from "../assets/apple.png";
import Facebook from "../assets/face.png";
import Google from "../assets/google.png";
import Logo from "../assets/schrow.png";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { authSelector } from "../state/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import ForgotPassword from "../components/ForgotPassword";
import { activeTabIndexState } from "../state/tabs";

function Auth() {
  const user = useRecoilValue(authSelector);
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useRecoilState(activeTabIndexState);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Flex
        justifyContent={"flex-end"}
        w={"100vw"}
        h="100vh"
        // bgGradient={"linear(to-br, #7928CA, #FF0080)"}
        overflow={"hidden"}
        bgImage={
          "url('https://www.costaricarealestate.net/wp-content/uploads/2019/03/snaT1phD.jpeg')"
        }
        bgPosition="center"
        bgSize="cover"
        position="relative"
      >
        <Flex
          position="absolute"
          direction={"column"}
          top={0}
          right={0}
          w="100%"
          h="100%"
          bgGradient="linear(to-b, rgba(0,0,0,0.3), rgba(0,0,0,0.9))"
          align={"flex-end"}
        >
          <Flex
            direction={"column"}
            bg={"body.100"}
            w={{ base: "100vw", md: "65vw", sm: "45vw", xl: "35vw" }}
            h={"100%"}
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
              <Image
                src={Logo}
                alt="schrow-logo"
                height={"65px"}
                ml={"-10pt"}
              />
              <a href="https://www.schrow.com">
                <CloseIcon cursor={"pointer"} fontSize={"10pt"} />
              </a>
            </Flex>
            <Flex
              as={"div"}
              py={"5pt"}
              direction={"column"}
              w={{ base: "100%", md: "293pt" }}
              wrap={"wrap"}
            >
              <Heading as={"h2"} fontSize={"16pt"} fontWeight={"500"}>
                Welcome lets get started!
              </Heading>
              <Text
                pt={"5pt"}
                fontSize={"9pt"}
                fontWeight={"light"}
                width={{ base: "100%", md: "75%" }}
              >
                Please use your credentials to create a new account. If you are
                already a member, please
                <Text
                  as={"span"}
                  color={"brand.100"}
                  pl={"2pt"}
                  cursor={"pointer"}
                  onClick={() => handleTabChange(0)}
                >
                  Sign in
                </Text>
              </Text>
            </Flex>

            {/* Auth tabs */}
            <Tabs
              position="relative"
              variant="unstyled"
              pt="10pt"
              index={tabIndex}
              onChange={handleTabChange}
            >
              <TabList color={"gray.700"}>
                <Tab
                  fontWeight={"medium"}
                  display={tabIndex > 1 ? "none" : "block"}
                >
                  Login
                </Tab>
                <Tab
                  fontWeight={"medium"}
                  display={tabIndex > 1 ? "none" : "block"}
                >
                  New Account
                </Tab>
                <Tab
                  fontWeight={"medium"}
                  display={tabIndex > 1 ? "block" : "none"}
                >
                  Forgot Password
                </Tab>
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
                    <SignUp />
                  </TabPanel>
                  <TabPanel>
                    <ForgotPassword />
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

            {/* Authentication with socials */}
            {/* <Text as="p" align={"center"} py={"10pt"} fontSize={"14pt"}>
              OR
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
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Auth;
