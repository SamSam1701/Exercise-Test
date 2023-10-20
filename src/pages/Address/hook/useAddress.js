import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { addressState } from "../../../atoms/address";

export const useAddress = () => {

    const navigate = useNavigate();
    const [address,] = useRecoilState(addressState);
    const [showScrollButton, setShowScrollButton] = useState(false);


    const editAddress = (addressId) => {
        // Tìm địa chỉ dựa trên addressId
        const editedAddress = address.data.find(item => item.xid === addressId);
        if (editedAddress) {
            navigate(`/address/${addressId}`, { state: { address: editedAddress } });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return {
        navigate,
        address,
        showScrollButton,
        setShowScrollButton,
        scrollToTop,
        editAddress,
    }
}

