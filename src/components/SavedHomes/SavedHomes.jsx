import React from 'react'
import { Button,Grid, GridItem } from '@chakra-ui/react'
import Listing from '../Listings/Listing'


function SavedHomes({data,setSavedListings}) {
  return (
   <>
      <Grid
        templateColumns={{
          base: "none",
          md: "repeat(3,1fr)",
          xl: "repeat(4,1fr)",
        }}
        gap={{ base: 4, md: 4, sm: 1 }}
        py={"10pt"}
        justifyItems={"center"}
        mx={"auto"}
      >
        {data?.map((listing) => (
          <GridItem key={listing?.id} cursor={"pointer"}>
            <Listing data={listing} showDel={true} setSavedListings={setSavedListings} />  
          </GridItem>
        ))}
      </Grid>
    </>

  )
}

export default SavedHomes