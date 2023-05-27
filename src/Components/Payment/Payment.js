import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import './Payment.scss'

import PayCard from '../CommonComponents/PayCard/PayCard'
import { Loading } from '../CommonComponents/Image/Image'

export default function Payment() {
    const { timeShowID } = useParams()
    const nav = useNavigate()
    const dispatch = useDispatch()
    const ticket = useSelector(state => state.ticketManage)
    const bankAcc = useSelector(state => state.userManage.bankAcc)
    const bankName = useSelector(state => state.userManage.bankName)
    const currentUser = useSelector(state => state.userManage.currentUser)
    const [card, setCard] = useState({})
    const [cardSelect, setCardSelect] = useState({
        CardNumber: ''
    })
    const [isShowAddCardBox, setIsShowAddCardBox] = useState(false)
    const [isShowLoadingBox, setIsShowLoadingBox] = useState(false)
    const [success, setSuccess] = useState('asd')

    const PostAPIBuy = (info) => {
        setSuccess('loading')
        setIsShowLoadingBox(true)
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
                    setSuccess('success')
                    dispatch({ type: 'RESET_CHOICE' })
                } else {
                    setSuccess('fail')
                }
            })
            .catch(() => {
                setSuccess('fail')
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
            setIsShowAddCardBox(true)
        } else {
            PostAPIBuy(cardSelect);
        }
    }

    useEffect(() => {
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/Bank/Bank`,
                type: 'SET_BANK_NAME'
            }
        })
    }, [])
    return (
        <div className='payment'>
            {isShowLoadingBox && <div className='payMessage'>
                {success === 'loading' && <Loading size={120} />}
                {success === 'success' &&
                    <div className='successBox'>
                        <h1>Successfully !</h1>
                        <h3>One ticket is just added to your list.</h3>
                        <button onClick={() => nav('/')}>Go home</button>
                    </div>}
                {success === 'fail' &&
                    <div className='failBox'>
                        <h1>Ops! there's a problem.</h1>
                        <h3>the bank account is invalid. please check it again.</h3>
                        <button onClick={() => { setIsShowLoadingBox(false) }}>Yes</button>
                    </div>}
            </div>}
            <div className='vouchers'>
                <h1>Your vouchers</h1>
            </div>
            <div className='containPayment'>
                <h1>Checking your choice !</h1>
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
                            <p>Date: {ticket.showTime.substring(0, 10).split('-').reverse().join('/')}</p>
                            <p>Session: {ticket.showTime.substring(11, 5)} <span>{ticket.theaterName}</span></p>
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
                            {!bankAcc.length ?
                                <h3 className='noCard'>There is no card before.</h3>
                                :
                                bankAcc.map((bank, i) => {
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
                        <p className='titleMethod'>Other method:</p>
                        <div className='cardList'>
                            <p className='alert'>We are improving. It's coming soon !!</p>
                        </div>
                    </div>
                </div>
                {/* ====================== Payment Form ========================= */}
                <div className='payForTicket'>
                    <button onClick={HandleBuy} className='button'>Pay for ticket</button>
                    {isShowAddCardBox && <div className='newCard'>
                        <button onClick={() => { setIsShowAddCardBox(false) }} className='close'>X</button>
                        <h1>Add new card </h1>
                        <div className='inputWrapper'>
                            <div className='bankName w100'>
                                {bankName.map((e, i) => {
                                    return <div key={i} className='radioBox'>
                                        <input
                                            type={'radio'} name='BankId'
                                            id={e.Id} value={e.Id}
                                            onChange={(event) => { HandleInputCard(event) }}
                                            checked={card.BankId * 1 === e.Id}
                                            hidden
                                        />
                                        <label htmlFor={e.Id}>{e.Name}</label>
                                    </div>
                                })}
                            </div>
                            <input className='w100' name='CardNumber' onChange={(event) => { HandleInputCard(event) }} placeholder='Card number' />
                            <input className='w100' name='CardName' onChange={(event) => { HandleInputCard(event) }} placeholder='Card name' />
                            <input className='w46' name='ExpireDate' onChange={(event) => { HandleInputCard(event) }} placeholder='Expire date' />
                            <input className='w46' name='CVV' onChange={(event) => { HandleInputCard(event) }} placeholder='CVV number' />
                        </div>
                        <div className='btnAdd'><button onClick={() => { PostAPIBuy(card) }}>Done</button></div>
                    </div>}
                </div>
            </div>
        </div >
    )
}
