import { useRecoilState, useSetRecoilState } from "recoil";
import { listingsAtom, singleListingAtom } from "../state/lisitings";
import axios from "axios";

export const useListingsAction = () => {
  const baseUrl = "/api/users.php?page=1";
  const setListings = useSetRecoilState(listingsAtom);
  const setSingleListing = useSetRecoilState(singleListingAtom);

  const loadListings = async ({ endpoint }) => {
    const response = await axios.post(baseUrl, {
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

  const loadListingById = async ({ id}) => {
    const response = await axios.post(baseUrl, {
      endpoint: "load-single-listing",
      id,
    });
    const { data } = response;

    if (!data.error) {
      const singleListing = data.data.listing[0]
      setSingleListing(() => singleListing)
    } else {
      throw new Error(data.data.msg);
    }
  };

  return { loadListings, loadListingById };
};
