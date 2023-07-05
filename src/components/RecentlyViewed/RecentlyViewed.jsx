import React, { useState } from "react";
import { Flex, Button, Grid, GridItem } from "@chakra-ui/react";
import { useListingsAction } from "../../actions/listingsActions";
import { useEffect } from "react";
import { authAtom } from "../../state/auth";
import { useRecoilValue } from "recoil";
import Listing from "../Listings/Listing";
import { Link } from "@chakra-ui/react";
import Empty from "../Empty";

function RecentlyViewed() {
  const [_listings, setListings] = useState([]);
  const listingActions = useListingsAction();
  const { id } = useRecoilValue(authAtom);

  useEffect(() => {
    (async () => {
      const listings = await listingActions.loadRecentListings({ userId: id });
      setListings(listings);
    })();
  }, [id]);

  if (_listings.length === 0) {
    return (
      <Flex direction={"column"}>
        <Empty text={"Go and view a listing"} />
      </Flex>
    );
  }

  return (
    <>
      <Grid
        templateColumns={{
          base: "none",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          xl: "repeat(5,1fr)",
        }}
        gap={{ base: 4, md: 3, sm: 1 }}
        py={"10pt"}
        // justifyItems={"center"}
        justifyItems={{ base: "center", md: "stretch" }}
        mx={"auto"}
      >
        {_listings?.map((listing) => (
          <GridItem key={listing?.id} cursor={"pointer"}>
            <Listing data={listing} save={true} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default RecentlyViewed;
