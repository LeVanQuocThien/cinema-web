import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './ChooseSeat.scss'
import Seat from './Seat/Seat'
import HeaderApp from '../HeaderApp/HeaderApp'
import TicketCombo from './TicketCombo/TicketCombo'
import { Outlet, useParams } from 'react-router-dom'
import Privite from '../Privite/Privite'

export default function ChooseSeat() {
    const bookData = useSelector(state => state.seatPlantManage)
    const dispatch = useDispatch()
    const { timeShowID } = useParams()

    useEffect(() => {
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/TicketByShowCode/${timeShowID}`,
                type: 'SET_BOOKED_SEAT'
            }
        })
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/booking/detail`,
                type: 'SET_SEAT_BOOKDATA'
            }
        })
    }, [dispatch, timeShowID])

    return (
        <Privite>
            <div className='chooseSeat'>
                <HeaderApp />
                {bookData.seatPlan &&
                    <div className='container'>
                        <Seat data={bookData?.seatPlan?.seatLayoutData.areas} />
                        <TicketCombo {...bookData} />
                    </div>
                }
                <Outlet></Outlet>
            </div>
        </Privite>
    )
}
