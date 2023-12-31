import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import Filters from "../components/Filters";
import Listings from "../components/Listings/Listings";
import Loader from "../components/Loader";
import { authSelector } from "../state/auth";
import { listingsAtom } from "../state/lisitings";

function Home() {
  const navigate = useNavigate();
  const authUser = useRecoilValue(authSelector);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [listings, setListings] = useRecoilState(listingsAtom);

  useEffect(() => {
    if (!authUser || !authUser.id) {
      navigate("/auth");
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search) {
      try {
        const { data } = await axios.post(
          `/api/users.php?page=1&addr_or_zip${search}`,
          { endpoint: "load-listing" }
        );
        if (!data.error) {
          setListings(data.data.listing);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(listings)
    }
  };

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Flex
        direction="column"
        py={"15pt"}
        px={{ base: "10pt", sm: "20pt" }}
        w={{base:"90vw",sm:"80vw"}}
        minH={"70vh"}
        mx={"auto"}
      >
        <Flex
          justify={{ base: "center", sm: "space-between" }}
          align={"center"}
          py={"8pt"}
          gap={3}
          direction={{ base: "column", xl: "row" }}
        >
          <Heading
            as={"h3"}
            fontSize={{ base: "13pt", sm: "17pt" }}
            color={"gray.800"}
          >
            Real Estate & Homes For Sale
          </Heading>
          <Flex
            align={"center"}
            gap={"10pt"}
            w={{ base: "100%", sm: "100%", md: "60%" }}
          >
            <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Enter an address, neighbourhood, city, or ZIP code"
                  fontSize={"10pt"}
                  // borderColor="#888"
                  _placeholder={{
                    color: "gray.500",
                  }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "#888",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "#888",
                  }}
                  bg={"white"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </form>
            <Filters />
          </Flex>
        </Flex>
        <Listings />
      </Flex>
    </>
  );
}

export default Home;
