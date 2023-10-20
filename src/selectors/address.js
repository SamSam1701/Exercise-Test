import { selector } from "recoil";
import { addressState } from "../atoms/address";

export const addressSelector = selector({
    key: "addressSelector",
    get: ({ get }) => {
        const address = get(addressState);
        return {
            address
        }
    }
})