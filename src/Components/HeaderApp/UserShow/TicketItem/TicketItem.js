import React from 'react'
import './TicketItem.scss'
import { useDispatch } from 'react-redux'
export default function TicketItem(props) {
    const dispatch = useDispatch()
    const dateTime = props.ShowTime.split('T')
    const HandleShowTicket = () => {
        dispatch({ type: 'SET_TICKET_DETAIL', payload: props })
        dispatch({ type: 'SET_SCREEN', payload: 'ticketDetail' })
    }

    return (
        <div className='ticketItem' onClick={HandleShowTicket}>
            <h3 className='filmName'>{props.FilmName}</h3>
            <p className='cinemaName'>{props.CinemaName}</p>
            <p className='showTime'>
                <span>{dateTime[0].split('-').reverse().join('/')}</span>
                <span>{dateTime[1].substring(0, 5)}</span>
            </p>
        </div>
    )
}
