import React from 'react'
import ManageMyProfile from './ManageMyProfile'
import MyProfile from './MyProfile'
import MyOrders from './MyOrders'
import MyProcessing from './MyProcessing'
import MyPendings from './MyPendings'
import DeliveredOrders from './DeliveredOrders'
import CancelledOrders from './CancelledOrders'
import AddressBook from './AddressBook'
import RecentOrdersTable from './RecentOrdersTable'
import ReviewsPage from '../Yasir/pages/ReviewsPage'
import AfterReviewPage from '../Yasir/pages/AfterReviewPage'

function MobileViewTabs({ activeTab, setActiveTab, userData, orderStats, orders, setOrders, products }) {
    return (
        <>
            <div className="profileFlex mobileViewProfileTabs">
                <div className="profilepageleft">
                    {/* Tab buttons */}
                    <div className="profileFilterBtns profileFilterBtnsMobileView">
                        <span>Hello, {userData.name || "N/A"}</span>
                        <h6 onClick={() => setActiveTab(0)} className={activeTab === 0 ? "" : ""}>Manage My Account</h6>

                        <div className='manageProfileMobileView'>
                            <p onClick={() => setActiveTab(1)} className={activeTab === 1 ? "profileActiveClass" : ""}>My Profile</p>
                            <p onClick={() => setActiveTab(3)} className={activeTab === 3 ? "profileActiveClass" : ""}>Address Book</p>
                            <p onClick={() => setActiveTab(3)} className={activeTab === 3 ? "profileActiveClass" : ""}>My Payment Options</p>
                            <p onClick={() => setActiveTab(3)} className={activeTab === 3 ? "profileActiveClass" : ""}>Dehleze Wallet</p>
                        </div>

                        <h6 onClick={() => setActiveTab(2)}>My Orders</h6>
                        <div className='manageProfileMobileView'>
                            <p onClick={() => setActiveTab(8)} className={activeTab === 8 ? "profileActiveClass" : ""}>Pending Orders</p>
                            <p onClick={() => setActiveTab(7)} className={activeTab === 7 ? "profileActiveClass" : ""}>My Cancellations</p>
                            <p onClick={() => setActiveTab(79)} className={activeTab === 79 ? "profileActiveClass" : ""}>My Returns</p>
                        </div>
                        <h6 onClick={() => setActiveTab(12)}>My Reviews</h6>
                        <h6 onClick={() => setActiveTab(2)}>My Wishlist & <br />
                            Followed Stores</h6>
                        <h6 onClick={() => setActiveTab(2)}>Sell on Dehleze</h6>
                    </div>
                </div>
                <br />
                <div className="profilepageright">
                    <div className="profileHeader mobileViewProfileheader">
                        <h3>{activeTab === 0 ? "Manage Your Account" : activeTab === 1 ? "My Profile" : activeTab === 2 ? "My Orders" : activeTab === 3 ? "Address Book" : activeTab === 4 ? "My Processing" : activeTab === 5 ? "My Pendings" : activeTab === 6 ? "Delivered Orders" : activeTab === 7 ? "Cancel Orders" : activeTab === 8 ? "Pending Orders" : activeTab === 12 ? 'My Reviews' : null}</h3>
                        {/* <button onClick={handleLogout}>Logout</button> */}
                    </div>
                    {/* {
                        activeTab === 0 && <div className='mobileRecentOrdersTableView'>
                            <RecentOrdersTable orderStats={orderStats} />
                        </div>
                    } */}

                    <ManageMyProfile activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} orderStats={orderStats} />

                    <MyProfile activeTab={activeTab} setActiveTab={setActiveTab} userData={userData} />

                    <MyOrders orders={orders} setActiveTab={setActiveTab} setOrders={setOrders} userData={userData} orderStats={orderStats} products={products} activeTab={activeTab} />

                    <MyProcessing
                        orderStats={orderStats}
                        activeTab={activeTab}
                        orders={orders}
                        products={products}
                        userData={userData}
                    />

                    <MyPendings orderStats={orderStats} activeTab={activeTab} />

                    <DeliveredOrders orderStats={orderStats} activeTab={activeTab} />

                    <CancelledOrders activeTab={activeTab} orderStats={orderStats} />

                    <AddressBook activeTab={activeTab} />
                    <AfterReviewPage activeTab={activeTab} />
                </div>
            </div>
        </>
    )
}

export default MobileViewTabs
