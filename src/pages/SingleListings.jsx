import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import ImageCarousel from "../components/ImageCarousel";
import ListingInfo from "../components/ListingInfo/ListingInfo";
import { useParams, useNavigate } from "react-router-dom";
import { useListingsAction } from "../actions/listingsActions";
import { singleListingAtom } from "../state/lisitings";
import { useRecoilState } from "recoil";

function SingleListings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listingsAction = useListingsAction();
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSingleListing = async () => {
    try {
      const res = await listingsAction.loadListingById({ id });
      setListing(res);
      console.log(listing);
    } catch (error) {
      navigate("/");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSingleListing();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (!/\d+/.test(id)) {
      navigate(-1);
    }
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

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
