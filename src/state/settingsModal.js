import { atom } from "recoil";

export const settingsModalAtom = atom({
    key: "settingsModal",
    default: {
        isOpen: false,
        type: "profile",
    }
});