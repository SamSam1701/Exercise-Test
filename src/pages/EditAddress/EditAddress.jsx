import AddressComponent from '../../components/AddressComponent/AddressComponent'

import "./EditAddress.css";
import { useEditAddress } from './hook/useEditAddress';

function EditAddress() {

  const { address, setAddressUser, isEdit } = useEditAddress();
  setAddressUser(address);

  return (
    <div className='edit-container'>
      <div className="edit-address-wrapper">
        <h2 className='title-page'>
          Chỉnh sửa địa chỉ
        </h2>
        <AddressComponent isEdit={isEdit} />
      </div>
    </div>
  )
}

export default EditAddress