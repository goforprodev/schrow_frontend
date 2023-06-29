import React, { useEffect } from "react";
import AddListing from "./AddListing";
import { useParams } from "react-router-dom";
import { useListingsAction } from "../actions/listingsActions";
import { useRecoilValue } from "recoil";
import { singleListingAtom } from "../state/lisitings";

const EditListing = () => {
  const { id } = useParams();
  const listingActions = useListingsAction();
  const listing = useRecoilValue(singleListingAtom);

  useEffect(() => {
    (async () => {
      await listingActions.loadListingById({ id });
    })();
  }, [id]);

  return (
    <>
      <AddListing edit={true} listing={listing} />
    </>
  );
};

export default EditListing;
