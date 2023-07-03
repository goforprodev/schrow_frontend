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
      url: `${baseUrl}?page=1`,
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
    });
    setSingleListing(() => response.listing[0]);
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
      return data.data.listings;
    } else {
      throw new Error(data.data.msg);
    }
  };

  const deleteSavedListing = async ({ userId, listingId }) => {
    const response = await axios.post(baseUrl, {
      endpoint: "del-saved-listing",
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

  const loadSellerListings = async ({ id }) => {
    const response = await fetchNRelease({
      url: `${baseUrl}?page=1&seller_id=${id}`,
      body: { endpoint: "load-listing" },
    });
    return response.listings;
  };

  const deleteListing = async ({ id, listingId }) => {
    console.log(id, listingId);
    const response = await fetchNRelease({
      url: baseUrl,
      body: { endpoint: "del-listing", id, listing_id: listingId },
    });
    console.log(response);
    return response.msg;
  };

  const editListing = async ({ data }) => {
    const response = await axios.post(baseUrl, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data: res } = response;

    if (!res.error) {
      return res.data.msg;
    } else {
      throw new Error(res.data.msg);
    }
  };

  const saveRecentListing = async ({ userId, listingId }) => {
    const response = await axios.post(baseUrl, {
      endpoint: "save-listing-view",
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

  const loadRecentListings = async ({ userId }) => {
    const response = await axios.post(baseUrl, {
      endpoint: "load-recent-views",
      id: userId,
    });
    const { data } = response;
    if (!data.error) {
      return data.data.listings;
    } else {
      throw new Error(data.data.msg);
    }
  };

  const loadListingTypes = async () => {
    const response = await axios.post(baseUrl, {
      endpoint: "load-listing-types",
    });

    const { data } = response;
    if (!data.error) {
      return data.data.types;
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
    loadSellerListings,
    deleteListing,
    editListing,
    saveRecentListing,
    loadRecentListings,
    loadListingTypes,
  };
};
