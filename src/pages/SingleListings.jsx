import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useListingsAction } from "../actions/listingsActions";
import ImageCarousel from "../components/ImageCarousel";
import ListingInfo from "../components/ListingInfo/ListingInfo";
import { useRecoilValue } from "recoil";
import { singleListingAtom } from "../state/lisitings";
import Loader from "../components/Loader";
import { authAtom } from "../state/auth";

function SingleListings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listingsAction = useListingsAction();
  const [loading, setLoading] = useState(false);
  const listing = useRecoilValue(singleListingAtom);
  const authUser = useRecoilValue(authAtom);
  const STORAGE_KEY = "recentListings";

  const saveRecent = async () => {
    try {
      await listingsAction.saveRecentListing({
        userId: authUser?.id,
        listingId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    if (!/\d+/.test(id)) {
      navigate(-1);
    }
    const fetchSingleListing = async () => {
      setLoading(true);
      try {
        await listingsAction.loadListingById({ id });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/");
        console.log(error.message);
      }
    };
    fetchSingleListing();
  }, [id]);

  useEffect(() => {
    const recentListings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const hasViewedListing = recentListings.some(
      (listing) => listing.id === id
    );

    if (!hasViewedListing) {
      recentListings.push({ id: listing?.id, date: new Date() });
      //check if id exists in recentListings before setting
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentListings));
      saveRecent();
    }
  }, [listing?.id]);

  if (loading) {
    return <Loader />;
  }

  if (!listing) {
    return <div>No listing available.</div>; // Render a message if the listing is still null
  }

  const { images } = listing;

  return (
    <>
      <Flex
        gap={{ base: 2, sm: 6 }}
        w={"100%"}
        h={"100vh"}
        display={{ base: "block", sm: "flex" }}
        py={{ base: "10pt", sm: "15pt" }}
        px={{ base: "unset", md: "30pt" }}
        pb={{ base: "15pt", sm: "0" }}
      >
        <ImageCarousel images={images} />
        <ListingInfo listing={listing} />
      </Flex>
    </>
  );
}

export default SingleListings;
