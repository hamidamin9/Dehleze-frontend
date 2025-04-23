import React from 'react'

function ManageMyProfile({ activeTab, setActiveTab, userData }) {
    return (
        <div>
            {activeTab === 0 && (
                <>
                    <div className="mainProfilePage">
                        <div className="mainProfilePageLeft">
                            <div className="mainProfilePageLeftRightContent">
                                <h4>Personal Profile</h4>
                                <div>|</div>
                                <p className="profileEditBtn" onClick={() => setActiveTab(1)}>EDIT</p>
                            </div>
                            <span>{userData.name || "N/A"}</span>
                            <p>aliyasir1029@gmail.com</p>
                        </div>
                        <div className="mainProfilePageRight">
                            <div className="mainProfilePageLeftRightContent">
                                <h4>Address Book</h4>
                                <div>|</div>
                                <p className="profileEditBtn" onClick={() => setActiveTab(3)}>ADD</p>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    )
}

export default ManageMyProfile
