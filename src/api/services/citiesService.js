import axios from 'axios';

export async function fetchProvincesAndWards() {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/');
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function fetchDistrictData() {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/d/');
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching additional data:', error);
        return null;
    }
}