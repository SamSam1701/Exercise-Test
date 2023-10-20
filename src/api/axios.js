import axios from "axios";
import getConfig from "./config";

const instance = axios.create(getConfig());

export const getAddressData = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Không có token xác thực.');
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await instance.get('self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country', { headers });

        if (response.status === 200) {

            return response.data;
        } else {
            throw new Error('Lỗi khi lấy dữ liệu địa chỉ.');
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu lấy dữ liệu địa chỉ:', error);
        throw error;
    }
};

export const postAddressData = async (data) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Không có token xác thực.');
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await instance.post('self/address', data, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Lỗi khi gửi dữ liệu địa chỉ.');
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu POST dữ liệu địa chỉ:', error);
        throw error;
    }
};

export const editAddressData = async (addressId, data) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Không có token xác thực.');
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await instance.put(`self/address/${addressId}`, data, { headers });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Lỗi khi gửi dữ liệu địa chỉ.');
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu PUT dữ liệu địa chỉ:', error);
        throw error;
    }
};


