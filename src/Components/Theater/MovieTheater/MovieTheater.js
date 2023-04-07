import React from 'react'
import { formatText } from '../../../CommonFunction/common'
import LsShowTime from '../../CommonComponents/LsShowTime/LsShowTime'
import './MovieTheater.scss'

export default function MovieTheater(props) {
    return (
        props.dates.some(e => e.showDate.includes(props.sess)) &&
        <div className='movieTheater'>
            <div className='imgBanner'>
                <div className='imgB' style={{ backgroundImage: `url(${props.imagePortrait})` }}></div>
            </div>
            <div className='info'>
                <div className='head'>
                    <div className='nameWrapper'>
                        <h2 className='movieName'>{props.name}</h2>
                        <h2 className='subName'>{props.subName}</h2>
                    </div>
                    <div className='timeAndAge'>
                        <span>128 MINS </span>
                        {props.age !== '0' && <span className='age'>{props.age}<span className='plus'>+</span></span>}
                    </div>
                </div>
                <p className='description' dangerouslySetInnerHTML={{ __html: formatText(props.description) }}></p>
                <div className='showTimeWrap'>
                    <h2>Show time:</h2>
                    <div className='showTime'>
                        <LsShowTime
                            sessItem={props.dates.filter(e => e.showDate.includes(props.sess))[0]}
                            jsonDispatch={[
                                {
                                    key: 'filmName',
                                    value: props.name
                                },
                                {
                                    key: 'imageLandscape',
                                    value: props.imageLandscape
                                },
                                {
                                    key: 'imagePortrait',
                                    value: props.imagePortrait
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
