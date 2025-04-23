import React, { useState } from 'react';

function AddressBook({ activeTab, userData = {}, setUserData }) {
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState(userData.address || "");

    const handleSaveAddress = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("http://39.61.51.195:8004/account/addresses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ address: address, userId: userData.id })

            });

            if (response.ok) {
                const updatedUserData = { ...userData, address };
                setUserData(updatedUserData);
                setIsEditing(false);
            } else {
                console.error("Failed to update address");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {activeTab === 3 && (
                <div className="profileAddressBook">
                    <div>
                        <h2>Save your shipping and billing address here.</h2>
                        <i className="fa-solid fa-location-dot"></i>
                    </div>
                    {isEditing ? (
                        <div>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your address"
                            />
                            <button onClick={handleSaveAddress}>Save Address</button>
                        </div>
                    ) : (
                        <div>
                            <p>{userData.address || "No address saved"}</p>
                            <button onClick={() => setIsEditing(true)}>
                                <i className="fa-solid fa-plus"></i> EDIT ADDRESS
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default AddressBook;