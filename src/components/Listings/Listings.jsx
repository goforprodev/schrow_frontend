import { Grid, Skeleton, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useListingsAction } from "../../actions/listingsActions";
import { listingsAtom } from "../../state/lisitings";
import Listing from "./Listing";

const Listings = () => {
  const listingActions = useListingsAction();
  const listings = useRecoilValue(listingsAtom);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      listingActions.loadListings({ pageParam: 1 });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [listings]);

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(3,1fr)",
          sm: "repeat(2,1fr)",
          xl: "repeat(4,1fr)",
        }}
        gap={{ base: 4, md: 3 }}
        py={"15pt"}
        w={"100%"}
        mx={"auto"}
        justifyItems={{ base: "stretch", md: "stretch" }}
        pb={10}
      >
        {listings?.map((listing) => {
          return (
            <Skeleton isLoaded={!loading} key={listing?.id}>
              <GridItem cursor={"pointer"}>
                <Listing data={listing} />
              </GridItem>
            </Skeleton>
          );
        })}
      </Grid>
    </>
  );
};

export default Listings;
