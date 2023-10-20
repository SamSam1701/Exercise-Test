import { Link } from "react-router-dom";
import { useEffect } from 'react'

import { Button } from "antd";
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, PlusOutlined, UpCircleOutlined } from "@ant-design/icons";
import "./Address.css";
import { useAddress } from "./hook/useAddress";

const ItemCard = ({ data, editAddress }) => (
  <div>
    {data.map((item) => (
      <div className="content-address__container" key={item.xid}>
        <div className="content-item">
          <p className="content-name">Họ và tên: {item.name}</p>
          <Link to="/"><p className="delete-name">Xóa</p></Link>
          <ul className="list-content">
            <li>
              <p className="list-content__item">
                <span className="icon-item">
                  <EnvironmentOutlined />
                </span>
                Địa chỉ
              </p>
              <p>{item.address}</p>
            </li>
            <li>
              <p className="list-content__item">
                <span className="icon-item">
                  <PhoneOutlined />
                </span>
                Số điện thoại
              </p>
              <p>{item.phone}</p>
            </li>
            <li>
              <p className="list-content__item">
                <span className="icon-item">
                  <MailOutlined />
                </span>
                Địa chỉ email
              </p>
              <p>{item.email}</p>
            </li>
          </ul>
          <span>
            <Button className="link-edit" type="text" onClick={() => editAddress(item.xid)}>Chỉnh sửa</Button>
          </span>
        </div>
      </div>
    ))}
  </div>
);

function Address() {

  const {
    navigate,
    address,
    showScrollButton,
    setShowScrollButton,
    scrollToTop,
    editAddress
  } = useAddress();

  // xử lý button back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <Link to={"/add-address"}>
        <div className="addaddress-area">
          <div className="dash-circle">
            <span className="add-icon">
              <PlusOutlined />
            </span>
          </div>
          <Button
            className="add-button"
            type="primary"
            onClick={() => navigate('/add-address')}
          >
            Thêm mới
          </Button>
        </div>
      </Link>
      <ItemCard data={address.data} editAddress={editAddress} />

      <div className="back-to-top">
        {showScrollButton && (
          <Button shape="circle" className="scroll-top-button" onClick={scrollToTop}>
            <UpCircleOutlined />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Address