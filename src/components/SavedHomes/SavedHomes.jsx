import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useListingsAction } from "../../actions/listingsActions";
import { authAtom } from "../../state/auth";
import Empty from "../Empty";
import Listing from "../Listings/Listing";

function SavedHomes() {
  const listingAction = useListingsAction();
  const [savedListings, setSavedListings] = useState([]);
  const { name, id } = useRecoilValue(authAtom);

  useEffect(() => {
    const fetchListings = async (id) => {
      try {
        const res = await listingAction.loadSavedListings({ userId: id });
        setSavedListings(() => res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings(id);
  }, [savedListings, id]);

  if (savedListings.length === 0) {
    return (
      <Flex direction={"column"}>
        <Empty text={"No saved listing"} />
      </Flex>
    );
  }

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          xl: "repeat(5,1fr)",
        }}
        gap={{ base: 4, md: 4, sm: 1 }}
        py={"10pt"}
        justifyItems={{ base: "center", md: "stretch" }}
        mx={"auto"}
      >
        {savedListings?.map((listing) => (
          <GridItem key={listing?.id} cursor={"pointer"}>
            <Listing
              data={listing}
              showDel={true}
              setSavedListings={setSavedListings}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default SavedHomes;
