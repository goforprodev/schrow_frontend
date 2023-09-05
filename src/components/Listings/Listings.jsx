import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { listingsAtom } from "../../state/lisitings";
import Loader from "../Loader";

  // Fetch listings using React Query with filters
  const fetchListings = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.get(
        `/api/users.php?page=${pageParam}&results_count=15&no_of_floors=${filters.min_rooms}-${filters.max_rooms}&no_of_units=${filters.min_beds}-${filters.max_beds}&no_of_bed=${filters.min_price}-${filters.max_price}&no_of_bath=${filters.max_price}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error fetching listings');
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
    fetchListings,
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

  
  if(!_data) return (
    <Flex w={"100%"} justify={"center"} py={10}>
      <Empty  text={"No listings found"} />
    </Flex>
  )

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(3,1fr)",
          sm: "repeat(2,1fr)",
          xl: "repeat(5,1fr)",
        }}
        gap={{ base: 4, md: 3 }}
        py={"10pt"}
        w={"100%"}
        mx={"auto"}
        justifyItems={{ base: "stretch", md: "stretch" }}
        pb={10}
        // maxW={"80%"}
      >
        {listings?.map((listing, i) => {
          if (i === listings.length - 1) {
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
