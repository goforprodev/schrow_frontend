import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import ImageCarousel from "../components/ImageCarousel";
import ListingInfo from "../components/ListingInfo/ListingInfo";
import { useParams,useNavigate } from "react-router-dom";

function SingleListings() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!/\d+/.test(id)) {
      navigate(-1);
    }
  }, [id, navigate]);

  return (
    <>
      <Flex
        gap={{ base: 2, sm: 6 }}
        w={"100%"}
        h={"100vh"}
        display={{ base: "block", sm: "flex" }}
        pb={{ base: "15pt", sm: "0" }}
      >
        <ImageCarousel />
        <ListingInfo />
      </Flex>
    </>
  );
}

export default SingleListings;
