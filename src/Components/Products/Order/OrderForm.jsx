import React, { useEffect, useState } from "react";

const OrderForm = ({
  name,
  setName,
  PhoneNumber,
  setPhoneNumber,
  address,
  setAddress,
  handleOrderSubmit,
}) => {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedPhone = localStorage.getItem("PhoneNumber");
    const savedAddress = localStorage.getItem("address");
    const savedProvince = localStorage.getItem("province");
    const savedCity = localStorage.getItem("city");

    if (savedName) setName(savedName);
    if (savedPhone) setPhoneNumber(savedPhone);
    if (savedAddress) setAddress(savedAddress);
    if (savedProvince) setProvince(savedProvince);
    if (savedCity) setCity(savedCity);
  }, [setName, setPhoneNumber, setAddress]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem("name", e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    localStorage.setItem("PhoneNumber", e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    localStorage.setItem("address", e.target.value);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    localStorage.setItem("province", e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    localStorage.setItem("city", e.target.value);
  };

  return (
    <div className="delivery-information">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input
              type="text"
              id="PhoneNumber"
              value={PhoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select id="province" value={province} onChange={handleProvinceChange}>
              <option value="">Please choose your Province</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Islamabad">Islamabad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <select id="city" value={city} onChange={handleCityChange}>
              <option value="">Please choose your city</option>
              <option value="Lahore">Lahore</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Gujranwala">Gujranwala</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Multan">Multan</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Bahawalpur">Bahawalpur</option>
              <option value="Sialkot">Sialkot</option>
              <option value="Sheikhupura">Sheikhupura</option>
              <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
              <option value="Gujrat">Gujrat</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your complete address"
          />
        </div>

        <button className="proceed-to-pay" onClick={handleOrderSubmit}>
          Proceed to Pay
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
