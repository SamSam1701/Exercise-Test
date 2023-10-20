import { useRecoilState } from "recoil";
import { addressUserState } from "../../../atoms/addressUser";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { COUNTRY, ZIP_CODE } from "../../../constant/constant";
import { message } from "antd";
import { editAddressData, postAddressData } from "../../../api/axios";

export const useAddressComponent = (isEdit) => {

    const [addressUser] = useRecoilState(addressUserState);

    const { handleSubmit, control, formState: { errors }, getValues } = useForm();

    const [cities, setCities] = useState([]);
    const [district, setDistrict] = useState([])
    const [codeProvince, setCodeProvince] = useState(-1);



    // lấy code của tỉnh, thành phố 
    const getCodeForCity = (cityName) => {
        const selectedCity = cities.find(city => city.name === cityName);
        return selectedCity ? selectedCity.code : -1;
    }

    // lấy code của tỉnh được chọn
    const handleSelect = (value) => {
        if (value) {
            const code = getCodeForCity(value);
            setCodeProvince(code);
        }
    }

    // tìm các quận, huyện của tỉnh được chọn
    const findDistricts = (listDistrict, codeProvince) => {
        const listData = listDistrict.filter(district => district.province_code === codeProvince);
        return listData;
    }

    const listState = findDistricts(district, codeProvince);

    const onSubmit = async () => {
        const dataForm = getValues();
        dataForm.zipcode = ZIP_CODE;
        dataForm.country = COUNTRY;
        dataForm.address = dataForm.shipping_address;

        // nếu component sử dụng cho trang thêm mới 
        if (isEdit === false) {
            try {
                const response = await postAddressData(dataForm);
                if (response.data) {
                    message.success('Thêm địa chỉ thành công!');
                } else {
                    message.error(`${response.message}!`)
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
        else
        // Nếu là trang chỉnh sửa  
        {
            try {
                const response = await editAddressData(addressUser.xid, dataForm);

                if (response.data) {
                    message.success('Cập nhật địa chỉ thành công!');
                } else {
                    message.error(`${response.message}!`)
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
    };


    return {
        addressUser,
        cities,
        listState,
        control,
        errors,
        setCities,
        setDistrict,
        handleSubmit,
        onSubmit,
        handleSelect,
    }
}