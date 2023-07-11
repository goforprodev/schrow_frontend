import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { listingsAtom } from "../../state/lisitings";
import Listing from "./Listing";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIntersection } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import Loader from "../Loader";

const fetchListings = async ({ pageParam }) => {
  try {
    const res = await axios.post(
      `/api/users.php?page=${pageParam}&results_count=15`,
      { endpoint: "load-listing" }
    );
    const { data } = res;
    if (!data.error) {
      return data.data.listings;
    } else {
      throw new Error(data.data.msg);
    }
  } catch (error) {
    console.log("FetchListings error ", error);
  }
};

function Listings() {
  const [listings, setListings] = useRecoilState(listingsAtom);
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["listings"],
    ({ pageParam = 1 }) => fetchListings({ pageParam }),
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      }, // Assuming the response has a `nextPage` property
    }
  );

  const lastListingRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastListingRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  if (isLoading && isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const _data = data.pages.flatMap((page) => page);

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          xl: "repeat(5,1fr)",
        }}
        gap={{ base: 4, md: 3 }}
        py={"10pt"}
        w={{ base: "100%", sm: "95%" }}
        mx={"auto"}
        justifyItems={{ base: "stretch", md: "stretch" }}
        pb={10}
        maxW={"80%"}
      >
        {_data?.map((listing, i) => {
          if (i === _data.length - 1) {
            return (
              <GridItem key={listing?.id} cursor={"pointer"} ref={ref}>
                <Listing data={listing} />
              </GridItem>
            );
          }
          return (
            <GridItem key={listing?.id} cursor={"pointer"}>
              <Listing data={listing} />
            </GridItem>
          );
        })}
      </Grid>
      <Flex w={"100%"}>
        {isFetching ? (
          <Flex w={"100%"} justify={"center"} py={10}>
            <Spinner size={"xl"} />
          </Flex>
        ) : null}
      </Flex>
    </>
  );
}

export default Listings;
