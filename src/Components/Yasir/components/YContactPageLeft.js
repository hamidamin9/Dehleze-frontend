import React from 'react'

function YContactPageLeft() {
    return (
        <>
            <div className='contactPageLeft'>
                <h2>Welcome to Dehlez</h2>
                <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco laboris nisi ut ali</p>
                <div className='YglobalFlex contactPageLeftDetailsFlex'>
                    <div className='YglobalFlex contactPageLeftDetails'>
                        <i className="fa-solid fa-location-dot"></i>
                        <p>123 Suspendis matis, Sollicitudin District,Accums Fringilla</p>
                    </div>
                    <div className='YglobalFlex contactPageLeftDetails'>
                        <i className="fa-regular fa-envelope"></i>
                        <p>Email: support@domainstore.com</p>
                    </div>
                    <div className='YglobalFlex contactPageLeftDetails'>
                        <i class="fa-solid fa-phone"></i>
                        <p>Hotline: 0123456789</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default YContactPageLeft