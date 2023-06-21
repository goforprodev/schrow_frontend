import { useRecoilState, useSetRecoilState } from "recoil";
import { listingsAtom } from "../state/lisitings";
import axios from "axios";

export const useListingsAction = () => {
  const baseUrl = "/api/users.php?page=1";
  const [listings, setListings] = useRecoilState(listingsAtom);

  const loadListings = async ({ endpoint }) => {
    const response = await axios.post(baseUrl, {
      endpoint,
    });
    const { data } = response;

    if (!data.error) {
      const listingsArr = data.data.listings;
      setListings(listingsArr);
    } else {
      throw new Error(data.data.msg);
    }
  };

  const loadListingById = async ({ id }) => {
    const response = await axios.post(baseUrl, {
      endpoint: "listing",
      id,
    });
    const { data } = response;

    if (!data.error) {
      const listingsArr = [...data.data.listings];
      setListings(listingsArr);
    } else {
      throw new Error(data.data.msg);
    }
  };

  return { loadListings };
};
