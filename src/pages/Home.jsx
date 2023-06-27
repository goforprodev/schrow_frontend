import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useListingsAction } from "../actions/listingsActions";
import Filters from "../components/Filters";
import Listings from "../components/Listings/Listings";
import { authSelector } from "../state/auth";
import Loader from "../components/Loader";

function Home() {
  const navigate = useNavigate();
  const listingsAction = useListingsAction();
  const authUser = useRecoilValue(authSelector);
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      await listingsAction.loadListings({
        endpoint: "load-listing",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authUser) {
      navigate("/auth");
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Flex direction="column" py={"15pt"} px={"30pt"} bg={"#fbf9ff"}>
        <Flex
          justify={{ base: "center", sm: "space-between" }}
          align={"center"}
          py={"10pt"}
          gap={3}
          direction={{ base: "column", xl: "row" }}
          w={"95%"}
          mx={"auto"}
        >
          <Heading as={"h3"} fontSize={{ base: "13pt", sm: "17pt" }}>
            Real Estate & Homes For Sale
          </Heading>
          <Flex align={"center"} gap={"10pt"} w={{ base: "90%", sm: "60%" }}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter an address, neighbourhood, city, or ZIP code"
                fontSize={"10pt"}
                borderColor="#888"
                _placeholder={{
                  color: "gray.500",
                }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "#000",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "#000",
                }}
                bg={"white"}
              />
            </InputGroup>
            <Filters />
          </Flex>
        </Flex>
        <Listings />
      </Flex>
    </>
  );
}

export default Home;
