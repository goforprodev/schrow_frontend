import { atom, selector } from "recoil";

export const authAtom = atom({
  key: "auth",
  default: JSON.parse(localStorage.getItem("user")),
});

export const authSelector = selector({
  key: "authSelector",
  get: ({ get }) => {
    const user = get(authAtom);
    return user;
  },
});
