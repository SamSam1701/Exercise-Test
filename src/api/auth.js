import axios from "axios";
import { DATA_LOGIN } from "../constant/constant";
import getConfig from "./config";

export const login = async () => {
    try {
        const data = DATA_LOGIN;
        const response = await axios.post(`${getConfig().baseURL}sign-up-zalo`, data);
        if (response.status === 200) {
            const token = response.data.data.token;
            localStorage.setItem('token', token);
        } else {
            console.error('Lỗi khi đăng nhập:', response.data);
        }
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
};
