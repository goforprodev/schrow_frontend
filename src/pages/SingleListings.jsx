import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useListingsAction } from "../actions/listingsActions";
import ImageCarousel from "../components/ImageCarousel";
import ListingInfo from "../components/ListingInfo/ListingInfo";
import { useRecoilValue } from "recoil";
import { singleListingAtom } from "../state/lisitings";
import Loader from "../components/Loader";

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
    return <Loader />
  }

   if (!listing) {
    return <div>No listing available.</div>; // Render a message if the listing is still null
  }
  
  const {images} = listing
  
  return (
    <>
      <Flex
        gap={{ base: 2, sm: 6 }}
        w={"100%"}
        h={"100vh"}
        display={{ base: "block", sm: "flex" }}
        py={{ base: "10pt", sm: "15pt" }}
        px={{base:"unset",md:"30pt"}}
        pb={{ base: "15pt", sm: "0" }}
      >
        <ImageCarousel images={images}/>
        <ListingInfo listing={listing}/>
      </Flex>
    </>
  );
}

export default SingleListings;
