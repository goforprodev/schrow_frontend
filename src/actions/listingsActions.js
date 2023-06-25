import { useRecoilState, useSetRecoilState } from "recoil";
import { listingsAtom, singleListingAtom } from "../state/lisitings";
import axios from "axios";
import { fetchNRelease } from "../utils/fetchNRelease";

export const useListingsAction = () => {
  const baseUrl = "/api/users.php";
  const setListings = useSetRecoilState(listingsAtom);
  const setSingleListing = useSetRecoilState(singleListingAtom);

  const loadListings = async ({ endpoint }) => {
    const res = await fetchNRelease({
      url:`${baseUrl}?page=1`,
      body: { endpoint },
    });
    setListings(() => res.listings);
  };

  const loadListingById = async ({ id }) => {
    const response = await fetchNRelease({
      url: baseUrl,
      body: {
        endpoint: "load-single-listing",
        id,
      },
    })
    setSingleListing(() => response.listing[0])
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
      listing_id:listingId
      });
    const { data } = response;
    if(!data.error){
      alert(data.data.msg)
    }else{
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
