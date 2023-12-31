import React, { useEffect } from "react";
import AddListing from "./AddListing";
import { useParams } from "react-router-dom";
import { useListingsAction } from "../actions/listingsActions";
import { useRecoilValue } from "recoil";
import { singleListingAtom } from "../state/lisitings";
import Loader from "../components/Loader";
import { Box } from "@chakra-ui/react";

const EditListing = () => {
  const { id } = useParams();
  const listingActions = useListingsAction();
  const listing = useRecoilValue(singleListingAtom);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        await listingActions.loadListingById({ id });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <Box minH={"70vh"} mt={"10pt"}>
      <AddListing edit={true} listing={listing} />
    </Box>
  );
};

export default EditListing;
