import React from 'react'
import { useSelector } from 'react-redux'
import './Ticket.scss'

export default function Ticket(props) {
    const count = useSelector(state => state.ticketManage.seatLs)
    // const dispatch = useDispatch()
    return (
        <div className='ticket'>
            <p className='count'>
                <span className='num'>
                    {props.isShowCount ? count[props.areaCategoryCode]?.length : 0}
                </span>
                x
            </p>
            <p className='name'>{props.description}</p>
            <p className='price'>{props.displayPrice}</p>
        </div>
    )
}
