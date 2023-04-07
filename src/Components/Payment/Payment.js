import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import './Payment.scss'

import PayCard from '../CommonComponents/PayCard/PayCard'

export default function Payment() {
    const { timeShowID } = useParams()
    const nav = useNavigate()
    const ticket = useSelector(state => state.ticketManage)
    const bankAcc = useSelector(state => state.userManage.bankAcc)
    const currentUser = useSelector(state => state.userManage.currentUser)
    const [card, setCard] = useState({})
    const [cardSelect, setCardSelect] = useState({
        CardNumber: ''
    })
    const [isShow, setIsShow] = useState(false)

    const PostAPIBuy = (info) => {
        fetch(`https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/Ticket`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...info,
                Price: ticket.totalPrice,
                ShowCode: ticket.session,
                Email: currentUser.Email,
                CinemaName: ticket.cinemaName,
                TheaterName: ticket.theaterName,
                FilmName: ticket.filmName,
                ImageLandscape: ticket.imageLandscape,
                ImagePortrait: ticket.imagePortrait,
                Combo: Object.keys(ticket.comboLs).filter(e => ticket.comboLs[e] !== '0').map(com => `${com} x${ticket.comboLs[com]}`).join('-'),
                SeatCode: Object.values(ticket.seatLs).flat().join(`-`),
                ShowTime: ticket.showTime
            })
        })
            .then(res => {
                if (res.status === 200) {
                    alert('mua ve thanh cong');
                    nav('/')
                }
            })
            .catch(() => {
                alert('check out your seclection !')
            })
    }
    const HandleInputCard = (event) => {
        setCard(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const HandleBuy = () => {
        if (!cardSelect.CardNumber) {
            setIsShow(true)
        } else {
            PostAPIBuy(cardSelect);
            console.log(cardSelect);
        }
    }
    return (
        <>
            <div className='payment'>
                <div className='vouchers'>
                    <h1>Your vouchers</h1>
                </div>
                <div className='containPayment'>
                    <h1>Check your choice !</h1>
                    <div className='bannerBill'>
                        <div className='img' style={{ backgroundImage: `url(${ticket.imageLandscape})` }}></div>
                        <div className='infoBill'>
                            <h2 className='full'>Movie: {ticket.filmName}</h2>
                            <h2 className='full'>Cinema: {ticket.cinemaName}</h2>
                            <div className='group half'>
                                <p>Seats: {Object.values(ticket.seatLs).flat().join(` - `)}</p>
                                <p>Combo: {Object.keys(ticket.comboLs).filter(e => ticket.comboLs[e] !== '0').map(com => `${com} x${ticket.comboLs[com]}`).join(' ')}</p>
                            </div>
                            <div className='group half'>
                                <p>Date: {ticket.showTime.substr(0, 10).split('-').reverse().join('/')}</p>
                                <p>Session: {ticket.showTime.substr(11, 5)} <span>{ticket.theaterName}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='footerBill'>
                        <button onClick={() => { nav(`/chooseseat/${timeShowID}`) }}>
                            <IoMdArrowRoundBack className='icon' />
                            <span>Turn back</span>
                        </button>
                        <p className='totalBill'>Total: <span>{ticket.totalPrice}</span></p>
                    </div>
                </div>
                <div className='chooseBankCard'>
                    <h1>Payment methods</h1>
                    <div className='methodWrapper'>
                        <div className='methodBox'>
                            <p className='titleMethod'>Visa/Master Card:</p>
                            <div className='cardList'>
                                {bankAcc.map((bank, i) => {
                                    return <div
                                        key={i}
                                        onClick={() => {
                                            setCardSelect(prev => ({
                                                CardNumber: prev.CardNumber === bank.CardNumber ? '' : bank.CardNumber
                                            }))
                                        }}
                                        className={`cardItem ${cardSelect.CardNumber === bank.CardNumber ? 'activeCard' : ''}`}
                                    >
                                        <PayCard {...bank} />
                                    </div>
                                })}
                            </div>

                        </div>
                        <div className='methodBox'>
                            <p className='titleMethod'>Tinder:</p>
                            <div className='cardList'>
                                <p className='alert'>We are improving. It's coming soon !!</p>
                            </div>
                        </div>
                    </div>
                    <div className='payForTicket'>
                        <button onClick={HandleBuy} className='button'>Pay for ticket</button>
                        {isShow && <div className='newCard'>
                            <button onClick={() => { setIsShow(false) }} className='close'>X</button>
                            <h1>Add new card </h1>
                            <div className='inputWrapper'>
                                <input className='w100' name='BankId' onChange={(event) => { HandleInputCard(event) }} placeholder='Bank ID' />
                                <input className='w100' name='CardNumber' onChange={(event) => { HandleInputCard(event) }} placeholder='Card number' />
                                <input className='w100' name='CardName' onChange={(event) => { HandleInputCard(event) }} placeholder='Card name' />
                                <input className='w46' name='ExpireDate' onChange={(event) => { HandleInputCard(event) }} placeholder='Expire date' />
                                <input className='w46' name='CVV' onChange={(event) => { HandleInputCard(event) }} placeholder='CVV number' />
                            </div>
                            <div className='btnAdd'><button onClick={() => { PostAPIBuy(card) }}>Done</button></div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}
