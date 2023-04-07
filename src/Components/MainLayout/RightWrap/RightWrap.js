import React from 'react'
import './RightWrap.scss'

import { BsFacebook, BsGoogle, BsTwitter } from 'react-icons/bs'
import { SiAppstore, SiGoogleplay } from 'react-icons/si'
import QuickBooking from './QuickBooking/QuickBooking'

export default function RightWrap() {
    return (
        <div className='rightWrap'>
            <QuickBooking />
            <div className='contact'>
                <h3>Follow us: </h3>
                <div className='media'>
                    <BsFacebook className='mediaIcon' />
                    <BsGoogle className='mediaIcon' />
                    <BsTwitter className='mediaIcon' />
                </div>
                <h3>Download:</h3>
                <div className='downloadApp'>
                    <div className='downloadWrapper'>
                        <SiGoogleplay />
                        <p>GooglePlay</p>
                    </div>
                    <div className='downloadWrapper'>
                        <SiAppstore />
                        <p>AppStore</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
