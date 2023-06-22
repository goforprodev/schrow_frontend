import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { listingsAtom } from "../../state/lisitings";
import Listing from "./Listing";

function Listings() {
  const listings = useRecoilValue(listingsAtom);

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
