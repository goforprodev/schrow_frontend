import { useRecoilState, useSetRecoilState } from "recoil";
import { listingsAtom, singleListingAtom } from "../state/lisitings";
import axios from "axios";

export const useListingsAction = () => {
  const baseUrl = "/api/users.php";
  const setListings = useSetRecoilState(listingsAtom);
  const setSingleListing = useSetRecoilState(singleListingAtom);

  const loadListings = async ({ endpoint }) => {
    const response = await axios.post(`${baseUrl}?page=1`, {
      endpoint,
    });
    const { data } = response;

    if (!data.error) {
      const listingsArr = data.data.listings;
      setListings(() => listingsArr);
    } else {
      throw new Error(data.data.msg);
    }
  };

  const loadListingById = async ({ id }) => {
    const response = await axios.post(baseUrl, {
      endpoint: "load-single-listing",
      id,
    });
    const { data } = response;

    if (!data.error) {
      const singleListing = data.data.listing[0];
      setSingleListing(() => singleListing);
    } else {
      throw new Error(data.data.msg);
    }
  };

  const saveListings = async ({ userId, listingId }) => {
    const response = await axios.post(baseUrl, {
      endpoint: "save-listing",
      id: userId,
      listing_id: listingId,
    });
    const { data } = response;
    if (!data.error) {
      return data.data.msg;
    } else {
      throw new Error(data.data.msg);
    }
  };

  const loadSavedListings = async ({ userId }) => {
    const response = await axios.post(`${baseUrl}?page=1`, {
      endpoint: "load-saved-listings",
      id: userId,
    });
    const { data } = response;
    if (!data.error) {
      const listingsArr = data.data.listings;
      return listingsArr;
    } else {
      throw new Error(data.data.msg);
    }
  };

  const deleteSavedListing = async ({ userId, listingId }) => {
    console.log(userId, listingId);
    const response = await axios.post(baseUrl, {
      endpoint: "del-saved-listing",
      id: userId,
      listing_id: listingId,
    });
    const { data } = response;
    if (!data.error) {
      alert(data.data.msg);
    } else {
      throw new Error(data.data.msg);
    }
  };

  return {
    loadListings,
    loadListingById,
    saveListings,
    loadSavedListings,
    deleteSavedListing,
  };
};
