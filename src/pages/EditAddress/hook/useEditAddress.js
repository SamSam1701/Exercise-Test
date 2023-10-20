import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { addressUserState } from "../../../atoms/addressUser";

export const useEditAddress = () => {
    const location = useLocation();
    const { address } = location.state;

    const [, setAddressUser] = useRecoilState(addressUserState);

    const isEdit = true;

    return {
        address,
        setAddressUser,
        isEdit,
    }
}