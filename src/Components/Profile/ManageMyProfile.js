import React from 'react';
import RecentOrdersTable from './RecentOrdersTable';

function ManageMyProfile({ activeTab, setActiveTab, userData, orderStats, orders, products }) {
    return (
        <div>
            {activeTab === 0 && (
                <>
                    <div className="mainProfilePage">
                        <div className="mainProfilePageLeft">
                            <div className="mainProfilePageLeftRightContent">
                                <h4>Personal Profile</h4>
                                <div style={{ color: 'rgba(232, 232, 232, 1)' }}>|</div>
                                <p className="profileEditBtn" onClick={() => setActiveTab(1)}>Edit</p>
                            </div>
                            <p>{userData.phone_number}</p>
                            <span>Receive Marketing SMS</span>
                        </div>
                        <div className='yprofilePageRightFlex'>
                            <div className="mainProfilePageRight">
                                <div className="mainProfilePageLeftRightContent">
                                    <h4>Address Book</h4>
                                    <div style={{ color: 'rgba(232, 232, 232, 1)' }}>|</div>
                                    <p className="profileEditBtn" onClick={() => setActiveTab(3)}>Edit</p>
                                </div>
                                <p>Default Shipping Address</p>
                                <h4>{userData.name}</h4>
                                <span>{userData.address || "No address saved"}</span>
                                <span>{userData.phone_number}</span>
                            </div>
                            <div className='mainProfilePageLast'>
                                <p>Default Shipping Address</p>
                                <h4>{userData.name}</h4>
                                <span>{userData.address || "No address saved"}</span>
                                <span>{userData.phone_number}</span>
                            </div>
                        </div>
                    </div>
                    <RecentOrdersTable orderStats={orderStats} activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} orders={orders} products={products} />
                </>
            )}
        </div>
    );
}

export default ManageMyProfile;