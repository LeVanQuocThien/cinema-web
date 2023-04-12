import React, { useState } from 'react'
import './SeatItem.scss'
import { MdChair } from 'react-icons/md'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

export default function SeatItem({ type, seatCode, typeSeat }) {
    const dispatch = useDispatch()
    const seatLs = useSelector(state => state.ticketManage.seatLs)
    const ticket = useSelector(state => state.seatPlantManage.ticket)
    const bookedSeat = useSelector(state => state.seatPlantManage.bookedSeat)
    const totalPrice = useSelector(state => state.ticketManage.totalPrice)
    const [isShow, setIsShow] = useState(seatLs[typeSeat]?.includes(seatCode))
    const isMember = useSelector(state => state.userManage.currentUser?.Role === '1')

    const handleCount = () => {
        let price = ticket.filter(e => {
            return !(ticket.some(check => check !== e && check.areaCategoryCode === e.areaCategoryCode) && isMember !== e.onlyMember) && e.areaCategoryCode === typeSeat
        })[0].displayPrice
        if (!isShow) {
            dispatch({
                type: 'PUSH_TICKET',
                payload: {
                    key: typeSeat,
                    value: seatCode
                }
            })
            dispatch({
                type: 'SET_TOTAL_PRICE',
                payload: totalPrice + price
            })
            setIsShow(!isShow)
        } else {
            dispatch({
                type: 'REMOVE_TICKET',
                payload: {
                    key: typeSeat,
                    value: seatCode
                }
            })
            dispatch({
                type: 'SET_TOTAL_PRICE',
                payload: totalPrice - price
            })
            setIsShow(!isShow)
        }
    }
    return (
        < div className={clsx({ [type]: type && seatCode }, 'seatItem')} >
            <div className={clsx({ 'exist': seatCode })}>
                {seatCode &&
                    <button
                        onClick={handleCount}
                        className={clsx({
                            'show': isShow,
                        })}
                        disabled={bookedSeat.match(/[A-Z][0-9]+/g)?.includes(seatCode)}
                    >
                        <MdChair className='iconChair' />
                        <p className='seatCode'>{seatCode}</p>
                    </button>
                }

            </ div>
        </div >
    )
}
