import React, { useState } from "react";
import { Flex, Button, Grid, GridItem } from "@chakra-ui/react";
import { useListingsAction } from "../../actions/listingsActions";
import { useEffect } from "react";
import { authAtom } from "../../state/auth";
import { useRecoilValue } from "recoil";
import Listing from "../Listings/Listing";
import { Link } from "@chakra-ui/react";
import Empty from "../Empty";

function ManageLisitings() {
  const [_listings, setListings] = useState([]);
  const listingActions = useListingsAction();
  const { id } = useRecoilValue(authAtom);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const listings = await listingActions.loadSellerListings({ id });
      setListings(listings);
    })();
  }, [id]);

  if (_listings.length === 0) {
    return (
      <Flex direction={"column"}>
        <Empty text={"You dont have any listing"} />
        <Button alignSelf={"center"} variant={"outline"}>
          <Link to={"/add"}>Add new listing </Link>
        </Button>
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
        gap={{ base: 4, md: 3, sm: 1 }}
        py={"10pt"}
        // justifyItems={"center"}
        justifyItems={{ base: "center", md: "stretch" }}
        mx={"auto"}
      >
        {_listings?.map((listing) => (
          <GridItem key={listing?.id} cursor={"pointer"}>
            <Listing
              data={listing}
              showEdit={true}
              showDel={true}
              _class={"seller"}
              setSavedListings={setListings}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default ManageLisitings;
