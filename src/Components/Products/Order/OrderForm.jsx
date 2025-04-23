import React from "react";

const OrderForm = ({ name, setName, PhoneNumber, setPhoneNumber, address, setAddress, handleOrderSubmit }) => {
  return (
    <div className="delivery-information">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input type="text" id="PhoneNumber" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" />
          </div>
        </div>
        <div className="form-group-inline">
                <div className="form-group">
                  <label htmlFor="province">Province</label>
                  <select id="province">
                    <option value="">Please choose your Province</option>
                    <option value="">Balochistan</option>
                    <option value="">Khyber Pakhtunkhwa</option>
                    <option value="">Punjab </option>
                    <option value="">Sindh</option>
                    <option value="">Islamabad </option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select id="city">
                    <option value="">Please choose your city</option>
                    <option value="">Lahore</option>
                    <option value="">Faisalabad</option>
                    <option value="">Rawalpindi</option>
                    <option value="">Gujranwala</option>
                    <option value="">Peshawar</option>
                    <option value="">Multan</option>
                    <option value="">Hyderabad</option>
                    <option value="">Islamabad</option>
                    <option value="">Bahawalpur</option>
                    <option value="">Sialkot</option>
                    <option value="">Sheikhupura</option>
                    <option value="">Dera Ghazi Khan</option>
                    <option value="">Gujrat</option>
                  </select>
                </div>
              </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your complete address" />
        </div>
        <button className="proceed-to-pay" onClick={handleOrderSubmit}>Proceed to Pay</button>
      </form>
    </div>
  );
};

export default OrderForm;
