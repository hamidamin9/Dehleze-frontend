import React from 'react'

function MyProfile({ activeTab, setActiveTab, userData }) {
    return (
        <div className='myProfileTab'>
            {activeTab === 1 && (

                <>
                    {/* <h3 style={{ padding: '1rem 0rem' }}>My Profile</h3> */}
                    <div className="profilePersonalInfo">
                        <div className="profilePersonalInfoFlex">
                            <div>
                                <span>Full Name</span>
                                <p>{userData.name || "N/A"}</p>
                            </div>
                            <div>
                                <span>Email</span>
                                <p>{userData.email || "N/A"}</p>
                            </div>
                            <div>
                                <span>Mobile</span>
                                <p>{userData.phone_number || "N/A"}</p>
                            </div>
                            {/* <div>
                                <p>Full Name</p>
                                <p>{userData.address || "N/A"}</p>
                            </div> */}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MyProfile
