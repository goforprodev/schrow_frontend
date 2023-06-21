import { Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import Listing from "./Listing";
import { listingsAtom } from "../../state/lisitings";
import { useRecoilValue } from "recoil";
import { listingsSelector } from "../../state/lisitings";

function Listings() {
  const listings = useRecoilValue(listingsSelector);


  return (
    <>
      <Grid
        templateColumns={{
          base: "none",
          md: "repeat(3,1fr)",
          xl: "repeat(5,1fr)",
        }}
        gap={{ base: 4, md: 4, sm: 1 }}
        py={"10pt"}
        justifyItems={"center"}
      >
        {listings.map((listing) => (
          <GridItem key={listing.id} cursor={"pointer"}>
            <Listing data={listing} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default Listings;
