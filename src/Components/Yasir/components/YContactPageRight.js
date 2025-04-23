import React from 'react'
import SendMessageBtn from '../buttons/SendMessageBtn'

function YContactPageRight() {
    return (
        <>
            <div className='contactPageRight'>
                <h2>Send your comments</h2>
                <div className='contactPageRightFlex YglobalFlex'>
                    <input type="text" name="" id="" placeholder='Name*' required />
                    <input type="text" name="" id="" placeholder='Email*' required />
                    <input type="text" name="" id="" placeholder='Your Subject*' required />
                </div>
                <div className='contactPageRightMessageSection'>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Write your message' required></textarea>
                </div>
                <SendMessageBtn />
            </div>
        </>
    )
}

export default YContactPageRight