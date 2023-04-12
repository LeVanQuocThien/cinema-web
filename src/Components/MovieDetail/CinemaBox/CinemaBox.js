import React from 'react'
import LsShowTime from '../../CommonComponents/LsShowTime/LsShowTime'
import './CinemaBox.scss'
export default function CinemaBox(props) {
    return (
        props.dates.some(e => e.showDate.includes(props.sess)) &&
        <div className='cinemaBox'>
            <div className='cinemaItem'>
                <h1 className='cinemaName'>{props.name}</h1>
                <div className='timeBox'>
                    <LsShowTime
                        sessItem={props.dates.filter(e => e.showDate.includes(props.sess))[0]}
                        jsonDispatch={[
                            {
                                key: 'cinemaName',
                                value: props.name
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
