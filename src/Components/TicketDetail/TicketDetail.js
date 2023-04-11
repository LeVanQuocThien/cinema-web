import React, { useEffect, useState } from 'react'
import './TicketDetail.scss'
import { useSelector } from 'react-redux'
import { Logo } from '../CommonComponents/Image/Image'
export default function TicketDetail() {
    const ticket = useSelector(state => state.userManage.ticketDetail)
    const [dateTime, setDateTime] = useState(['', ''])
    useEffect(() => {
        setDateTime(ticket.ShowTime.split('T'))
    }, [ticket])

    return (

        <div className='ticketDetail'>
            <div className='container'>
                <header className='header'>
                    <h2>Movie ticket</h2>
                    <Logo height={'30px'} />
                </header>
                <div className='containerDetail'>
                    <h1>{ticket.FilmName}</h1>
                    <h3>{ticket.CinemaName}</h3>
                    <div className='detail'>
                        <div className='seatAndCombo'>
                            <div className='wrapper'>
                                <h3 className='type'>Seats:</h3>
                                <p>{ticket.SeatCode.match(/[A-Z][0-9]+/g).join('-')}</p>
                            </div>
                            {ticket.Combo && <div className='wrapper'>
                                <h3 className='type'>Combo:</h3>
                                <p>{ticket.Combo}</p>
                            </div>}
                        </div>
                        <div className='showTime'>
                            <div className='wrapper'>
                                <h3>Date and time: </h3>
                                <p className='dateAndTime'>
                                    <span>{dateTime[0].split('-').reverse().join('/')}</span>
                                    <span>{dateTime[1].substring(0, 5)}</span>
                                </p>
                            </div>
                            <div className='wrapper'>
                                <h3>Theater: </h3>
                                <p>{ticket.TheaterName}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='customer'>Customer: {ticket.Email}</p>
            </div>
        </div>

    )
}
