const API_BASE_URL = 'https://test-pos.digibird.io/api/v1/front/';

const getConfig = () => {
    const config = {
        baseURL: API_BASE_URL,
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' },
    };
    return config;
};

export default getConfig;