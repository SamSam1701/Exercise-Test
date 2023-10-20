import AddressComponent from '../../components/AddressComponent/AddressComponent';
import "./AddAddress.css"
import { useAddAddress } from './hook/useAddAddress';

function AddAddress() {

  const { isEdit } = useAddAddress();
  return (
    <div className='add-container'>
      <div className="add-address-wrapper">
        <h2 className='title-page'>
          Thêm mới địa chỉ
        </h2>
        <AddressComponent isEdit={isEdit} />
      </div>
    </div>
  )
}

export default AddAddress