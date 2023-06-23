import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useListingsAction } from "../actions/listingsActions";
import ImageCarousel from "../components/ImageCarousel";
import ListingInfo from "../components/ListingInfo/ListingInfo";
import { useRecoilValue } from "recoil";
import { singleListingAtom } from "../state/lisitings";

function SingleListings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listingsAction = useListingsAction();
  const [loading, setLoading] = useState(false);
  const listing = useRecoilValue(singleListingAtom) 
  
  
  useEffect(() => {
    if (!/\d+/.test(id)) {
        navigate(-1);
    }
  }, [id, navigate]);
  
  useEffect(() => {
    const fetchSingleListing = async () => {
      setLoading(true)
      try {
        const res = await listingsAction.loadListingById({id});
        setLoading(false)
      } catch (error) {
        setLoading(false)
        navigate("/");
        console.log(error.message);
      }
    };
       fetchSingleListing();

  }, []);
      

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator
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
        pb={{ base: "15pt", sm: "0" }}
      >
        <ImageCarousel images={images}/>
        <ListingInfo listing={listing}/>
      </Flex>
    </>
  );
}

export default SingleListings;
