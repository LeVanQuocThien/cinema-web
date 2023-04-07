import React from 'react'
import './PayCard.scss'

export default function PayCard(props) {
    return (
        <div className='payCard'>
            <div className='logoBank'>
                <div style={{ backgroundImage: `url(${props.Logo})` }} className='img'></div>
            </div>
            <div className='infoCard'>
                <h3>{props.Name}</h3>
                <p>{props.CardNumber}</p>
            </div>
        </div>
    )
}
