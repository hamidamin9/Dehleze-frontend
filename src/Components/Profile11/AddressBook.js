import React from 'react'

function AddressBook({ activeTab }) {
    return (
        <>
            {
                activeTab === 3 && <div>
                    <div className="profileAddressBook">
                        <div>
                            <h2>Save your shipping and billing address here.</h2>
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div><button><i class="fa-solid fa-plus"></i> ADD NEW ADDRESS</button></div>
                    </div>
                </div>
            }
        </>
    )
}

export default AddressBook
