import React from 'react'
import './TrendItem.scss'

export default function TrendItem(props) {
    return (
        <div className='trendItem' style={{ backgroundImage: `url(${props.imagePortrait})` }}>

        </div>
    )
}
