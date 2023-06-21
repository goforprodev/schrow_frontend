import { atom, selector } from "recoil";

export const listingsAtom = atom({
  key: "listingsState",
  default: [],
});

export const listingsSelector = selector({
  key: "listingsSelector",
  get: ({ get }) => {
    const listings = get(listingsAtom);
    return listings;
  },
});
