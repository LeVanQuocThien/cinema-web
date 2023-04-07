import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Combo from './Combo/Combo'
import Ticket from './Ticket/Ticket'
import './TicketCombo.scss'

export default function TicketCombo({ ticket, consession }) {
    const ticketManage = useSelector(state => state.ticketManage)
    const nav = useNavigate()
    const { timeShowID } = useParams()
    const isMember = useSelector(state => state.userManage.currentUser?.Role === '1')

    const HandleClickBuy = () => {
        let isSeat = Object.values(ticketManage.seatLs).some(e => e.length > 0)
        if (isSeat) {
            nav(`/chooseseat/${timeShowID}/payment`)
        } else { alert('chon ve cmm de') }
    }
    return (
        <div className='ticketCombo'>
            <h2 className='cinemaName'>{ticketManage.cinemaName}</h2>
            <div className='wrapper'>
                <div className='priceWrapper'>
                    {ticket?.map((e, i) => {
                        return <Ticket
                            key={i}
                            {...e}
                            isShowCount={
                                !(ticket.some(check => check !== e && check.areaCategoryCode === e.areaCategoryCode) && isMember !== e.onlyMember)
                            }
                        />
                    })}
                </div>
                <div className='comboWrapper'>
                    {consession && consession[0].concessionItems.map((e, i) => {
                        return <Combo key={i} {...e} />
                    })}
                </div>
                <div className='pay'>
                    <h3 className='total'>{ticketManage.totalPrice}</h3>
                    <button onClick={HandleClickBuy} className='btnBuy'>Buy ticket</button>
                </div>
            </div>
        </div>
    )
}
