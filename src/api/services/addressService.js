import { getAddressData } from "../axios";

export const getListDataAddress = async () => {
    try {
        const data = await getAddressData(); // Sử dụng hàm getAddressData để lấy dữ liệu
        return data; // Trả về dữ liệu từ hàm getAddressData
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu danh sách địa chỉ:', error);
        throw error;
    }
};