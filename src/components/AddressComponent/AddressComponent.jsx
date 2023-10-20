import { Controller } from "react-hook-form";
import { useEffect } from "react";

import { fetchDistrictData, fetchProvincesAndWards } from "../../api/services/citiesService";

import { EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import "./AddressComponent.css";
import { COUNTRY, ZIP_CODE } from "../../constant/constant";
import { useAddressComponent } from "./hook/useAddressComponent";

const AddressComponent = ({ isEdit }) => {

    const {
        addressUser,
        cities,
        control,
        errors,
        listState,
        setCities,
        setDistrict,
        handleSubmit,
        onSubmit,
        handleSelect,
    } = useAddressComponent(isEdit);

    //lấy dữ liệu các tỉnh, thành phố
    useEffect(() => {
        const getDataCities = async () => {
            try {
                const citiesData = await fetchProvincesAndWards();
                const districtDate = await fetchDistrictData();
                setCities(citiesData);
                setDistrict(districtDate);
            } catch (error) {
                console.error('Lỗi', error);
            }
        };

        getDataCities();
    }, []);

    return (
        <div className='content-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='content'>
                    <label htmlFor="name">
                        <span className='icon'>
                            <UserOutlined />
                        </span>
                        Họ và tên
                    </label>
                    <Controller
                        render={({ field }) => <Input
                            {...field}
                            placeholder="Nguyễn Phước Sâm"
                        />}

                        name="name"
                        control={control}
                        defaultValue={addressUser.name}
                        rules={{
                            required: true,
                            maxLength: {
                                value: 50,
                                message: 'Tên không được quá 50 ký tự'
                            }
                        }}
                    />
                    {errors?.name?.type === "required" && <p className="message-warning">Nhập đầy đủ thông tin</p>}
                    {errors?.name?.type === "maxLength" && (
                        <p className="message-warning">Không dài quá 50 ký tự</p>
                    )}
                </div>


                <div className='content'>
                    <label htmlFor="phone">
                        <span className='icon'>
                            <PhoneOutlined />
                        </span>
                        Số điện thoại
                    </label>
                    <Controller
                        render={({ field }) => <Input
                            {...field}
                            placeholder="0 XXX XXX XXX"
                        />}
                        name="phone"
                        control={control}
                        defaultValue={addressUser.phone}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(0\d{9})$/,
                                message: 'Số điện thoại không hợp lệ'
                            }
                        }}
                    />
                    {errors?.phone?.type === "required" && <p className="message-warning">Nhập đầy đủ thông tin</p>}
                    {errors.phone && <p className="message-warning">{errors.phone.message}</p>}
                </div>


                <div className='content'>
                    <label htmlFor="email">
                        <span className='icon'>
                            <MailOutlined />
                        </span>
                        Địa chỉ email
                    </label>
                    <Controller
                        render={({ field }) => <Input
                            {...field}
                            placeholder='example@example.com'
                        />}
                        name="email"
                        control={control}
                        defaultValue={addressUser.email}
                        rules={{
                            required: true,
                            maxLength: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Địa chỉ email không hợp lệ'
                            }
                        }}
                    />
                    {errors?.email?.type === "required" && <p className="message-warning">Nhập đầy đủ email</p>}
                    {errors.email && <p className="message-warning">{errors.email.message}</p>}
                </div>


                <div className='content'>
                    <label htmlFor="city">
                        <span className='icon'>
                            <EnvironmentOutlined />
                        </span>
                        Tỉnh, thành phố
                    </label>
                    <Controller
                        name="city"
                        control={control}
                        defaultValue={addressUser.city}
                        render={({ field }) => (
                            <Select
                                placeholder="Tỉnh, thành phố"
                                {...field}
                                options={cities.map(city => ({
                                    value: city.name,
                                    label: city.name,
                                }))}
                                control={control}
                                // rules={{ required: true }}
                                onSelect={handleSelect}
                            />
                        )}
                        rules={{ required: "Bạn phải chọn một tỉnh hoặc thành phố" }}
                    />
                    {errors.city && <p className="message-warning">{errors.city.message}</p>}
                </div>


                <div className='content'>
                    <label htmlFor="state">
                        <span className='icon'>
                            <EnvironmentOutlined />
                        </span>
                        Quận, huyện
                    </label>
                    <Controller
                        name="state"
                        control={control}
                        defaultValue={addressUser.state}
                        render={({ field }) => (
                            <Select
                                placeholder="Quận, huyện"
                                {...field}
                                options={listState.map(district => ({
                                    value: district.name,
                                    label: district.name,
                                }))}
                                control={control}
                            />
                        )}
                        rules={{ required: "Bạn phải chọn quận, huyện" }}
                    />
                    {errors.state && <p className="message-warning">{errors.state.message}</p>}
                </div>


                <div className='content'>
                    <label htmlFor="shipping_address">
                        <span className='icon'>
                            <EnvironmentOutlined />
                        </span>
                        Địa chỉ cụ thể
                    </label>
                    <Controller
                        render={({ field }) => <Input
                            {...field}
                            placeholder="763 Trường Chinh Tây Thạnh"
                        />}
                        name="shipping_address"
                        control={control}
                        defaultValue={addressUser.shipping_address}
                        rules={{
                            required: true,
                            maxLength: {
                                value: 50,
                                message: 'Tên không được quá 50 ký tự'
                            }
                        }}
                    />
                    {errors?.shipping_address?.type === "required" && <p className="message-warning">Nhập đầy đủ thông tin</p>}
                    {errors.shipping_address && <p className="message-warning">{errors.email.message}</p>}
                </div>

                <input type="hidden" name="zipcode" value={ZIP_CODE} />
                <input type="hidden" name="country" value={COUNTRY} />
                <input type="hidden" name="address" value="Test address" />

                <input className='submit-btn' type="submit" value="Lưu thông tin" />
            </form>
        </div>
    )
}

export default AddressComponent;