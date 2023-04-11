import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetSeatLayout } from '../../../CommonFunction/common';
import SeatItem from './SeatItem/SeatItem';
import { MdChair } from 'react-icons/md'
import './Seat.scss'

export default function Seat({ data }) {
    const ticket = useSelector(state => state.ticketManage)
    const dispatch = useDispatch()
    const [standardSeat, setStandardSeat] = useState([])
    const [coupleSeat, setCoupleSeat] = useState([])

    useEffect(() => {
        if (data) {
            setStandardSeat(GetSeatLayout(data[0]))
            setCoupleSeat(GetSeatLayout(data[1]))
            data.forEach(element => {
                if (!ticket.seatLs[element.areaCategoryCode]) {
                    dispatch({
                        type: "CREATE_TICKET",
                        payload: {
                            key: element.areaCategoryCode,
                            value: []
                        }
                    })
                };
            });
        }
    }, [data, dispatch, ticket])

    return (
        <div className='seat'>
            <h1 className='screen'>{ticket.filmName}</h1>

            <div className='seatWrapper'>
                <div className='categories'>
                    <div >
                        <MdChair className='blankSeat' />
                        <span>is blank</span>
                    </div>
                    <div >
                        <MdChair className='bookingSeat' />
                        <span>is booking</span>
                    </div>
                    <div >
                        <MdChair className='boughtSeat' />
                        <span>is bought</span>
                    </div>
                </div>
                <div className='standardSeat'>
                    {standardSeat.map((row, i) => {
                        return <div key={i} className='row'>
                            {row.map((item, i) => {
                                return <SeatItem
                                    key={i}
                                    seatCode={item}
                                    typeSeat={data[0].areaCategoryCode}
                                />
                            })}
                        </div>
                    })}
                </div>
                <div className='coupleSeat'>
                    {coupleSeat.map((row, i) => {
                        return <div key={i} className='row'>
                            {row.map((item, i) => {
                                return <SeatItem
                                    key={i}
                                    seatCode={item}
                                    type={'couple'}
                                    typeSeat={data[1].areaCategoryCode}
                                />
                            })}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
