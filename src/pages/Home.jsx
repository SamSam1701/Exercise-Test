import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';

import { getAddressData } from '../api/axios';
import { addressState } from '../atoms/address';

import '../assets/css/index.css'
import '../App.css'

function Home() {

    const navigate = useNavigate();

    const [, setAddress] = useRecoilState(addressState);

    const getDataAddress = async () => {
        try {
            const data = await getAddressData();
            setAddress(data); // Cập nhật trạng thái Recoil address với dữ liệu mới
            navigate("/address");
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu lấy dữ liệu địa chỉ:', error);
        }
    };

    return (
        <div className='container-home'>
            <div>
                <a href="https://digibird.io" target="_blank">
                    <img src='/public/logo-350x125.png' className="logo" alt="DigiBird logo" />
                </a>
            </div>
            <h1>DigiBird Test Exercise</h1>
            <div className="card" style={{ flexDirection: 'row' }}>
                <button className='button-home' style={{ marginLeft: 10 }} onClick={getDataAddress}>
                    Start
                </button>
            </div>
            <p className="read-the-docs">
                Click on the button view details exercise
            </p>
        </div>
    )
}

export default Home
