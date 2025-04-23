import React from 'react'

function ContactPageNewsLetter() {
    return (
        <>
            <div className='YContactPageNewsLetterSecton'>
                <div className='YContactPageNewsLetterSectonFlex YglobalFlex'>
                    <div className='YContactPageNewsLetterLeft'>
                        <div className='YContactPageNewsLetterLeftFlex YglobalFlex YhideYContactPageNewsLetterLeftFlex'>
                            <h2>Follow us</h2>
                            <div className='YnewsLetterSocialIcons YglobalFlex'>
                                <i className="fa-brands fa-facebook-f"></i>
                                <i className="fa-brands fa-twitter"></i>
                                <i className="fa-brands fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                    <div className='YContactPageNewsLetterRight'>
                        <div className='YContactPageNewsLetterLeftFlex YglobalFlex YContactPageNewsLetterRight'>
                            <h2>Sign up for newsletter</h2>
                            <div className='YnewsLetterSocialIcons YglobalFlex YnewsLetterInput'>
                                <input type="text" name="" id="" placeholder='Enter your email' />
                                <button>Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactPageNewsLetter