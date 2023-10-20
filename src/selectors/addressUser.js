import { selector } from "recoil";
import { addressUserState } from "../atoms/addressUser";

export const addressUserSelector = selector({
    key: "addressUserSelector",
    get: ({ get }) => {
        const address = get(addressUserState);
        return {
            address
        }
    }
})